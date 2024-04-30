import { render, screen } from '@testing-library/react';
import ProductList from '../../components/ProductList';
import { http, HttpResponse } from 'msw';

import { server } from './../mocks/server';

describe('ProductList', () => {
	it('should render the list of products', async () => {
		render(<ProductList />);

		const listItems = await screen.findAllByRole('listitem');
		expect(listItems.length).toBeGreaterThan(0);
	});

	it('should render No products available if there is no products', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.json([]);
			})
		);

		render(<ProductList />);
		const message = await screen.findByText(/No products available/i);
		expect(message).toBeInTheDocument();
	});
});
