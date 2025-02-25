import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { convertTo12Hour } from "../utils/convertTo12Hour";

const EventCard = ({
  sportName,
  date,
  team1Name,
  team2Name,
  startTime,
  endTime,
  eventId,
  prizePool,
  prizePoolLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/event/${eventId}`)}
      className="bg-blue-500 w-full md:w-[400px] px-2 py-3 md:px-3 md:py-5 rounded-md text-white transition-transform hover:scale-105 cursor-pointer"
    >
      <div className=" flex items-center justify-between text-base md:text-2xl">
        <h1 className="  font-medium">{sportName}</h1>

        <ChevronRightSharpIcon fontSize="inherit" />
      </div>

      <div className="my-2 md:my-4 space-y-2 md:space-y-4">
        <p className="text-sm md:text-xl text-black font-semibold">
          <span className="font-semibold">Match:</span> {team1Name} vs{" "}
          {team2Name}
        </p>
        <p className="text-xs md:text-xl font-light">
          <span className="font-semibold">Date:</span> {formatDate(date)}
        </p>
        <p className="text-xs md:text-xl font-light">
          <span className="font-semibold">Timing:</span>{" "}
          {convertTo12Hour(startTime)} - {convertTo12Hour(endTime)}
        </p>
      </div>

      <div className="w-full bg-[#FEE715] text-black mt-1 md:mt-3 px-2 py-1  md:px-3 md:py-2 rounded-md md:rounded-lg">
        <p className="text-sm md:text-xl font-medium">
          {prizePoolLabel ? prizePoolLabel : "Prize pool"}:{" "}
          {parseFloat(prizePool).toFixed(2)} INR
        </p>
      </div>
    </div>
  );
};

export default EventCard;
