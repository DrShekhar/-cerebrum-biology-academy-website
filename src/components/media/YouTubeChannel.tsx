'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Youtube, Play, Users, Video, TrendingUp, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views?: string
  duration?: string
}

interface YouTubeChannelProps {
  channelId?: string
  channelName?: string
  channelUrl?: string
  subscriberCount?: string
  videoCount?: string
  recentVideos?: YouTubeVideo[]
  showStats?: boolean
  showRecentVideos?: boolean
}

export function YouTubeChannel({
  channelId = 'UCxxxxxxxxxxxxx',
  channelName = 'Cerebrum Biology Academy',
  channelUrl = 'https://www.youtube.com/@cerebrumbiologyacademy',
  subscriberCount = '50K+',
  videoCount = '500+',
  recentVideos = [],
  showStats = true,
  showRecentVideos = true,
}: YouTubeChannelProps) {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)

  const defaultVideos: YouTubeVideo[] = [
    {
      id: 'bk6wQCh6b9w',
      title: 'NEET 2023 Topper Sadhna Sirin - Biology Preparation Strategy',
      thumbnail: 'https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg',
      publishedAt: '2023-08-15',
      views: '125K',
      duration: '12:45',
    },
    {
      id: 'NfhkGqOQXzk',
      title: 'AFMC Selection Success Story - Abhisek',
      thumbnail: 'https://i.ytimg.com/vi/NfhkGqOQXzk/hqdefault.jpg',
      publishedAt: '2023-07-22',
      views: '89K',
      duration: '10:30',
    },
    {
      id: 't5F8RBuHITM',
      title: '6-Month Intensive Program Success - Nishita',
      thumbnail: 'https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg',
      publishedAt: '2023-06-10',
      views: '67K',
      duration: '8:20',
    },
  ]

  const videosToShow = recentVideos.length > 0 ? recentVideos : defaultVideos

  const openVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
      return `${diffDays} days ago`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? 's' : ''} ago`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} year${years > 1 ? 's' : ''} ago`
    }
  }

  return (
    <div className="w-full bg-gradient-to-br bg-red-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Youtube className="w-12 h-12 text-red-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{channelName}</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Join thousands of NEET aspirants learning Biology with expert guidance
          </p>
          <Button
            onClick={() => window.open(channelUrl, '_blank')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Youtube className="w-5 h-5 mr-2" />
            Subscribe to Channel
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {showStats && (
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{subscriberCount}</div>
              <div className="text-gray-600 font-medium">Subscribers</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{videoCount}</div>
              <div className="text-gray-600 font-medium">Videos</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">95%+</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </motion.div>
        )}

        {showRecentVideos && videosToShow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recent Success Stories
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videosToShow.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  onClick={() => openVideo(video)}
                >
                  <div className="relative aspect-video bg-gray-900 group">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 text-red-600 ml-1" />
                      </motion.div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      {video.views && (
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {video.views} views
                        </span>
                      )}
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                onClick={() => window.open(channelUrl, '_blank')}
                variant="outline"
                className="px-8 py-3 rounded-full font-semibold text-lg"
              >
                View All Videos
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideo}
        >
          <motion.div
            className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
              <div className="flex items-center justify-between text-gray-600">
                {selectedVideo.views && (
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {selectedVideo.views} views
                  </span>
                )}
                <span>{formatDate(selectedVideo.publishedAt)}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
