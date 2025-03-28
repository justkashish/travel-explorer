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
      setCurrentBanner((prev) => (prev + 1) % (banners?.length || 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSearchClick = () => {
    router.push("/customize")
  }

  // Default banner if no banners are provided
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return (
      <div className="banner-carousel">
        <div className="banner-slide default-banner">
          <div className="banner-content">
            <h1>Discover Amazing Destinations</h1>
            <p>Plan your perfect trip with us</p>
            <div className="search-container">
              <input type="text" placeholder="Where do you want to go?" onClick={handleSearchClick} readOnly />
              <button className="search-btn" onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get the current banner or use default values
  const banner = banners[currentBanner] || {}
  const bannerImage = banner.img || "/images/default-banner.jpg"
  const bannerTitle = banner.title || "Discover Amazing Destinations"
  const bannerDescription = banner.description || "Plan your perfect trip with us"

  return (
    <div className="banner-carousel">
      <div
        className="banner-slide"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="banner-content">
          <h1>{bannerTitle}</h1>
          <p>{bannerDescription}</p>
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

