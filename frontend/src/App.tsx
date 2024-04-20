import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminPage from './pages/AdminPage.tsx'
import HomePage from "./pages/HomePage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
