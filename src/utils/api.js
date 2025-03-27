// Utility functions for API calls

export async function fetchBanners() {
    try {
        const response = await fetch("https://json-data-1wm2.onrender.com/banners")
        if (!response.ok) {
            throw new Error("Failed to fetch banners")
        }
        const data = await response.json();
        console.log(data);
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Error fetching banners:", error)
        return []
    }
}

export async function fetchFeaturedDestinations() {
    try {
        const response = await fetch("https://json-data-1wm2.onrender.com/featured-destination")
        if (!response.ok) {
            throw new Error("Failed to fetch featured destinations")
        }
        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Error fetching featured destinations:", error)
        return []
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
            return await response.json()
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
    const name = handle.charAt(0).toUpperCase() + handle.slice(1)

    return {
        destination: {
            name,
            description: `Discover the beauty of ${name} with our exclusive travel packages. Experience the local culture, cuisine, and attractions.`,
            image_url: "/placeholder.svg?height=500&width=1000",
        },
        trips: Array.from({ length: 5 }, (_, index) => ({
            id: index + 1,
            name: `${name} Adventure Tour ${index + 1}`,
            price: Math.floor(Math.random() * 50000) + 30000,
            duration: Math.floor(Math.random() * 7) + 3,
            amenities: ["Hotel", "Breakfast", "Tour Guide", "Airport Transfer", "Sightseeing"],
            image_url: "/placeholder.svg?height=300&width=400",
        })),
    }
}