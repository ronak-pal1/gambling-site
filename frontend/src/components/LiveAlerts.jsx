import { useEffect, useState } from "react";
import coinSVG from "../assets/coin.svg";
import userApi from "../apis/userApi";
import { CircularProgress, Modal } from "@mui/material";
import { useSnackbar } from "../hooks/SnackBarContext";
import CloseIcon from "@mui/icons-material/Close";
import { addMinutesToCurrentTime } from "../utils/convertTo12Hour";

const AlertCard = ({
  amount,
  odds,
  team,
  sportName,
  team1,
  team2,
  endTime,
  status,
  alertId,
  oppositeOdds,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const { showSnackbar } = useSnackbar();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime(); // Convert MongoDB timestamp to Date
    const difference = end - now;

    if (difference <= 0) return { minutes: 0, seconds: 0 }; // Stop at 0

    return {
      minutes: Math.floor(difference / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [timing, setTiming] = useState("2m");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (timeLeft.minutes != 0 || timeLeft.seconds != 0)
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [endTime]);

  const acceptBet = async () => {
    if (isLoading) return;

    if (totalAmount == 0) {
      showSnackbar("Total amount can't be 0 to accept bet", "warning");
    }

    setIsLoading(true);
    try {
      const res = await userApi.post("/accept-bet", {
        alertId,
        amount: totalAmount,
        endTime: addMinutesToCurrentTime(timing),
      });

      if (res.status == 200) {
        showSnackbar("The bet is accepted", "success");
        setIsAlertModalOpen(false);
      }
    } catch (e) {
      showSnackbar(e.response.data.message, "error");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal open={isAlertModalOpen}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[50%] rounded-lg text-center py-3 px-4">
            <div className="w-full flex justify-end text-2xl">
              <CloseIcon
                onClick={() => {
                  setIsAlertModalOpen(false);
                  setTotalAmount(0);
                }}
                fontSize="inherit"
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-lg md:text-3xl font-medium">
              Accept bet on {team == team1 ? team2 : team1}
            </h1>

            <div className="my-6">
              <div className="flex items-center justify-center space-x-5  text-xs md:text-base">
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 100);
                      else setTotalAmount((amount) => amount - 100);
                    }}
                  />
                  <label>100/-</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 200);
                      else setTotalAmount((amount) => amount - 200);
                    }}
                  />
                  <label>200/-</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 500);
                      else setTotalAmount((amount) => amount - 500);
                    }}
                  />
                  <label>500/-</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 1000);
                      else setTotalAmount((amount) => amount - 1000);
                    }}
                  />
                  <label>1000/-</label>
                </div>
              </div>

              <div className="my-7 items-center w-full">
                <p className="text-base md:text-xl font-semibold">
                  Total: {totalAmount}/-
                </p>
                <p className="text-base md:text-xl font-semibold">
                  Win amount: {(totalAmount * oppositeOdds).toFixed(2)}/-
                </p>
              </div>

              <div className="w-full flex items-center justify-center space-x-4 md:text-base text-sm">
                <p className="text-lg font-medium">Timers: </p>
                <div className="flex items-center space-x-4">
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={timing == "2m"}
                      onChange={(e) => {
                        if (e.target.checked) setTiming("2m");
                      }}
                    />
                    <label>2m</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={timing == "4m"}
                      onChange={(e) => {
                        if (e.target.checked) setTiming("4m");
                      }}
                    />
                    <label>4m</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={timing == "5m"}
                      className="mr-2"
                      onChange={(e) => {
                        if (e.target.checked) setTiming("5m");
                      }}
                    />
                    <label>5m</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={timing == "10m"}
                      onChange={(e) => {
                        if (e.target.checked) setTiming("10m");
                      }}
                    />
                    <label>10m</label>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={acceptBet}
              className={`bg-[#fee715d5] px-5 py-1 text-sm md:text-lg font-medium rounded-md w-fit text-center  ${
                totalAmount == 0 && "opacity-70"
              }`}
            >
              {isLoading ? (
                <CircularProgress size={"20px"} />
              ) : (
                "Accept & Start Bet"
              )}
            </button>
          </div>
        </div>
      </Modal>

      <div
        onClick={() => {
          if (status == "Matched")
            showSnackbar("Bet is already matched", "info");
          else if (status == "Pending" || status == "Partial")
            setIsAlertModalOpen(true);
        }}
        className="w-full px-4 py-3 rounded-md bg-orange-300 hover:scale-[1.01] transition-transform cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4 text-xs md:text-lg font-medium space-y-3 md:space-y-0">
            <div className="flex items-center space-x-3">
              <p>Bet of</p>
              <img src={coinSVG} className="w-5 object-contain" />
              <p>
                {parseFloat(amount).toFixed(2)} on {team}
              </p>
            </div>

            <p>
              <span className=" text-blue-500 md:ml-9">Odds: {odds}x</span>
            </p>

            <div className="md:pl-8">
              <p className="">Total Amount: {(amount * odds).toFixed(2)}/-</p>
            </div>
          </div>

          <div className="bg-neutral-700 text-white px-3 py-1 rounded-full">
            <p className="text-[10px] md:text-xs">
              {timeLeft.minutes}m:{timeLeft.seconds}s
            </p>
          </div>
        </div>

        {/*  */}
        <div className="my-3 flex items-center justify-between">
          <div className="flex flex-col md:flex-row  items-start md:items-center text-xs md:text-base md:space-x-4 space-y-2 md:space-y-0">
            <p>
              <span className="font-bold">Sport Name:</span> {sportName}
            </p>
            <p>
              <span className="font-bold">Match:</span> {team1} vs {team2}
            </p>
          </div>

          {/* label */}
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full">
            <p className="text-[10px] md:text-xs">{status}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await userApi.get("/alerts");

      if (res.status == 200) {
        setAlerts(res.data.alerts);
        console.log(res);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="w-full md:w-[80%] bg-neutral-100 p-4 md:px-8 md:py-7 rounded-lg">
        <h1 className="text-lg md:text-2xl text-black font-medium">Alerts</h1>

        <div className="mt-5 space-y-6">
          {alerts.length == 0 ? (
            <div className="w-full text-center">
              <p className="text-slate-600 text-sm md:text-base">
                No alerts avaiable
              </p>
            </div>
          ) : (
            alerts?.map((alert) => (
              <AlertCard
                key={alert._id}
                sportName={alert.sportName}
                amount={alert.amount}
                status={alert.status}
                odds={alert.odds}
                team={alert.team}
                endTime={alert.endTime}
                team1={alert.team1}
                team2={alert.team2}
                alertId={alert._id}
                oppositeOdds={alert.oppositeOdds}
              />
            ))
          )}

          {/* <AlertCard
            sportName={"test"}
            amount={200}
            status={"Pending"}
            odds={10}
            team={"test"}
            endTime={new Date()}
            matchBetween={"test"}
            oppositeOdds={10}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;
