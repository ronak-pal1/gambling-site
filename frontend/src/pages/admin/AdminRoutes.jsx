import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import AdminLayout from "./AdminLayout";
import AddEvents from "./AddEvents";
import ModifyEvents from "./ModifiyEvents";
import AddCoins from "./AddCoins";
import ChangeQR from "./ChangeQR";
import Users from "./AddUsers";
import Layout from "../../Layout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route
          path="/*"
          element={<Navigate to={"/admin/dashboard/add-events"} />}
        />
        <Route path="/dashboard/add-events" element={<AddEvents />} />
        <Route path="/dashboard/modify-events" element={<ModifyEvents />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/add-coins" element={<AddCoins />} />
        <Route path="/dashboard/change-qr" element={<ChangeQR />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
