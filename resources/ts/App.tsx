import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/AuthContext';
import { Router } from './Router';

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
        <BrowserRouter>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
            <Router />
            <ToastContainer 
                closeOnClick
                theme="colored" 
            />
            </QueryClientProvider>
        </AuthProvider>
        </BrowserRouter>
    );
};
