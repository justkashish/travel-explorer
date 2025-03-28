import "./TripCard.css"

export default function TripCard({ trip }) {
  // Ensure trip has all required properties
  const tripData = {
    name: trip?.name || "Adventure Tour",
    price: trip?.price || 50000,
    duration: trip?.duration || 5,
    amenities: trip?.amenities || ["Hotel", "Breakfast", "Tour Guide"],
    image_url: trip?.image || "/images/placeholder.jpg",
  }

  return (
    <div className="trip-card">
      <div className="trip-image">
        <img
          src={tripData.image_url || "/placeholder.svg"}
          alt={tripData.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/images/placeholder.jpg"
          }}
        />
      </div>
      <div className="trip-info">
        <h3>{tripData.name}</h3>
        <div className="trip-details">
          <div className="detail">
            <span className="label">Price:</span>
            <span className="value">₹{tripData.price.toLocaleString()}</span>
          </div>
          <div className="detail">
            <span className="label">Duration:</span>
            <span className="value">{tripData.duration} </span>
          </div>
        </div>
        <div className="trip-amenities">
          <h4>Amenities</h4>
          <ul>
            {tripData.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <button className="btn">View Details</button>
      </div>
    </div>
  )
}

