import './App.css';
import Routing from './routing/routing';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Routing/>
    </QueryClientProvider>
  );
}

export default App;
