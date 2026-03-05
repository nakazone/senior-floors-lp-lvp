'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fc] px-4">
      <h1 className="text-xl font-bold text-[#1a2036] md:text-2xl">Something went wrong</h1>
      <p className="mt-2 max-w-md text-center text-[#4a5568]">
        A temporary error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-[#1a2036] px-6 py-3 font-semibold text-white transition hover:bg-[#252b47]"
      >
        Try again
      </button>
      <a
        href="/"
        className="mt-4 text-sm text-[#1a2036] underline hover:no-underline"
      >
        Back to home
      </a>
    </div>
  )
}
