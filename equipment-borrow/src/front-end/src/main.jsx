/**
 * The main entry point of the React application.
 * Renders the App component wrapped in authentication and request interceptor providers.
 */
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider";
import BaseUriRequestInterceptor from "./interceptors/BaseUriRequestInterceptor";
import { CartItemsProvider } from "./contexts/CartItemsProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BaseUriRequestInterceptor baseUri="http://localhost:3000/api">
      <CartItemsProvider>
          <App />
        </CartItemsProvider>
    </BaseUriRequestInterceptor>
  </AuthProvider>
);
