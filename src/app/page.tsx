import Link from 'next/link'
import { Cloud, Rocket, BarChart3 } from 'lucide-react'
import Header from '@/components/custom/header'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 md:px-0">
        <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Send Emails in a Snap <span className="text-blue-400">🚀</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mb-8">
          PostCloud is a modern, plug-and-play email platform. Connect your
          Gmail, generate an API key, and start sending emails from your app
          instantly.
        </p>
        <Link
          href="/login"
          className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-500 transition transform hover:-translate-y-1"
        >
          Get Started
        </Link>
      </section>

    </main>
  )
}
