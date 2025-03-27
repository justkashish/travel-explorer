import Image from "next/image"
import Link from "next/link"
import "./DestinationCard.css"

export default function DestinationCard({ destination }) {
  return (
    <div className="destination-card">
      <div className="destination-image">
        <Image
          src={destination.image_url || "/bali.png?height=300&width=400"}
          alt={destination.name}
          width={400}
          height={300}
        />
      </div>
      <div className="destination-info">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <Link href={`/destination/${destination.handle}`} className="btn">
          Explore
        </Link>
      </div>
    </div>
  )
}

