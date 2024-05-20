import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const AllProviders = ({ children }: PropsWithChildren) => {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false, /// for testing, we don't want to retry the request
			},
		},
	});

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default AllProviders;
