import coinSVG from "../assets/coin.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AlertCard = () => {
  return (
    <div className="w-full px-4 py-3 rounded-md bg-orange-300 hover:scale-[1.01] transition-transform">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-lg font-medium">
          <p>Bet of</p>

          <div className="flex items-center space-x-3">
            <img src={coinSVG} className="w-5 object-contain" />
            <p>200</p>
          </div>
        </div>

        <div className="bg-neutral-700 text-white px-3 py-1 rounded-full">
          <p className="text-xs">4m:32s</p>
        </div>
      </div>

      {/*  */}
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="">Sport Name: Cricket</p>
          <p>Match: NIET vs Medical</p>
        </div>

        {/* label */}
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full">
          <p className="text-xs">Matched</p>
        </div>
      </div>
    </div>
  );
};

const LiveAlerts = () => {
  return (
    <div className="w-full flex justify-center pb-10">
      <div className="w-[80%] bg-neutral-100 px-8 py-7 rounded-lg">
        <h1 className="text-2xl text-black font-medium">Alerts</h1>

        <div className="mt-5 space-y-6">
          <AlertCard />
          <AlertCard />
          <AlertCard />
          <AlertCard />
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;
