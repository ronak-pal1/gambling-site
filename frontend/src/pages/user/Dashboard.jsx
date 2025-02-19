import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import LiveAlerts from "../../components/LiveAlerts";
import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [ongoingEvents, setOngoingEvents] = useState([]);

  const fetchOngoingEvents = async () => {
    try {
      const res = await userApi.get("/ongoing-events");

      if (res.status == 200) {
        setOngoingEvents(res.data.events);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchOngoingEvents();
  }, []);

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
          {ongoingEvents.length != 0 ? (
            ongoingEvents.map((event) => (
              <EventCard
                key={event._id}
                sportName={event.sportName}
                date={event.date}
                startTime={event.startTime}
                endTime={event.endTime}
                eventId={event._id}
                prizePool={event.prizePool}
                team1Name={event.team1Name}
                team2Name={team2Name}
              />
            ))
          ) : (
            <div className="w-full py-6 text-center">
              <p className="text-slate-300">No ongoing events</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <LiveAlerts />
      </div>
    </div>
  );
};

export default Dashboard;
