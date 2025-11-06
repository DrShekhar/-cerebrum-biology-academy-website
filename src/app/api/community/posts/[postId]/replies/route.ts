import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{
    postId: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { postId } = await context.params

    const replies = await prisma.forumReply.findMany({
      where: { postId },
      orderBy: [{ isAccepted: 'desc' }, { upvotes: 'desc' }, { createdAt: 'asc' }],
    })

    const formattedReplies = replies.map((reply) => ({
      id: reply.id,
      author: reply.authorName,
      content: reply.content,
      upvotes: reply.upvotes,
      isAccepted: reply.isAccepted,
      timeAgo: getTimeAgo(reply.createdAt),
    }))

    return NextResponse.json({ replies: formattedReplies })
  } catch (error) {
    console.error('Error fetching replies:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch replies',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { postId } = await context.params
    const body = await request.json()
    const { authorName, content } = body

    if (!authorName || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newReply = await prisma.forumReply.create({
      data: {
        postId,
        authorName,
        content,
      },
    })

    const formattedReply = {
      id: newReply.id,
      author: newReply.authorName,
      content: newReply.content,
      upvotes: newReply.upvotes,
      isAccepted: newReply.isAccepted,
      timeAgo: getTimeAgo(newReply.createdAt),
    }

    return NextResponse.json({ reply: formattedReply }, { status: 201 })
  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json(
      {
        error: 'Failed to create reply',
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
