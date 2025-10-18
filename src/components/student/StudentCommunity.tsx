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

  // Mock data - will be replaced with real API
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Priya Sharma',
        avatar: '/avatars/priya.jpg',
        badge: 'top_performer',
        neetScore: 650,
      },
      content:
        'Just scored 95% in Photosynthesis chapter test! 🌱 Key tip: Focus on light and dark reactions separately first, then connect them. The Calvin cycle diagram is crucial!',
      type: 'achievement',
      subject: 'Biology',
      chapter: 'Photosynthesis',
      likes: 24,
      replies: 8,
      timeAgo: '2h ago',
      isLiked: false,
      isBookmarked: true,
      tags: ['photosynthesis', 'chapter-test', 'study-tip'],
    },
    {
      id: '2',
      author: {
        name: 'Arjun Patel',
        avatar: '/avatars/arjun.jpg',
        badge: 'rising_star',
        neetScore: 580,
      },
      content:
        'Can someone explain the difference between Mitosis and Meiosis in simple terms? I keep mixing up the phases! 😅',
      type: 'question',
      subject: 'Biology',
      chapter: 'Cell Division',
      likes: 12,
      replies: 15,
      timeAgo: '4h ago',
      isLiked: true,
      isBookmarked: false,
      tags: ['cell-division', 'help-needed', 'mitosis', 'meiosis'],
    },
    {
      id: '3',
      author: {
        name: 'Dr. Kavya (Mentor)',
        avatar: '/avatars/mentor.jpg',
        badge: 'helper',
      },
      content:
        '🎯 Weekly Study Tip: Use mnemonics for Kingdom classification! "King Philip Came Over For Good Soup" = Kingdom, Phylum, Class, Order, Family, Genus, Species. Simple but effective! 📚',
      type: 'study_tip',
      subject: 'Biology',
      chapter: 'Classification',
      likes: 89,
      replies: 23,
      timeAgo: '1d ago',
      isLiked: true,
      isBookmarked: true,
      tags: ['classification', 'mnemonics', 'study-tip', 'taxonomy'],
    },
  ])

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([
    {
      rank: 1,
      name: 'Sneha Reddy',
      points: 2840,
      studyHours: 156,
      testsCompleted: 89,
      avatar: '/avatars/sneha.jpg',
      badge: 'crown',
    },
    {
      rank: 2,
      name: 'Rahul Kumar',
      points: 2650,
      studyHours: 142,
      testsCompleted: 76,
      avatar: '/avatars/rahul.jpg',
      badge: 'trophy',
    },
    {
      rank: 3,
      name: 'Ananya Singh',
      points: 2580,
      studyHours: 138,
      testsCompleted: 71,
      avatar: '/avatars/ananya.jpg',
      badge: 'medal',
    },
    {
      rank: 4,
      name: 'Vikram Joshi',
      points: 2420,
      studyHours: 125,
      testsCompleted: 68,
      avatar: '/avatars/vikram.jpg',
    },
    {
      rank: 5,
      name: 'Meera Shah',
      points: 2380,
      studyHours: 119,
      testsCompleted: 65,
      avatar: '/avatars/meera.jpg',
    },
  ])

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    trackEvent('community_post', {
      content_type: 'student_post',
      content_length: newPost.length,
    })

    // Add new post logic here
    setNewPost('')
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    )

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
                      disabled={!newPost.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post
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
              {filteredPosts.map((post) => (
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
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              ))}
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
                    <h4 className="text-sm font-medium">NEET 2025 Warriors</h4>
                    <p className="text-xs text-gray-500">2,847 members</p>
                  </div>
                  <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Join
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Biology Doubt Clearers</h4>
                    <p className="text-xs text-gray-500">1,204 members</p>
                  </div>
                  <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
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
            {leaderboard.map((student) => (
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
                      <div className="absolute -top-1 -right-1">{getBadgeIcon(student.badge)}</div>
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
            ))}
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
