type VisitorsEventProperties = Record<string, string | number>

declare global {
	interface Window {
		visitors?: {
			track: (event: string, properties?: VisitorsEventProperties) => void
		}
	}
}

export function useVisitorsTracking() {
	const trackEvent = (event: string, properties?: VisitorsEventProperties) => {
		if (import.meta.server) {
			return
		}

		try {
			window.visitors?.track(event, properties)
		} catch {
			// Analytics should never block core generator interactions.
		}
	}

	return { trackEvent }
}
