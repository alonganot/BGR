import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminPage from './pages/AdminPage.tsx'
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import { Box } from "@mui/material";
import DetailsPage from "./pages/DetailsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "/admin",
      element: <AdminPage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "/details",
      element: <DetailsPage />,
      errorElement: <NotFoundPage />
    },
  ]);
  return (
    <Box sx={{width: '100vw', height: '100vh', margin: 0, padding: 0}}>
      <Navbar />
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
