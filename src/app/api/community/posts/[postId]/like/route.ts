import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{
    postId: string
  }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { postId } = await context.params

    const post = await prisma.forum_posts.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const newUpvotes = post.upvotes + 1

    const updatedPost = await prisma.forum_posts.update({
      where: { id: postId },
      data: { upvotes: newUpvotes },
    })

    return NextResponse.json({ upvotes: updatedPost.upvotes })
  } catch (error) {
    console.error('Error liking post:', error)
    return NextResponse.json(
      {
        error: 'Failed to like post',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { postId } = await context.params

    const post = await prisma.forum_posts.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const newUpvotes = Math.max(0, post.upvotes - 1)

    const updatedPost = await prisma.forum_posts.update({
      where: { id: postId },
      data: { upvotes: newUpvotes },
    })

    return NextResponse.json({ upvotes: updatedPost.upvotes })
  } catch (error) {
    console.error('Error unliking post:', error)
    return NextResponse.json(
      {
        error: 'Failed to unlike post',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
