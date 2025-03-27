"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "./BannerCarousel.css"

export default function BannerCarousel({ banners }) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Auto-rotate banners
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % (banners.length || 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  const handleSearchClick = () => {
    router.push("/customize")
  }

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <div className="banner-carousel">
      <div
        className="banner-slide"
        style={{
          backgroundImage: `url(${banners[currentBanner]?.image_url || "/placeholder.svg?height=600&width=1200"})`,
        }}
      >
        <div className="banner-content">
          <h1>{banners[currentBanner]?.title || "Discover Amazing Destinations"}</h1>
          <p>{banners[currentBanner]?.description || "Plan your perfect trip with us"}</p>
          <div className="search-container">
            <input type="text" placeholder="Where do you want to go?" onClick={handleSearchClick} readOnly />
            <button className="search-btn" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="banner-indicators">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentBanner ? "active" : ""}`}
            onClick={() => setCurrentBanner(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

