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

		window.visitors?.track(event, properties)
	}

	return { trackEvent }
}
