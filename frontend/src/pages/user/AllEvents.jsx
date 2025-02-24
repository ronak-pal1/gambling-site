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
    <div className="w-full h-full md:px-10 md:py-7 p-4 overflow-y-auto  pb-24 custom-scrollbar space-y-14">
      <h1 className="text-white text-lg md:text-2xl mb-4 md:mb-7 font-medium">
        All Events
      </h1>

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
            prizePoolLabel={event.prizePoolLabel}
          />
        ))}

        {/* <EventCard
          sportName={"test"}
          date={"taga"}
          startTime={"agag"}
          endTime={"agag"}
          eventId={"agag"}
          prizePool={"agag"}
          team1Name={"agag"}
          team2Name={"agag"}
        /> */}
      </div>
    </div>
  );
};

export default AllEvents;
