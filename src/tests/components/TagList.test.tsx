import { render, screen } from '@testing-library/react';
import TagList from '../../components/TagList';

describe('TagList', () => {
	it('should render tags', async () => {
		render(<TagList />);

		const listItems = await screen.findAllByRole('listitem');
		expect(listItems.length).toBe(3);
	});
});
