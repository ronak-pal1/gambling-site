import EventCard from "../../components/EventCard";

const AllEvents = () => {
  return (
    <div className="w-full h-full px-10 py-7 overflow-y-auto  pb-24 custom-scrollbar space-y-14">
      <h1 className="text-white text-2xl mb-7 font-medium">Upcoming</h1>

      <div className="flex flex-wrap gap-6">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default AllEvents;
