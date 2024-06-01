import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import AdminPage from './pages/AdminPage.tsx'
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import { Box } from "@mui/material";
import DetailsPage from "./pages/DetailsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import FormPage from "./pages/FormPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { PreloadImagesProvider } from "./context/PreLoadImagesContext.tsx";

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "/admin",
      element:
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>,
      errorElement: <NotFoundPage />
    },
    {
      path: "/details",
      element: <DetailsPage />,
      errorElement: <NotFoundPage />
    },
    {
      path: "/form",
      element: <FormPage />,
      errorElement: <NotFoundPage />
    },
  ]);

  return (
    <Box sx={{ width: '98vw', height: '100vh', margin: 0, padding: 0 }}>
      <QueryClientProvider client={queryClient}>
        <PreloadImagesProvider>
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <RouterProvider router={router} />
          </UserProvider>
        </AuthProvider>
        </PreloadImagesProvider>
      </QueryClientProvider>
    </Box>
  )
}

export default App
