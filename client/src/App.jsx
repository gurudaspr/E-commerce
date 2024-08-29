
import './App.css'
import { routes } from './routes/Routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
