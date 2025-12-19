'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Clock,
  Star,
  Send,
  Heart,
  Bookmark,
  Flag,
  Trophy,
  Medal,
  Crown,
} from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    badge: 'top_performer' | 'rising_star' | 'helper' | 'newcomer'
    neetScore?: number
  }
  content: string
  type: 'question' | 'achievement' | 'study_tip' | 'motivation'
  subject?: string
  chapter?: string
  likes: number
  replies: number
  timeAgo: string
  isLiked: boolean
  isBookmarked: boolean
  tags: string[]
}

interface Leaderboard {
  rank: number
  name: string
  points: number
  studyHours: number
  testsCompleted: number
  avatar: string
  badge?: string
}

export function StudentCommunity() {
  const { trackEvent } = useAnalytics()
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'study_groups'>('feed')
  const [newPost, setNewPost] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'questions' | 'achievements' | 'tips'
  >('all')

  const [posts, setPosts] = useState<Post[]>([])
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true)
  const [submittingPost, setSubmittingPost] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [selectedFilter])

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchLeaderboard()
    }
  }, [activeTab])

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true)
      const response = await fetch(`/api/community/posts?filter=${selectedFilter}&limit=20`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoadingPosts(false)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true)
      const response = await fetch('/api/community/leaderboard?limit=10')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoadingLeaderboard(false)
    }
  }

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return

    setSubmittingPost(true)

    trackEvent('community_post', {
      content_type: 'student_post',
      content_length: newPost.length,
    })

    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'TEMP_USER_ID',
          content: newPost,
          type: 'DISCUSSION',
          topic: 'General Discussion',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setPosts([data.post, ...posts])
        setNewPost('')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setSubmittingPost(false)
    }
  }

  const handleLike = async (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const wasLiked = post.isLiked

    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: wasLiked ? p.likes - 1 : p.likes + 1,
              isLiked: !wasLiked,
            }
          : p
      )
    )

    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: wasLiked ? 'DELETE' : 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(
          posts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  likes: data.upvotes,
                }
              : p
          )
        )
      }
    } catch (error) {
      console.error('Error liking post:', error)
      setPosts(
        posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes: wasLiked ? p.likes + 1 : p.likes - 1,
                isLiked: wasLiked,
              }
            : p
        )
      )
    }

    trackEvent('community_interaction', {
      action: 'like_post',
      post_id: postId,
    })
  }

  const handleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    )

    trackEvent('community_interaction', {
      action: 'bookmark_post',
      post_id: postId,
    })
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'crown':
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 'trophy':
        return <Trophy className="w-4 h-4 text-yellow-600" />
      case 'medal':
        return <Medal className="w-4 h-4 text-orange-500" />
      case 'top_performer':
        return <Star className="w-4 h-4 text-purple-500" />
      case 'rising_star':
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      case 'helper':
        return <Heart className="w-4 h-4 text-red-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'questions') return post.type === 'question'
    if (selectedFilter === 'achievements') return post.type === 'achievement'
    if (selectedFilter === 'tips') return post.type === 'study_tip'
    return true
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-navy-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" />
              NEET Biology Community
            </h1>
            <p className="text-blue-100 mt-1">
              Connect, learn, and grow together with fellow NEET aspirants!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">2,847</div>
            <div className="text-sm text-blue-100">Active Students</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['feed', 'leaderboard', 'study_groups'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              trackEvent('community_navigation', { tab })
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab === 'feed' && 'Community Feed'}
            {tab === 'leaderboard' && 'Leaderboard'}
            {tab === 'study_groups' && 'Study Groups'}
          </button>
        ))}
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start space-x-3">
                <img src="/avatars/current-user.jpg" alt="You" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your achievement, ask a question, or help others..."
                    className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Add Chapter
                      </button>
                      <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Add Goal
                      </button>
                    </div>
                    <button
                      onClick={handlePostSubmit}
                      disabled={!newPost.trim() || submittingPost}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      {submittingPost ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg">
              {(['all', 'questions', 'achievements', 'tips'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {filter === 'all' && 'All Posts'}
                  {filter === 'questions' && 'Questions'}
                  {filter === 'achievements' && 'Achievements'}
                  {filter === 'tips' && 'Study Tips'}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {loadingPosts ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Posts Yet</h3>
                  <p className="text-gray-600">Be the first to start a discussion!</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                            {getBadgeIcon(post.author.badge)}
                            {post.author.neetScore && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {post.author.neetScore}/720
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{post.timeAgo}</span>
                            {post.subject && (
                              <>
                                <span>•</span>
                                <span className="text-blue-600">{post.subject}</span>
                              </>
                            )}
                            {post.chapter && (
                              <>
                                <span>•</span>
                                <span>{post.chapter}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-800 mb-3 leading-relaxed">{post.content}</p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          {post.replies}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`text-sm transition-colors ${
                          post.isBookmarked
                            ? 'text-yellow-600'
                            : 'text-gray-500 hover:text-yellow-600'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Your Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posts Shared</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Helpful Answers</span>
                  <span className="font-medium">56</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Community Points</span>
                  <span className="font-medium text-blue-600">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Rank</span>
                  <span className="font-medium text-green-600">#12</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Trending Topics</h3>
              <div className="space-y-2">
                {['Cell Division', 'Photosynthesis', 'Genetics', 'Ecology', 'Human Physiology'].map(
                  (topic) => (
                    <div key={topic} className="flex justify-between items-center">
                      <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        #{topic}
                      </span>
                      <span className="text-xs text-gray-500">147 posts</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Study Groups */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Active Study Groups</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">NEET 2026 Warriors</h4>
                    <p className="text-xs text-gray-500">2,847 members</p>
                  </div>
                  <button className="text-xs bg-blue-100 text-blue-800 px-3 py-2 rounded min-h-[44px] min-w-[44px]">
                    Join
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Biology Doubt Clearers</h4>
                    <p className="text-xs text-gray-500">1,204 members</p>
                  </div>
                  <button className="text-xs bg-green-100 text-green-800 px-3 py-2 rounded min-h-[44px] min-w-[44px]">
                    Joined
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Monthly Leaderboard</h2>
            <div className="text-sm text-gray-500">Updates daily at midnight</div>
          </div>

          <div className="space-y-4">
            {loadingLeaderboard ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Leaderboard Data</h3>
                <p className="text-gray-600">Start studying to appear on the leaderboard!</p>
              </div>
            ) : (
              leaderboard.map((student) => (
                <motion.div
                  key={student.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: student.rank * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    student.rank <= 3
                      ? 'bg-gold-50 border-gold-200'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {student.badge && (
                        <div className="absolute -top-1 -right-1">
                          {getBadgeIcon(student.badge)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-lg ${
                            student.rank === 1
                              ? 'text-yellow-600'
                              : student.rank === 2
                                ? 'text-gray-600'
                                : student.rank === 3
                                  ? 'text-orange-600'
                                  : 'text-gray-800'
                          }`}
                        >
                          #{student.rank}
                        </span>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{student.studyHours}h studied</span>
                        <span>{student.testsCompleted} tests</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{student.points}</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Study Groups */}
      {activeTab === 'study_groups' && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Groups Coming Soon!</h3>
          <p className="text-gray-600 mb-6">
            Join study groups with students at your level and ace NEET together.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get Notified
          </button>
        </div>
      )}
    </div>
  )
}
