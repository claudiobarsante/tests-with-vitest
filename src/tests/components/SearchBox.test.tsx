import { render, screen } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const onChange = vi.fn();
	const renderSearchBox = () => {
		render(<SearchBox onChange={onChange} />);

		return {
			input: screen.getByPlaceholderText(/search/i),
			onChange,
			user: userEvent.setup(),
		};
	};

	it('should render an input field for searching', () => {
		const { input } = renderSearchBox();
		expect(input).toBeInTheDocument();
	});

	it('should call onChange when Enter is pressed', async () => {
		const { user, input, onChange } = renderSearchBox();

		const searchTerm = 'any text';
		await user.type(input, searchTerm + '{enter}'); //{enter} to simulate the user pressing 'enter'

		expect(onChange).toHaveBeenCalledWith(searchTerm);
	});

	it('should not call onChange if input field  is empty', async () => {
		const { user, input, onChange } = renderSearchBox();

		await user.type(input, '{enter}'); //{enter} to simulate the user pressing 'enter'

		expect(onChange).not.toHaveBeenCalled();
	});
});
