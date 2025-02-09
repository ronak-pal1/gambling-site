const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL + "/user",
  withCredentials: true,
});

userApi.defaults.withCredentials = true;

userApi.interceptors.request.use(
  (config) => {
    // No need to add Authorization header manually; cookies will handle authentication
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userApi.interceptors.response.use(
  (response) => {
    // Process the response if needed, but no need to handle tokens here
    return response;
  },
  async (error) => {
    const originalRequest =
      error.config &
      {
        _retry,
      };

    // If we get a 401 Unauthorized error, try to refresh the tokens
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh tokens using the refresh endpoint
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request after successfully refreshing tokens
        return userApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, handle logout or redirect to login as needed
      }
    }

    return Promise.reject(error);
  }
);

export default userApi;
