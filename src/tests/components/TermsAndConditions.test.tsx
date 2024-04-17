import { render, screen } from '@testing-library/react';
import TermsAndConditions from '../../components/TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('TermsAndConditions', () => {
	it('it should render with correct text and initial state', () => {
		render(<TermsAndConditions />);

		const heading = screen.getByRole('heading');

		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/terms & conditions/i);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();

		const button = screen.getByRole('button', { name: /submit/i });

		expect(button).toBeInTheDocument();
		expect(button).toBeDisabled();
	});

	it('should enable the button when the checkbox is checked', async () => {
		render(<TermsAndConditions />);

		const checkbox = screen.getByRole('checkbox');
		const button = screen.getByRole('button', { name: /submit/i });

		const user = userEvent.setup();
		await user.click(checkbox);

		expect(button).toBeEnabled();
	});
});
