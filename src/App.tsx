import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
