import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-slate-600">Sign in to access your dashboard</p>
        </div>
        <SignIn
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
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
