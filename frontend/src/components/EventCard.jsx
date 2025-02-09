import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import { useNavigate } from "react-router-dom";

const EventCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/event")}
      className="bg-blue-500 w-[400px] px-3 py-5 rounded-md text-white transition-transform hover:scale-105 cursor-pointer"
    >
      <div className=" flex items-center justify-between">
        <h1 className=" text-2xl font-medium">Cricket</h1>

        <ChevronRightSharpIcon />
      </div>

      <div className="my-4 space-y-4">
        <p className="text-xl font-light">
          <span className="font-semibold">Match:</span> NIET vs Law
        </p>
        <p className="text-xl font-light">
          <span className="font-semibold">Date:</span> 11/02/2025
        </p>
        <p className="text-xl font-light">
          <span className="font-semibold">Timing:</span> 9 AM - 4 PM
        </p>
      </div>

      <div className="w-full bg-[#FEE715] text-black mt-3 px-3 py-2 rounded-lg">
        <p className="text-2xl font-medium">Prize pool: 20000 INR</p>
      </div>
    </div>
  );
};

export default EventCard;
