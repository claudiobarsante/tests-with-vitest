import { render, screen } from '@testing-library/react';
import ToastDemo from '../../components/ToastDemo';
import userEvent from '@testing-library/user-event';
import { Toaster } from 'react-hot-toast';

describe('ToastDemo', () => {
	// const renderToastDemo = ()=> {

	//      return {
	//           button:screen.getByRole('button', { name: /show/i })
	//      }
	// }
	it('should render a toast', () => {
		render(
			<>
				<ToastDemo />
				<Toaster />
			</>
		);

		const button = screen.getByRole('button', { name: /show/i });
		expect(button).toBeInTheDocument();
	});

	it('should show a toast message on button clikc', async () => {
		render(
			<>
				<ToastDemo />
				<Toaster />
			</>
		);
		const button = screen.getByRole('button', { name: /show/i });

		const user = userEvent.setup();

		await user.click(button);

		const message = await screen.findByText(/success/i);
		expect(message).toBeInTheDocument();
	});
});
