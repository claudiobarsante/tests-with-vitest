import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { server } from '../mocks/server';
import BrowseProducts from '../../pages/BrowseProductsPage';
import { Theme } from '@radix-ui/themes';

describe('BrowseProducts', () => {
	const renderComponent = () => {
		render(
			<Theme>
				<BrowseProducts />
			</Theme>
		);
	};
	it('should show a loading skeleton when fetching categories', () => {
		server.use(
			http.get('/categories', async () => {
				await delay();
				return HttpResponse.json([]);
			})
		);

		renderComponent();

		expect(screen.getByRole('progressbar', { name: /categories/i })).toBeInTheDocument();
	});

	it('should hide the loading skeleton after categories are fetched', async () => {
		renderComponent();
		await waitForElementToBeRemoved(() =>
			screen.queryByRole('progressbar', { name: /categories/i })
		);
	});

	it('should show a loading skeleton when fetching products', () => {
		server.use(
			http.get('/products', async () => {
				await delay();
				return HttpResponse.json([]);
			})
		);

		renderComponent();

		expect(screen.getByRole('progressbar', { name: /products/i })).toBeInTheDocument();
	});

	it('should hide the loading skeleton after products are fetched', async () => {
		renderComponent();
		await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', { name: /products/i }));
	});

	it('should not render an error if categories cannot be fecthed', async () => {
		server.use(http.get('/categories', () => HttpResponse.error()));

		renderComponent();

		await waitForElementToBeRemoved(() =>
			screen.queryByRole('progressbar', { name: /categories/i })
		);

		expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
		expect(screen.queryByRole('combobox', { name: /category/i })).not.toBeInTheDocument();
	});

	it('should not render an error if categories cannot be fecthed', async () => {
		server.use(http.get('/products', () => HttpResponse.error()));

		renderComponent();

		await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', { name: /products/i }));

		expect(await screen.findByText(/error/i)).toBeInTheDocument();
	});
});
