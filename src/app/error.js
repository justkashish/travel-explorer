"use client"

import { useEffect } from "react"
import Link from "next/link"
import "./error.css"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading this page.</p>
        <div className="error-actions">
          <button onClick={() => reset()} className="btn">
            Try again
          </button>
          <Link href="/" className="btn btn-secondary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

