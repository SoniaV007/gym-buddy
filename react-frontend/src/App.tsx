import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router}/>
        </Provider>
    </QueryClientProvider>
  )
}

export default App
