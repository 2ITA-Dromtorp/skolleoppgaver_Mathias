import axios from "axios";

/**
 * Interceptor component that sets the base URI for Axios requests and Content-Type/Accept Headers to application/json.
 *
 * @param {Object} props - The component props.
 * @param {string} props.baseUri - The base URI to be set for Axios requests.
 * @param {import("react").ReactNode} props.children - The child components to be rendered.
 * @returns {import("react").ReactNode} The rendered child components.
 */
export const BaseUriRequestInterceptor = ({ baseUri, children }) => {
  axios.interceptors.request.use(async (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.baseURL = baseUri;

    return config;
  });

  return <>{children}</>;
};

export default BaseUriRequestInterceptor;
