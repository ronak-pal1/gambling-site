import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { useSnackbar } from "../../hooks/SnackBarContext";
import userApi from "../../apis/userApi";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const { showSnackbar } = useSnackbar();

  const fetchAllEvents = async () => {
    try {
      const res = await userApi.get("/events");

      if (res.status == 200) {
        setEvents(res.data.events);
      }
    } catch (e) {
      showSnackbar("Error in fetch all events", "error");
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="w-full h-full px-10 py-7 overflow-y-auto  pb-24 custom-scrollbar space-y-14">
      <h1 className="text-white text-2xl mb-7 font-medium">All Events</h1>

      <div className="flex flex-wrap gap-6">
        {events.map((event) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
