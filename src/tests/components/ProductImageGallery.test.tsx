import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../components/ProductImageGallery';

describe('ProductImageGallery', () => {
	it('should not render the component when the imageUrls array is empty', () => {
		const result = render(<ProductImageGallery imageUrls={[]} />);
		expect(result.container).toBeEmptyDOMElement();
	});

	it('should render a list of images', () => {
		const imagesUrls = ['url1', 'url2'];
		render(<ProductImageGallery imageUrls={imagesUrls} />);

		const images = screen.getAllByRole('img');
		expect(images).toHaveLength(imagesUrls.length);

		imagesUrls.forEach((imageUrl, index) => {
			expect(images[index]).toHaveAttribute('src', imageUrl);
		});
	});
});
