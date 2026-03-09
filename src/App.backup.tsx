import { AppRoutes } from './routes/AppRoutes';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus';

const App = () => {
  console.log('🚀 App component rendering');
  
  return (
    <ErrorBoundary>
      <NetworkStatus>
        <ToastProvider>
          <AppRoutes />
          <ToastContainer />
        </ToastProvider>
      </NetworkStatus>
    </ErrorBoundary>
  );
};

export default App;
