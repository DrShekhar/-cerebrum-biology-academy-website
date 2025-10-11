/**
 * LMS Layout - Bypass admin auth for development
 * TODO: Remove this in production and use parent admin auth
 */

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return <div className="lms-layout">{children}</div>
}
