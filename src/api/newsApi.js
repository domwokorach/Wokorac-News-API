const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

/**
 * Fetches top headlines via the app's proxy endpoint.
 *
 * Contract:
 * - Inputs: { country, category }
 * - Output: NewsAPI json payload (at least { articles: [] })
 * - Errors: throws Error with message for UI/logging
 */
export async function fetchTopHeadlines({ country, category }) {
	const params = new URLSearchParams();
	if (isNonEmptyString(country)) params.set('country', country);
	if (isNonEmptyString(category)) params.set('category', category);

	const res = await fetch(`/api/top-headlines?${params.toString()}`, {
		headers: {
			accept: 'application/json',
		},
	});
	if (!res.ok) {
		let details = '';
		try {
			const errorData = await res.json();
			details = JSON.stringify(errorData, null, 2);
		} catch {
			try {
				details = await res.text();
			} catch {
				// ignore
			}
		}
		throw new Error(`Failed to fetch news (${res.status}): ${details || res.statusText}`);
	}
	return res.json();
}
