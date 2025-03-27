import Link from "next/link"
import "./not-found.css"

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn">
          Return to Home
        </Link>
      </div>
    </div>
  )
}

