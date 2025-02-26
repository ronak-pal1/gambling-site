import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import LiveAlerts from "../../components/LiveAlerts";
import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [ongoingEvents, setOngoingEvents] = useState([]);

  const fetchPinnedEvents = async () => {
    try {
      const res = await userApi.get("/pinned-events");

      if (res.status == 200) {
        setOngoingEvents(res.data.events);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchPinnedEvents();
  }, []);

  return (
    <div className="w-full h-full px-5 md:px-10 py-7 overflow-y-auto  pb-24 custom-scrollbar space-y-14">
      <div>
        <div className="flex w-full  items-center justify-between mb-7">
          <h1 className="text-white text-lg md:text-2xl font-medium">
            Trending
          </h1>

          <button
            onClick={() => navigate("/dashboard/all-events")}
            className="text-white flex items-center text-base md:text-lg"
          >
            View all <ChevronRightSharpIcon />
          </button>
        </div>

        <div className="flex md:flex-wrap  overflow-x-scroll w-full md:overflow-x-hidden md:overflow-y-hidden  gap-0 md:gap-6">
          {ongoingEvents.length != 0 ? (
            innerWidth >= 600 ? (
              ongoingEvents?.map((event) => (
                <EventCard
                  key={event._id}
                  sportName={event.sportName}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  eventId={event._id}
                  prizePool={event.prizePool}
                  team1Name={event.team1Name}
                  team2Name={event.team2Name}
                  prizePoolLabel={event.prizePoolLabel}
                  width="400px"
                />
              ))
            ) : (
              <div className="flex flex-col gap-y-6 w-full">
                <div className="flex gap-6 w-full">
                  {ongoingEvents
                    .slice(0, Math.ceil(ongoingEvents.length / 2))
                    ?.map((event) => (
                      <EventCard
                        key={event._id}
                        sportName={event.sportName}
                        date={event.date}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        eventId={event._id}
                        prizePool={event.prizePool}
                        team1Name={event.team1Name}
                        team2Name={event.team2Name}
                        prizePoolLabel={event.prizePoolLabel}
                        width={innerWidth.length > 2 ? "85%" : "100%"}
                      />
                    ))}
                </div>
                <div className="flex gap-6 w-full">
                  {ongoingEvents
                    .slice(Math.ceil(ongoingEvents.length / 2))
                    ?.map((event) => (
                      <EventCard
                        key={event._id}
                        sportName={event.sportName}
                        date={event.date}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        eventId={event._id}
                        prizePool={event.prizePool}
                        team1Name={event.team1Name}
                        team2Name={event.team2Name}
                        prizePoolLabel={event.prizePoolLabel}
                        width={innerWidth.length > 2 ? "85%" : "100%"}
                      />
                    ))}
                </div>
              </div>
            )
          ) : (
            <div className="w-full py-6 text-center">
              <p className="text-slate-300">No ongoing events</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <LiveAlerts />

        <div className="w-full text-center">
          <p className="text-sm text-red-400">
            I have accepted all the Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
