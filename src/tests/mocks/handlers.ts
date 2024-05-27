//import { http, HttpResponse } from 'msw';

import { db } from './db';

// -- this is a way of setting the handler
// import { products } from './data';
// export const handlers = [
// 	// Intercept "GET https://example.com/user" requests...
// 	http.get('/categories', () => {
// 		// ...and respond to them using this JSON response.
// 		return HttpResponse.json([
// 			{ id: 1, name: 'Eletronics' },
// 			{ id: 1, name: 'Beauty' },
// 			{ id: 1, name: 'Gardening' },
// 		]);
// 	}),
// 	http.get('/products', () => {
// 		return HttpResponse.json(products);
// 	}),
// 	http.get('/products/:id', ({ params }) => {
// 		const product = products.find(p => p.id === Number(params.id));

// 		if (!product) return new HttpResponse(null, { status: 404 });

// 		return HttpResponse.json(product);
// 	}),
// ];

//*Easy way with @mswjs/data  */

// -- automatically generates handlers for all your data
export const handlers = [...db.product.toHandlers('rest'), ...db.category.toHandlers('rest')];
