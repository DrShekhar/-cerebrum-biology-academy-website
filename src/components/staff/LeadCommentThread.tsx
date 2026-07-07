'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MessageSquare, Reply, Send, Loader2 } from 'lucide-react'
import { MentionTextarea } from './MentionTextarea'
import { MessageBody } from './MessageBody'

interface LeadComment {
  id: string
  content: string
  parentId: string | null
  createdAt: string
  createdBy: { id: string; name: string | null }
}

const POLL_MS = 10_000

/**
 * Threaded internal discussion on a lead: root comments + one level of
 * replies, @mentions notify the mentioned teammate's bell. Polls while
 * visible so a teammate's new comment appears within ~10s.
 */
export function LeadCommentThread({ leadId, selfId }: { leadId: string; selfId?: string }) {
  const [comments, setComments] = useState<LeadComment[]>([])
  const [loading, setLoading] = useState(true)
  const [composer, setComposer] = useState('')
  const [replyTo, setReplyTo] = useState<LeadComment | null>(null)
  const [replyText, setReplyText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/notes`)
      const json = await res.json()
      if (json.data) setComments(json.data)
    } catch {
      // keep whatever we have
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    void fetchComments()
    timerRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') void fetchComments()
    }, POLL_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [fetchComments])

  const submit = async (content: string, parentId?: string) => {
    if (!content.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parentId }),
      })
      const json = await res.json()
      if (json.data) {
        setComments((prev) => [...prev, json.data])
        if (parentId) {
          setReplyTo(null)
          setReplyText('')
        } else {
          setComposer('')
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  const roots = comments.filter((c) => !c.parentId)
  const repliesFor = (rootId: string) => comments.filter((c) => c.parentId === rootId)

  const CommentCard = ({ comment, isReply }: { comment: LeadComment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-2' : ''} bg-gray-50 rounded-lg p-3`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900">
          {comment.createdBy?.name || 'Teammate'}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-gray-700">
        <MessageBody content={comment.content} selfId={selfId} />
      </p>
      {!isReply && (
        <button
          onClick={() => {
            setReplyTo(comment)
            setReplyText('')
          }}
          className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
        >
          <Reply className="w-3 h-3" />
          Reply
        </button>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Team Discussion</h3>
        <span className="text-xs text-gray-500">
          @mention a teammate to notify them — internal only, never visible to the student
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-6 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : roots.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          No discussion yet. Start one below — e.g. what the student asked for, what to do next.
        </p>
      ) : (
        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
          {roots.map((root) => (
            <div key={root.id}>
              <CommentCard comment={root} />
              {repliesFor(root.id).map((reply) => (
                <CommentCard key={reply.id} comment={reply} isReply />
              ))}
              {replyTo?.id === root.id && (
                <div className="ml-8 mt-2">
                  <MentionTextarea
                    value={replyText}
                    onChange={setReplyText}
                    rows={2}
                    placeholder={`Reply to ${root.createdBy?.name || 'teammate'}…`}
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => void submit(replyText, root.id)}
                      disabled={submitting || !replyText.trim()}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => setReplyTo(null)}
                      className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <MentionTextarea
            value={composer}
            onChange={setComposer}
            rows={2}
            placeholder="Add a comment… type @ to mention a teammate"
          />
        </div>
        <button
          onClick={() => void submit(composer)}
          disabled={submitting || !composer.trim()}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Post comment"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
