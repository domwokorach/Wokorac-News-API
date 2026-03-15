import { describe, expect, it, vi } from 'vitest';
import { fetchTopHeadlines } from './newsApi';

describe('fetchTopHeadlines', () => {
	it('calls /api/top-headlines with query params', async () => {
		const fetchMock = vi.fn(async () => ({
			ok: true,
			json: async () => ({ articles: [] }),
			status: 200,
			statusText: 'OK',
		}));
		vi.stubGlobal('fetch', fetchMock);

		await fetchTopHeadlines({ country: 'us', category: 'general' });

		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [url] = fetchMock.mock.calls[0];
		expect(String(url)).toContain('/api/top-headlines?');
		expect(String(url)).toContain('country=us');
		expect(String(url)).toContain('category=general');

		vi.unstubAllGlobals();
	});

	it('throws a helpful error on non-OK responses', async () => {
		const fetchMock = vi.fn(async () => ({
			ok: false,
			text: async () => 'Upstream error',
			status: 426,
			statusText: 'Upgrade Required',
		}));
		vi.stubGlobal('fetch', fetchMock);

		await expect(
			fetchTopHeadlines({ country: 'us', category: 'general' }),
		).rejects.toThrow(/426/);

		vi.unstubAllGlobals();
	});
});
