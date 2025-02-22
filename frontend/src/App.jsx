import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import UserRoutes from "./pages/user/UserRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import { SnackbarProvider } from "./hooks/SnackBarContext";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
