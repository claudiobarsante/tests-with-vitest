import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductDetail from '../../components/ProductDetail';
import { http, HttpResponse, delay } from 'msw';
import { server } from '../mocks/server';
import { db } from '../mocks/db';
import AllProviders from '../AllProviders';

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

		render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

		expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument();
		// -- can not pass number to a regular expression, so convert to string
		expect(await screen.findByText(new RegExp(product!.price.toString()))).toBeInTheDocument();
	});

	it('should render "The given product was not found" when the product is not found', async () => {
		server.use(http.get('/products/1', () => HttpResponse.json(null)));
		render(<ProductDetail productId={1} />, { wrapper: AllProviders });

		expect(await screen.findByText(/not found/i)).toBeInTheDocument();
	});

	it('should render an invalid message for invalid id', async () => {
		render(<ProductDetail productId={0} />, { wrapper: AllProviders });

		expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
	});

	it('should render an error message when there is an error', async () => {
		server.use(http.get('/products/1', () => HttpResponse.error()));
		render(<ProductDetail productId={1} />, { wrapper: AllProviders });

		const message = await screen.findByText(/error/i);
		expect(message).toBeInTheDocument();
	});

	it('should render a loading indicator when fetching data', async () => {
		server.use(
			http.get('/products', async () => {
				await delay();
				return HttpResponse.json([]);
			})
		);

		render(<ProductDetail productId={1} />, { wrapper: AllProviders });

		const message = await screen.findByText(/loading/i);
		expect(message).toBeInTheDocument();
	});

	it('should remove the loading indicator when fetching data is done', async () => {
		render(<ProductDetail productId={1} />, { wrapper: AllProviders });

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});

	it('should remove the loading indicator when fetching data fails', async () => {
		server.use(
			http.get('/products/1', () => {
				return HttpResponse.error();
			})
		);

		render(<ProductDetail productId={1} />, { wrapper: AllProviders });

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});
});
