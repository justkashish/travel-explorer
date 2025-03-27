"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import TripCard from "../../../components/TripCard";
import { fetchDestination } from "../../../utils/api";
import "./destination.css";

export default function DestinationPage({ params }) {
  const { handle } = useParams();
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDestination(handle.toLowerCase());
        console.log("Fetched Destination Data:", data);
        setDestination(data.destination || {});
        setTrips(data.trips || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching destination data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [handle]);

  const handleContactExpert = () => {
    router.push("/get-in-touch");
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading destination details...</p>
      </div>
    );
  }

  return (
    <div className="destination-page">
      <Navbar />

      <div
        className="destination-hero"
        style={{
          backgroundImage: `url(${
            destination.image_url || "/placeholder.svg?height=500&width=1000"
          })`,
        }}
      >
        <div className="hero-overlay">
          <div className="container">
            <h1>{destination.name}</h1>
            <p>{destination.description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="trips-section">
          <h2>Available Trips for {destination.name}</h2>

          <div className="trips-grid">
            {trips.map((trip, index) => (
              <TripCard key={trip.id || `trip-${index}`} trip={trip} />
            ))}
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
  );
}
