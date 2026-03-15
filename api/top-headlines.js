/**
 * Vercel Serverless Function: /api/top-headlines
 *
 * Keeps the NewsAPI key server-side.
 *
 * Required env:
 * - NEWS_API_KEY
 */

/* eslint-env node */
/* global process */

export default async function handler(req, res) {
	try {
		const apiKey = process.env.NEWS_API_KEY;
		if (!apiKey) {
			return res
				.status(500)
				.json({ error: 'Missing NEWS_API_KEY environment variable.' });
		}

		const country = typeof req.query?.country === 'string' ? req.query.country : undefined;
		const category = typeof req.query?.category === 'string' ? req.query.category : undefined;

		const url = new URL('https://newsapi.org/v2/top-headlines');
		if (country) url.searchParams.set('country', country);
		if (category) url.searchParams.set('category', category);

		const upstream = await fetch(url.toString(), {
			headers: {
				'X-Api-Key': apiKey,
			},
		});

		const contentType = upstream.headers.get('content-type') || '';
		const body = contentType.includes('application/json')
			? await upstream.json()
			: await upstream.text();

		// Pass through status
		res.status(upstream.status);
		res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=300');
		if (typeof body === 'string') {
			return res.send(body);
		}
		return res.json(body);
	} catch (err) {
		return res.status(500).json({ error: 'Unexpected error', details: String(err) });
	}
}
