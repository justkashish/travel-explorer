import Image from "next/image"
import "./TripCard.css"

export default function TripCard({ trip }) {
  return (
    <div className="trip-card">
      <div className="trip-image">
        <Image
          src={trip.image_url || "/placeholder.svg?height=300&width=400"}
          alt={trip.name || "Trip Destination Image"}
          width={400}
          height={300}
        />
      </div>
      <div className="trip-info">
        <h3>{trip.name}</h3>
        <div className="trip-details">
          <div className="detail">
            <span className="label">Price:</span>
            <span className="value">₹{trip.price.toLocaleString()}</span>
          </div>
          <div className="detail">
            <span className="label">Duration:</span>
            <span className="value">{trip.duration} days</span>
          </div>
        </div>
        <div className="trip-amenities">
          <h4>Amenities</h4>
          <ul>
            {trip.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <button className="btn">View Details</button>
      </div>
    </div>
  )
}

