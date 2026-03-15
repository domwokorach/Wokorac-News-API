#!/usr/bin/env node

const url = 'http://localhost:5174/api/top-headlines?country=us&category=general';

console.log(`Testing: ${url}\n`);

try {
	const res = await fetch(url, {
		headers: { accept: 'application/json' },
	});

	console.log(`Status: ${res.status} ${res.statusText}`);
	console.log(`Headers:`, Object.fromEntries(res.headers.entries()));

	const text = await res.text();
	console.log(`\nBody (first 2000 chars):\n${text.slice(0, 2000)}`);

	if (res.headers.get('content-type')?.includes('application/json')) {
		try {
			const json = JSON.parse(text);
			console.log('\n✅ Valid JSON response');
			if (json.status === 'ok') {
				console.log(`✅ NewsAPI success: ${json.totalResults} articles`);
			} else {
				console.log(`❌ NewsAPI error:`, json);
			}
		} catch {
			console.log('❌ JSON parse failed');
		}
	}
} catch (err) {
	console.error('❌ Fetch failed:', err.message);
	process.exit(1);
}
