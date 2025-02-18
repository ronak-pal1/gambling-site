import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import LiveAlerts from "../../components/LiveAlerts";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full px-10 py-7 overflow-y-auto  pb-24 custom-scrollbar space-y-14">
      <div>
        <div className="flex w-full justify-between">
          <h1 className="text-white text-2xl mb-7 font-medium">Ongoing</h1>

          <button
            onClick={() => navigate("/dashboard/all-events")}
            className="text-white flex items-center text-lg"
          >
            View all <ChevronRightSharpIcon />
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          <EventCard />
          <EventCard />
        </div>
      </div>

      <div>
        <LiveAlerts />
      </div>
    </div>
  );
};

export default Dashboard;
