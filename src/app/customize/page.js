"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { debounce } from "../../utils/helpers"
import "./customize.css"

const destinations = [
  "Maldives",
  "Egypt",
  "Bali",
  "Dubai",
  "Japan",
  "Australia",
  "Thailand",
  "Singapore",
  "Switzerland",
  "France",
  "Italy",
  "Spain",
  "Greece",
  "Turkey",
  "South Africa",
  "Brazil",
  "Peru",
  "Mexico",
  "Canada",
  "New Zealand",
]

export default function Customize() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    destination: "",
    days: 5,
    travelGroup: "couple",
    rooms: 1,
    adults: 2,
    children: 0,
  })

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    const results = destinations.filter((destination) => destination.toLowerCase().includes(value.toLowerCase()))
    setFilteredDestinations(results)
  }, 300)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
    setFormData({ ...formData, destination })
    setCurrentStep(1)
  }

  const handleDaysChange = (days) => {
    setFormData({ ...formData, days })
    setCurrentStep(2)
  }

  const handleTravelGroupChange = (group) => {
    setFormData({ ...formData, travelGroup: group })
    setCurrentStep(3)
  }

  const handleRoomConfigChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    setCurrentStep(4)
  }

  const resetForm = () => {
    setSelectedDestination(null)
    setCurrentStep(0)
    setFormData({
      destination: "",
      days: 5,
      travelGroup: "couple",
      rooms: 1,
      adults: 2,
      children: 0,
    })
    setSearchTerm("")
    setFilteredDestinations(destinations)
  }

  return (
    <div className="customize-page">
      <Navbar />

      <div className="container">
        <div className="customize-container">
          {currentStep === 0 && (
            <div className="step destination-step">
              <h1>Customize Your Perfect Trip</h1>
              <div className="search-box">
                <input type="text" placeholder="Pick your destination" value={searchTerm} onChange={handleSearch} />
              </div>
              <div className="destinations-list">
                {filteredDestinations.map((destination, index) => (
                  <div key={index} className="destination-item" onClick={() => handleDestinationSelect(destination)}>
                    {destination}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="step days-step">
              <h2>How many days do you want to travel?</h2>
              <p>
                Selected destination: <strong>{selectedDestination}</strong>
              </p>

              <div className="days-selector">
                {[3, 5, 7, 10, 14].map((days) => (
                  <div
                    key={days}
                    className={`days-option ${formData.days === days ? "selected" : ""}`}
                    onClick={() => handleDaysChange(days)}
                  >
                    {days} Days
                  </div>
                ))}
              </div>

              <div className="step-navigation">
                <button className="btn" onClick={() => setCurrentStep(0)}>
                  Back
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step travel-group-step">
              <h2>Who is traveling with you?</h2>
              <p>
                Selected destination: <strong>{selectedDestination}</strong> for <strong>{formData.days} days</strong>
              </p>

              <div className="travel-group-selector">
                <div
                  className={`group-option ${formData.travelGroup === "solo" ? "selected" : ""}`}
                  onClick={() => handleTravelGroupChange("solo")}
                >
                  <div className="group-icon">👤</div>
                  <div className="group-label">Solo</div>
                </div>
                <div
                  className={`group-option ${formData.travelGroup === "couple" ? "selected" : ""}`}
                  onClick={() => handleTravelGroupChange("couple")}
                >
                  <div className="group-icon">👫</div>
                  <div className="group-label">Couple</div>
                </div>
                <div
                  className={`group-option ${formData.travelGroup === "family" ? "selected" : ""}`}
                  onClick={() => handleTravelGroupChange("family")}
                >
                  <div className="group-icon">👨‍👩‍👧‍👦</div>
                  <div className="group-label">Family</div>
                </div>
                <div
                  className={`group-option ${formData.travelGroup === "friends" ? "selected" : ""}`}
                  onClick={() => handleTravelGroupChange("friends")}
                >
                  <div className="group-icon">👥</div>
                  <div className="group-label">Friends</div>
                </div>
              </div>

              <div className="step-navigation">
                <button className="btn" onClick={() => setCurrentStep(1)}>
                  Back
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step room-config-step">
              <h2>Configure Room Options</h2>
              <p>
                Selected destination: <strong>{selectedDestination}</strong> for <strong>{formData.days} days</strong>{" "}
                as <strong>{formData.travelGroup}</strong>
              </p>

              <div className="room-config">
                <div className="config-item">
                  <label>Number of Rooms</label>
                  <div className="counter">
                    <button
                      onClick={() => handleRoomConfigChange("rooms", Math.max(1, formData.rooms - 1))}
                      disabled={formData.rooms <= 1}
                    >
                      -
                    </button>
                    <span>{formData.rooms}</span>
                    <button onClick={() => handleRoomConfigChange("rooms", formData.rooms + 1)}>+</button>
                  </div>
                </div>

                <div className="config-item">
                  <label>Adults</label>
                  <div className="counter">
                    <button
                      onClick={() => handleRoomConfigChange("adults", Math.max(1, formData.adults - 1))}
                      disabled={formData.adults <= 1}
                    >
                      -
                    </button>
                    <span>{formData.adults}</span>
                    <button onClick={() => handleRoomConfigChange("adults", formData.adults + 1)}>+</button>
                  </div>
                </div>

                <div className="config-item">
                  <label>Children</label>
                  <div className="counter">
                    <button
                      onClick={() => handleRoomConfigChange("children", Math.max(0, formData.children - 1))}
                      disabled={formData.children <= 0}
                    >
                      -
                    </button>
                    <span>{formData.children}</span>
                    <button onClick={() => handleRoomConfigChange("children", formData.children + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="step-navigation">
                <button className="btn" onClick={() => setCurrentStep(2)}>
                  Back
                </button>
                <button className="btn" onClick={handleSubmit}>
                  Confirm
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step confirmation-step">
              <div className="confirmation-content">
                <div className="confirmation-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p>Your custom trip has been created.</p>

                <div className="trip-summary">
                  <h3>Trip Summary</h3>
                  <ul>
                    <li>
                      <strong>Destination:</strong> {formData.destination}
                    </li>
                    <li>
                      <strong>Duration:</strong> {formData.days} days
                    </li>
                    <li>
                      <strong>Travel Group:</strong> {formData.travelGroup}
                    </li>
                    <li>
                      <strong>Rooms:</strong> {formData.rooms}
                    </li>
                    <li>
                      <strong>Travelers:</strong> {formData.adults} adults, {formData.children} children
                    </li>
                  </ul>
                </div>

                <div className="confirmation-actions">
                  <Link href={`/destination/${formData.destination.toLowerCase()}`} className="btn">
                    View Available Trips
                  </Link>
                  <button className="btn" onClick={resetForm}>
                    Create Another Trip
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

