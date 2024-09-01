
import './App.css'
import { routes } from './routes/Routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
