import { render, screen } from '@testing-library/react';
import Greet from '../../components/Greet';

describe('Greet', () => {
	it('should render hello with the name when name is provided', () => {
		render(<Greet name='Test name' />);

		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/Hello Test name/i);
	});

	it('should render a button if no name is provided', () => {
		render(<Greet />);

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/Login/i);
	});
});
