import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./pages/user/UserRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import { SnackbarProvider } from "./hooks/SnackBarContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <Analytics />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
