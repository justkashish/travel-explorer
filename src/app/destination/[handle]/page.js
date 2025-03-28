"use client"

import { useState, useEffect , use } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import TripCard from "../../../components/TripCard"
import RegisterSW from "../../register-sw"
import { fetchDestination } from "../../../utils/api"
import "./destination.css"

export default function DestinationPage({ params }) {
  const resolvedParams = use(params) // Unwrapping the Promise
  const { handle } = resolvedParams
  const [trips, setTrips] = useState([])
  const [destination, setDestination] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDestination(handle.toLowerCase())       
        setDestination(data.destination || {})
        setTrips(data.trips || [])
      
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching destination data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [handle])

  const handleContactExpert = () => {
    router.push("/get-in-touch")
  }

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading destination details...</p>
      </div>
    )
  }

  return (
    <div className="destination-page">
      <RegisterSW />
      <Navbar />

      <div
        className="destination-hero"
        style={{
          backgroundImage: `url(${destination.image_url || "/images/default-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay">
          <div className="container">
            <h1>{destination.name || "Destination"}</h1>
            <p>{destination.description || "Explore this amazing destination with our travel packages."}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="trips-section">
          <h2>Available Trips for {destination.name || "this destination"}</h2>

          <div className="trips-grid">
            {Array.isArray(trips) && trips.length > 0 ? (
              trips.map((trip, index) => <TripCard key={trip.id || index} trip={trip} />)
            ) : (
              <div className="no-trips">
                <p>
                  No trips available for this destination at the moment. Please check back later or contact us for
                  custom options.
                </p>
                <button className="btn" onClick={handleContactExpert}>
                  Contact Us
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="expert-cta">
        <button className="btn btn-secondary" onClick={handleContactExpert}>
          Talk to an Expert
        </button>
      </div>

      <Footer />
    </div>
  )
}

