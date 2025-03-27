import Link from "next/link"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Travel Explorer</h3>
            <p>Discover amazing destinations around the world with our customized travel packages.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/customize">Customize Trip</Link>
              </li>
              <li>
                <Link href="/get-in-touch">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Popular Destinations</h3>
            <ul>
              <li>
                <Link href="/destination/maldives">Maldives</Link>
              </li>
              <li>
                <Link href="/destination/egypt">Egypt</Link>
              </li>
              <li>
                <Link href="/destination/bali">Bali</Link>
              </li>
              <li>
                <Link href="/destination/dubai">Dubai</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: info@travelexplorer.com</p>
            <p>Phone: +1 (965) 456-7890</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Travel Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

