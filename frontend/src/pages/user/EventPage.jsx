const TeamCard = ({ teamColor }) => {
  return <div className={`w-full h-full ${teamColor}`}></div>;
};

const EventPage = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col pt-6">
      <div className="flex-[0.4] w-full h-full flex items-center">
        <div className="flex-[0.4] w-full h-full [&>div]:rounded-r-lg">
          <TeamCard teamColor={"bg-blue-600"} />
        </div>

        <div className="flex-[0.2] text-center">
          <p className="text-white text-7xl">VS</p>
          <button className="bg-[#FEE715] px-3 py-1 text-xl font-medium mt-8 rounded-md">
            Bet Now
          </button>
        </div>

        <div className="flex-[0.4] w-full h-full [&>div]:rounded-l-lg">
          <TeamCard teamColor={"bg-orange-400"} />
        </div>
      </div>

      <div className="flex-[0.6] w-full h-full flex">
        <div className="flex-[0.4] w-full h-full"></div>

        <div className="flex-[0.2] w-full h-full"></div>

        <div className="flex-[0.4] w-full h-full"></div>
      </div>
    </div>
  );
};

export default EventPage;
