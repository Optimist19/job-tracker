import Link from "next/link"
import { ArrowLeft, Search, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 p-6 flex justify-center">
          <div className="relative">
            {/* Concentric circles */}
            <div className="w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <span className="text-white text-5xl font-bold">404</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

          <div className="space-y-4">
            <button  className="w-full">
              <Link href="/" className="inline-flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </button>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for content..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-2">
          <div className="text-sm text-gray-500">
            <h2 className="font-medium mb-2">You might want to check:</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>The URL for typos</li>
              <li>If you followed a link, it might be outdated</li>
              <li>If you bookmarked this page, the content may have moved</li>
            </ul>
          </div>
        </div>

        <div className="bg-white px-6 py-2 border-t border-gray-200">
          <Link
            href="/contact"
            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link href="/" className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to JobTracker
        </Link>
      </div>
    </div>
  )
}
