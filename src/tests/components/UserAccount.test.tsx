import { render, screen } from '@testing-library/react';
import UserAccount from '../../components/UserAccount';
import { User } from '../../entities';

describe('UserAccount', () => {
	it('should render the user name', () => {
		const user: User = { id: 0, name: 'John Doe' };

		render(<UserAccount user={user} />);

		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();

		expect(screen.getByText(user.name)).toBeInTheDocument();
	});

	it('should not render edit button if the user is not admin', () => {
		const user: User = { id: 0, name: 'John Doe', isAdmin: false };

		render(<UserAccount user={user} />);

		const button = screen.queryByRole('button');
		expect(button).not.toBeInTheDocument();
	});

	it('should render edit button if user is admin', () => {
		const user: User = { id: 0, name: 'John Doe', isAdmin: true };

		render(<UserAccount user={user} />);

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/Edit/i);
	});
});
