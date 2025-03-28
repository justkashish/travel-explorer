import Link from "next/link"
import "./DestinationCard.css"

export default function DestinationCard({ destination }) {
  // Ensure destination has all required properties
  const dest = {
    name: destination?.title || "Unknown Destination",
    description: destination?.description || "Discover this amazing destination",
    handle: destination?.handle || (destination?.name || "unknown").toLowerCase().replace(/\s+/g, "-"),
    image_url: destination?.img || "/images/placeholder.jpg",
  }

  return (
    <div className="destination-card">
      <div className="destination-image">
        <img
          src={dest.image_url || "/placeholder.svg"}
          alt={dest.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/images/placeholder.jpg"
          }}
        />
      </div>
      <div className="destination-info">
        <h3>{dest.name}</h3>
        <p>{dest.description}</p>
        <Link href={`/destination/${dest.handle}`} className="btn">
          Explore
        </Link>
      </div>
    </div>
  )
}

