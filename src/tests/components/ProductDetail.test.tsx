import { render, screen } from '@testing-library/react';
import ProductDetail from '../../components/ProductDetail';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { db } from '../mocks/db';

describe('ProductDetail', () => {
	let productId: number;

	beforeAll(() => {
		const product = db.product.create();
		productId = product.id;
	});

	afterAll(() => {
		db.product.delete({ where: { id: { equals: productId } } });
	});

	it('should render the product details', async () => {
		const product = db.product.findFirst({ where: { id: { equals: productId } } });

		render(<ProductDetail productId={productId} />);

		expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument();
		// -- can not pass number to a regular expression, so convert to string
		expect(await screen.findByText(new RegExp(product!.price.toString()))).toBeInTheDocument();
	});

	it('should render "The given product was not found" when the product is not found', async () => {
		server.use(http.get('/products/1', () => HttpResponse.json(null)));
		render(<ProductDetail productId={1} />);

		expect(await screen.findByText(/not found/i)).toBeInTheDocument();
	});

	it('should render an invalid message for invalid id', async () => {
		render(<ProductDetail productId={0} />);

		expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
	});

	it('should render an error message when there is an error', async () => {
		server.use(http.get('/products/1', () => HttpResponse.error()));
		render(<ProductDetail productId={1} />);

		const message = await screen.findByText(/error/i);
		expect(message).toBeInTheDocument();
	});
});
