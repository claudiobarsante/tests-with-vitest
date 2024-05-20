import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductList from '../../components/ProductList';
import { http, HttpResponse, delay } from 'msw';

import { server } from './../mocks/server';
import { db } from '../mocks/db';
import { QueryClient, QueryClientProvider } from 'react-query';

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

	const renderComponent = () => {
		const client = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false, /// for testing, we don't want to retry the request
				},
			},
		});

		render(
			<QueryClientProvider client={client}>
				<ProductList />
			</QueryClientProvider>
		);
	};
	it('should render the list of products', async () => {
		renderComponent();

		const listItems = await screen.findAllByRole('listitem');
		expect(listItems.length).toBeGreaterThan(0);
	});

	it('should render No products available if there is no products', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.json([]);
			})
		);

		renderComponent();
		const message = await screen.findByText(/No products available/i);
		expect(message).toBeInTheDocument();
	});

	it('should render an error message when there is an error', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.error();
			})
		);

		renderComponent();

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

		renderComponent();

		const message = await screen.findByText(/loading/i);
		expect(message).toBeInTheDocument();
	});

	it('should remove the loading indicator when fetching data is done', async () => {
		renderComponent();

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});

	it('should remove the loading indicator when fetching data fails', async () => {
		server.use(
			http.get('/products', () => {
				return HttpResponse.error();
			})
		);

		renderComponent();

		await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	});
});
