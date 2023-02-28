import { Router } from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        },
        mutations: {
            retry: false
        }
    }
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    )
}
