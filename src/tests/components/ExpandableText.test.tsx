import { render, screen } from '@testing-library/react';
import ExpandableText from '../../components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
	it('should render the component correctly', () => {
		const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, veniam!';
		render(<ExpandableText text={lorem} />);

		const button = screen.queryByRole('button');

		expect(screen.getByText(lorem)).toBeInTheDocument();
		expect(button).not.toBeInTheDocument();
	});

	it('should render a truncate text and button with show more', () => {
		const limit = 255;
		const lorem =
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis voluptatibus provident magni in illum cum esse adipisci asperiores culpa. Quibusdam alias incidunt quod modi qui ratione voluptas culpa explicabo quis deleniti. Ipsam necessitatibus, sunt eum reiciendis voluptatum iure rem deleniti enim accusamus possimus qui ut debitis quidem, nam expedita laudantium nostrum voluptate cupiditate nisi officia ratione id. Laudantium molestiae quam totam distinctio animi eaque facere beatae velit doloribus deserunt at dignissimos error veniam quos itaque, dolores corporis commodi nostrum doloremque dolore magni porro sit architecto quibusdam! Totam aspernatur, ratione rerum perferendis atque officiis sequi modi dolor, consequuntur, iste facere molestiae.';
		render(<ExpandableText text={lorem} />);

		const article = screen.getByRole('article');
		const truncated = lorem.slice(0, limit) + '...';

		expect(article).toHaveTextContent(truncated);
		expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
	});

	it('should show the full text when button is clicked', async () => {
		const lorem =
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere harum similique voluptatibus possimus, eligendi facilis. Ad voluptate ut ullam dicta, cupiditate itaque velit delectus neque qui facere et, enim provident magnam dignissimos. Laborum sint debitis eveniet architecto vel eum eaque, natus corporis libero iusto sunt, corrupti magni in alias tenetur doloribus vitae! Nostrum, ipsum voluptatem molestiae aut illo natus incidunt ipsa dolorem assumenda cum, maxime inventore similique harum. Repellat facere, in saepe obcaecati consequuntur non quisquam accusantium ex magnam officia animi sit molestias fuga quia necessitatibus hic aliquid ut tempore eligendi ducimus amet unde dicta placeat. Eos ad totam magnam eveniet. Praesentium iusto ipsum repellendus provident quae numquam ea quos porro officia. Perspiciatis ullam molestias odio in fugit consectetur delectus. Aliquid nostrum, tempora suscipit voluptatum cum hic nemo reiciendis laborum minima pariatur debitis facilis dolorem vero distinctio repudiandae maiores est delectus iste tempore saepe cupiditate. Voluptatibus maxime, voluptatem quo fugiat similique deserunt, cupiditate aliquid minus fuga non explicabo autem consequatur expedita perferendis sapiente cum quasi dolorum molestias ullam dolores commodi, labore facere! Incidunt animi quasi veniam nam ipsa culpa, itaque aspernatur, odio exercitationem alias beatae quidem maiores dignissimos similique, eum sunt dolore voluptas rerum illo? Numquam delectus expedita consequuntur odio.';
		render(<ExpandableText text={lorem} />);

		const article = screen.getByRole('article');

		const user = userEvent.setup();

		await user.click(screen.getByRole('button', { name: /show more/i }));

		expect(article).toHaveTextContent(lorem);
		expect(screen.queryByRole('button')).toHaveTextContent(/show less/i);
	});
});
