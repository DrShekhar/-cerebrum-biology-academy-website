import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="mt-2 text-slate-600">Join Cerebrum Biology Academy</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-xl border border-slate-200 rounded-xl',
              headerTitle: 'text-slate-900',
              headerSubtitle: 'text-slate-600',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium',
              footerActionLink: 'text-blue-600 hover:text-blue-700',
              formFieldInput: 'border-slate-300 focus:border-blue-500 focus:ring-blue-500',
              identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
