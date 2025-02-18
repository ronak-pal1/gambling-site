import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import Login from "./Login";
import UserLayout from "./UserLayout";
import AllEvents from "./AllEvents";
import Alerts from "./Alerts";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to={"/dashboard"} />} />

      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-events" element={<AllEvents />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/alerts" element={<Alerts />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
