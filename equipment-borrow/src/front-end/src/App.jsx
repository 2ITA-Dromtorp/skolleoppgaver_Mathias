import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";

/**
 * The main component of the application.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route element={<PrivateRoute />}>
            <Route path="" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
