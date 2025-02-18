import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import UserRoutes from "./pages/user/userRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import { SnackbarProvider } from "./hooks/SnackBarContext";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Homepage />} />
          </Route>

          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
