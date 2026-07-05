import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route
          path="*"
          element={
            <NotFound
              title="Page not found"
              desc="The page you're looking for doesn't exist or has been moved."
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
