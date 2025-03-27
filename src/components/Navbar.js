import Link from "next/link"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Travel Explorer
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/customize">Customize Trip</Link>
          <Link href="/get-in-touch">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

