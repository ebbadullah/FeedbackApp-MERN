export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
}

export function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export function formatTime(date) {
    const d = new Date(date)
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

export function truncateText(text, length = 100) {
    if (!text) return ""
    if (text.length <= length) return text
    return text.slice(0, length) + "..."
}

export function generateId() {
    return Math.random().toString(36).substring(2, 9)
}

export function debounce(func, wait = 300) {
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