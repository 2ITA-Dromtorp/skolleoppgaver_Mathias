import axios from "axios";

const authStorageKey = "auth";

let auth = getCachedAuth();

/**
 * Retrieves the cached authentication data from the local storage.
 * @returns {Object|null} The cached authentication data, or null if it doesn't exist or is invalid.
 */
export function getCachedAuth() {
  const authData = localStorage.getItem(authStorageKey);
  try {
    return authData == null ? null : JSON.parse(authData);
  }
  catch (error) {
    console.error("Failed to read stored auth object", error);
    localStorage.removeItem(authStorageKey);
  }
}

/**
 * Validates the token based on the expiration time.
 *
 * @param {number} expiresOn - The expiration time of the token.
 * @returns {boolean} - Returns true if the token is valid, otherwise false.
 */
export function validateToken(expiresOn) {
  const current_time = Date.now().valueOf();
    return typeof expiresOn === 'number' && expiresOn > current_time;
}

/**
 * Logs in a user with the provided username and password.
 */
export async function login(username, password) {
  try {
    const response = await axios.post("v1/auth/login", { username, password });
    auth = {
      token: response.data.token,
      user: response.data.user,
      expiresOn: Date.parse(response.data.expires),
    };

    localStorage.setItem(authStorageKey, JSON.stringify(auth));
    return {
      success: true,
      auth,
    };
  } catch (error) {
    console.error("Login error", error);
    return {
      success: false,
      auth: null,
      error: new Error("Invalid credentials"),
    };
  }
}

export function logout() {
  auth = null;
  localStorage.removeItem(authStorageKey);
}

export default { login, logout, validateToken, getCachedAuth };
