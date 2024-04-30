import { render, screen } from '@testing-library/react';
import ProductDetail from '../../components/ProductDetail';
import { products } from '../mocks/data';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

describe('ProductDetail', () => {
	it('should render the product detail', async () => {
		render(<ProductDetail productId={1} />);

		expect(await screen.findByText(new RegExp(products[0].name))).toBeInTheDocument();
		// -- can not pass number to a regular expression, so convert to string
		expect(await screen.findByText(new RegExp(products[0].price.toString()))).toBeInTheDocument();
	});

	it('should render "The given product was not found" when the product is not found', async () => {
		server.use(http.get('/products/1', () => HttpResponse.json(null)));
		render(<ProductDetail productId={1} />);

		expect(await screen.findByText(/not found/i)).toBeInTheDocument();
	});

	it('should render an error for invalid id', async () => {
		render(<ProductDetail productId={0} />);

		expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
	});
});
