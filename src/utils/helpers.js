// Helper functions for the application

// Format currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount)
}

// Format date
export function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date))
}

// Generate a range of numbers
export function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
}

// Debounce function for search inputs
export function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Validate email format
export function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
}

// Validate phone number (10 digits)
export function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
}