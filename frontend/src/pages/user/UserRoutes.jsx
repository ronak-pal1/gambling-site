import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import Login from "./Login";
import UserLayout from "./UserLayout";
import AllEvents from "./AllEvents";
import Alerts from "./Alerts";
import TransactionsPage from "./TransactionsPage";
import FAQsPage from "./FAQsPage";
import TermsConditions from "./TermsConditions";
import Homepage from "../Homepage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to={"/dashboard"} />} />

      <Route element={<UserLayout />}>
        <Route index element={<Homepage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-events" element={<AllEvents />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
