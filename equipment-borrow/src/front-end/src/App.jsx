import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRouteAdmin, ProtectedRouteUser } from "./components/auth/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

/**
 * The main component of the application.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route element={<ProtectedRouteUser />}>
            {/* Pages for autneticated users */}
            <Route path="" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRouteAdmin />}>
            {/* Pages for administrators */}
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Public Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="login" element={<Login />} />

          {/* No matching urls */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
