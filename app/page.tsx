import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Cultivate Daily Gratitude</h1>
        <p className="text-lg text-gray-600">
          Take a moment each day to reflect on the good in your life, no matter how small.
        </p>
        <div className="pt-4">
          <Link href="/dashboard">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Start Your Daily Gratitude
            </Button>
          </Link>
        </div>
        <div className="pt-8 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 hover:text-emerald-700 underline">
            Log in
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 flex space-x-4">
        <Link href="/about" className="text-gray-500 hover:text-gray-700">
          About
        </Link>
        <Link href="/privacy" className="text-gray-500 hover:text-gray-700">
          Privacy
        </Link>
        <Link href="/terms" className="text-gray-500 hover:text-gray-700">
          Terms
        </Link>
      </div>
    </div>
  )
}
