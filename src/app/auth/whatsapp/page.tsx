import { WhatsAppLogin } from '@/components/auth/WhatsAppLogin'

export const metadata = {
  title: 'WhatsApp Login | Cerebrum Biology Academy',
  description: 'Login with your WhatsApp number for instant access',
}

export default function WhatsAppLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <WhatsAppLogin />
        </div>

        <div className="mt-6 text-center">
          <a href="/auth/signin" className="text-sm text-gray-600 hover:text-gray-900">
            Login with Email instead
          </a>
        </div>
      </div>
    </div>
  )
}
