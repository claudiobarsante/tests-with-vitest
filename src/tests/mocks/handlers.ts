import { http, HttpResponse } from 'msw';

export const handlers = [
	// Intercept "GET https://example.com/user" requests...
	http.get('/categories', () => {
		// ...and respond to them using this JSON response.
		return HttpResponse.json([
			{ id: 1, name: 'Eletronics' },
			{ id: 1, name: 'Beauty' },
			{ id: 1, name: 'Gardening' },
		]);
	}),
];
