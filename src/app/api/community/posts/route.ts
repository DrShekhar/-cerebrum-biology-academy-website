import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let where: any = {}

    if (filter === 'questions') {
      where.type = 'QUESTION'
    } else if (filter === 'tips') {
      where.type = 'TIP'
    } else if (filter === 'achievements') {
      where.type = 'DISCUSSION'
    }

    const posts = await prisma.forumPost.findMany({
      where,
      include: {
        freeUser: {
          select: {
            id: true,
            name: true,
            email: true,
            totalPoints: true,
            studyStreak: true,
          },
        },
        replies: {
          select: {
            id: true,
          },
        },
      },
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      skip: offset,
    })

    const formattedPosts = posts.map((post) => {
      const timeAgo = getTimeAgo(post.createdAt)
      const badge = getBadgeForUser(post.freeUser.totalPoints || 0, post.freeUser.studyStreak || 0)

      return {
        id: post.id,
        author: {
          name: post.freeUser.name || 'Anonymous',
          avatar: '/avatars/default.jpg',
          badge,
          points: post.freeUser.totalPoints || 0,
        },
        title: post.title,
        content: post.content,
        type: post.type.toLowerCase(),
        subject: 'Biology',
        chapter: post.topic,
        likes: post.upvotes,
        replies: post.replies.length,
        timeAgo,
        isLiked: false,
        isBookmarked: false,
        isPinned: post.isPinned,
        isResolved: post.isResolved,
        views: post.views,
        tags: [post.topic.toLowerCase().replace(/\s+/g, '-')],
      }
    })

    return NextResponse.json({ posts: formattedPosts })
  } catch (error) {
    console.error('Error fetching community posts:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, content, type, topic } = body

    if (!userId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const inferredTitle = title || content.substring(0, 100)
    const inferredTopic = topic || 'General Discussion'
    const postType = type?.toUpperCase() || 'DISCUSSION'

    const newPost = await prisma.forumPost.create({
      data: {
        freeUserId: userId,
        title: inferredTitle,
        content,
        type: postType,
        topic: inferredTopic,
      },
      include: {
        freeUser: {
          select: {
            id: true,
            name: true,
            totalPoints: true,
            studyStreak: true,
          },
        },
      },
    })

    const timeAgo = getTimeAgo(newPost.createdAt)
    const badge = getBadgeForUser(
      newPost.freeUser.totalPoints || 0,
      newPost.freeUser.studyStreak || 0
    )

    const formattedPost = {
      id: newPost.id,
      author: {
        name: newPost.freeUser.name || 'Anonymous',
        avatar: '/avatars/default.jpg',
        badge,
        points: newPost.freeUser.totalPoints || 0,
      },
      title: newPost.title,
      content: newPost.content,
      type: newPost.type.toLowerCase(),
      subject: 'Biology',
      chapter: newPost.topic,
      likes: newPost.upvotes,
      replies: 0,
      timeAgo,
      isLiked: false,
      isBookmarked: false,
      isPinned: newPost.isPinned,
      isResolved: newPost.isResolved,
      views: newPost.views,
      tags: [newPost.topic.toLowerCase().replace(/\s+/g, '-')],
    }

    return NextResponse.json({ post: formattedPost }, { status: 201 })
  } catch (error) {
    console.error('Error creating community post:', error)
    return NextResponse.json(
      {
        error: 'Failed to create post',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`
}

function getBadgeForUser(points: number, streak: number): string {
  if (points >= 2000) return 'top_performer'
  if (streak >= 7) return 'rising_star'
  if (points >= 500) return 'helper'
  return 'newcomer'
}
