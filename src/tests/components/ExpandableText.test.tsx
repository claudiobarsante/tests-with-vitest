import { render, screen } from '@testing-library/react';
import ExpandableText from '../../components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
	const limit = 255;
	const smallText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, veniam!';
	const longText =
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis voluptatibus provident magni in illum cum esse adipisci asperiores culpa. Quibusdam alias incidunt quod modi qui ratione voluptas culpa explicabo quis deleniti. Ipsam necessitatibus, sunt eum reiciendis voluptatum iure rem deleniti enim accusamus possimus qui ut debitis quidem, nam expedita laudantium nostrum voluptate cupiditate nisi officia ratione id. Laudantium molestiae quam totam distinctio animi eaque facere beatae velit doloribus deserunt at dignissimos error veniam quos itaque, dolores corporis commodi nostrum doloremque dolore magni porro sit architecto quibusdam! Totam aspernatur, ratione rerum perferendis atque officiis sequi modi dolor, consequuntur, iste facere molestiae.';

	it('should render the full text if less than 255 characters', () => {
		render(<ExpandableText text={smallText} />);

		const button = screen.queryByRole('button');

		expect(screen.getByText(smallText)).toBeInTheDocument();
		expect(button).not.toBeInTheDocument();
	});

	it('should truncate text if longer than 255 characters and button with show more', () => {
		render(<ExpandableText text={longText} />);

		const article = screen.getByRole('article');
		const truncated = longText.slice(0, limit) + '...';

		expect(article).toHaveTextContent(truncated);
		expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
	});

	it('should show the full text when button is clicked', async () => {
		render(<ExpandableText text={longText} />);

		const article = screen.getByRole('article');

		const user = userEvent.setup();

		await user.click(screen.getByRole('button', { name: /show more/i }));

		expect(article).toHaveTextContent(longText);
		expect(screen.queryByRole('button')).toHaveTextContent(/show less/i);
	});

	it('should collapse text when Show Less button is clicked', async () => {
		render(<ExpandableText text={longText} />);

		const article = screen.getByRole('article');
		const truncated = longText.slice(0, limit) + '...';

		const user = userEvent.setup();

		const showMoreButton = screen.getByRole('button', { name: /show more/i });
		await user.click(showMoreButton);

		const showLessButton = screen.getByRole('button', { name: /show less/i });
		await user.click(showLessButton);

		expect(article).toHaveTextContent(truncated);
		expect(showMoreButton).toHaveTextContent(/ more/i);
	});
});
