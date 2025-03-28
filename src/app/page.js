"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BannerCarousel from "../components/BannerCarousel"
import DestinationCard from "../components/DestinationCard"
import RegisterSW from "./register-sw"
import { fetchBanners, fetchFeaturedDestinations } from "../utils/api"
import "./page.css"

export default function Home() {
  const [banners, setBanners] = useState([])
  const [destinations, setDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannersData = await fetchBanners()
        const destinationsData = await fetchFeaturedDestinations()  
        setBanners(Array.isArray(bannersData) ? bannersData : []);
        setDestinations(Array.isArray(destinationsData) ? destinationsData : []);     
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setBanners([])
        setDestinations([])
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading amazing destinations...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <RegisterSW />
      <Navbar />

      <section className="banner-section">
        <BannerCarousel banners={banners} />
      </section>

      <section className="destinations-section">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="destinations-grid">
            {Array.isArray(destinations) && destinations.length > 0 ? (
              destinations.map((destination, index) => (
                <DestinationCard key={destination.id || index} destination={destination} />
              ))
            ) : (
              <div className="no-destinations">
                <p>No destinations available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Personalized Itineraries</h3>
              <p>Customize every aspect of your trip to match your preferences and interests.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Price Guarantee</h3>
              <p>We offer competitive prices and match any lower price you find elsewhere.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safe & Secure</h3>
              <p>Your safety is our priority with 24/7 support during your travels.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Expert Travel Guides</h3>
              <p>Our experienced guides ensure you have the best experience possible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Travelers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                &quot;The trip to Bali was amazing! Everything was well organized and the accommodations were excellent.&quot;
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Rahul Sharma</div>
                <div className="author-trip">Bali Adventure</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                &quot;Our family trip to Egypt was unforgettable. The guides were knowledgeable and the itinerary was
                  perfect.&quot;
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Priya Patel</div>
                <div className="author-trip">Egypt Explorer</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>&quot;The customized trip to Japan exceeded all our expectations. Every detail was taken care of!&quot;</p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Amit Verma</div>
                <div className="author-trip">Japan Discovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

