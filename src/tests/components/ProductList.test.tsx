import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductList from '../../components/ProductList';
import { http, HttpResponse, delay } from 'msw';

import { server } from './../mocks/server';
import { db } from '../mocks/db';

describe('ProductList', () => {
	const productsIds: number[] = []; // -- have to keep track of the ids of the created products, to delete them after the tests finishes
	beforeAll(() => {
		[1, 2, 3].forEach(() => {
			const product = db.product.create();
			productsIds.push(product.id);
		});
	});
	// -- delete the created products after the tests finishes
	afterAll(() => {
		db.product.deleteMany({ where: { id: { in: productsIds } } });
	});

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

	it('should render an error message when there is an error', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.error();
			})
		);

		render(<ProductList />);

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

		render(<ProductList />);

		const message = await screen.findByText(/loading/i);
		expect(message).toBeInTheDocument();
	});

	it('should remove the loading indicator when fetching data is done', async () => {
		render(<ProductList />);

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});

	it('should remove the loading indicator when fetching data fails', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.error();
			})
		);

		render(<ProductList />);

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});
});
