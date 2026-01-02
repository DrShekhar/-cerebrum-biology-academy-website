import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
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
              formButtonPrimary: 'bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-medium',
              footerActionLink: 'text-[#4a5d4a] hover:text-[#3d4d3d]',
              formFieldInput: 'border-slate-300 focus:border-[#4a5d4a] focus:ring-[#4a5d4a]',
              identityPreviewEditButton: 'text-[#4a5d4a] hover:text-[#3d4d3d]',
              socialButtonsBlockButton: 'border-slate-300 hover:bg-slate-50',
              dividerLine: 'bg-slate-200',
              dividerText: 'text-slate-500',
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
