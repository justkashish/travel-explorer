// Utility functions for API calls

export async function fetchBanners() {
    try {
        const response = await fetch("https://json-data-1wm2.onrender.com/banners")
        if (!response.ok) {
            throw new Error("Failed to fetch banners")
        }
        const data = await response.json();
        console.log(data);
        return Array.isArray(data.banners) ? data.banners : []
    } catch (error) {
        console.error("Error fetching banners:", error)
        return [{
                id: 1,
                title: "Discover Amazing Destinations",
                description: "Plan your perfect trip with us",
                image_url: "/images/default-banner.jpg",
            },
            {
                id: 2,
                title: "Explore the World",
                description: "Unforgettable experiences await",
                image_url: "/images/default-banner.jpg",
            },
        ]
    }
}

export async function fetchFeaturedDestinations() {
    try {
        const response = await fetch("https://json-data-1wm2.onrender.com/featured-destination")
        if (!response.ok) {
            throw new Error("Failed to fetch featured destinations")
        }
        const data = await response.json()
        return Array.isArray(data.destination) ? data.destination : []
    } catch (error) {
        console.error("Error fetching featured destinations:", error)
        return [{
                id: 1,
                name: "Maldives",
                description: "Experience paradise on Earth with crystal clear waters and white sandy beaches.",
                handle: "maldives",
                image_url: "/images/placeholder.jpg",
            },
            {
                id: 2,
                name: "Egypt",
                description: "Discover ancient wonders and explore the rich history of this fascinating country.",
                handle: "egypt",
                image_url: "/images/placeholder.jpg",
            },
            {
                id: 3,
                name: "Bali",
                description: "Relax in the tropical paradise with beautiful beaches, temples and lush landscapes.",
                handle: "bali",
                image_url: "/images/placeholder.jpg",
            },
            {
                id: 4,
                name: "Dubai",
                description: "Experience luxury and adventure in this modern city of architectural marvels.",
                handle: "dubai",
                image_url: "/images/placeholder.jpg",
            },
        ]
    }
}

export async function fetchDestination(handle) {
    try {
        // Only fetch data for Egypt and Bhutan as per requirements
        if (handle === "egypt" || handle === "bhutan") {
            const response = await fetch(`https://json-data-1wm2.onrender.com/destination/${handle}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch destination: ${handle}`)
            }

            const data = await response.json();
            console.log(`Fetched Destination Data for ${handle}:`, data);
            return data;
        } else {
            // For other destinations, return mock data
            return createMockDestinationData(handle)
        }
    } catch (error) {
        console.error(`Error fetching destination ${handle}:`, error)
        return createMockDestinationData(handle)
    }
}

function createMockDestinationData(handle) {
    const name = handle.charAt(0).toUpperCase() + handle.slice(1).replace(/-/g, " ")

    return {
        destination: {
            name,
            description: `Discover the beauty of ${name} with our exclusive travel packages. Experience the local culture, cuisine, and attractions.`,
            image_url: "/images/default-banner.jpg",
        },
        trips: Array.from({ length: 5 }, (_, index) => ({
            id: index + 1,
            name: `${name} Adventure Tour ${index + 1}`,
            price: Math.floor(Math.random() * 50000) + 30000,
            duration: `${Math.floor(Math.random() * 7) + 3} days`,
            amenities: [
                "5-star hotel accommodation", "Nile cruise", "Private guided tours", "Airport transfers", "Daily breakfast"
            ],
            image_url: "/images/placeholder.jpg",
        })),
    }
}