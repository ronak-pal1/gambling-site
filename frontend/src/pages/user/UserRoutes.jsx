import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import Login from "./Login";
import Layout from "../../Layout";

function UserRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
