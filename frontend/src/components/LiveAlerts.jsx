import { useEffect, useState } from "react";
import coinSVG from "../assets/coin.svg";
import userApi from "../apis/userApi";
import { CircularProgress, Modal } from "@mui/material";
import { useSnackbar } from "../hooks/SnackBarContext";
import CloseIcon from "@mui/icons-material/Close";

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
      });

      if (res.status == 200) {
        showSnackbar("The bet is accepted", "success");
        setIsAlertModalOpen(false);
      }
    } catch (e) {
      showSnackbar("Error in accepting the bet", "error");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal open={isAlertModalOpen}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white w-[50%] rounded-lg text-center py-3 px-4">
            <div className="w-full flex justify-end text-2xl">
              <CloseIcon
                onClick={() => setIsAlertModalOpen(false)}
                fontSize="inherit"
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-3xl font-medium">
              Accept bet on {team == team1 ? team2 : team1}
            </h1>

            <div className="my-6">
              <div className="flex items-center justify-center space-x-5">
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 250);
                      else setTotalAmount((amount) => amount - 250);
                    }}
                  />
                  <label>250/-</label>
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
                        setTotalAmount((amount) => amount + 1500);
                      else setTotalAmount((amount) => amount - 1500);
                    }}
                  />
                  <label>1500/-</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked)
                        setTotalAmount((amount) => amount + 2000);
                      else setTotalAmount((amount) => amount - 2000);
                    }}
                  />
                  <label>2000/-</label>
                </div>
              </div>

              <div className="my-7 items-center w-full">
                <p className="text-xl font-semibold">Total: {totalAmount}/-</p>
              </div>
            </div>

            <button
              onClick={acceptBet}
              className={`bg-[#fee715d5] px-5 py-1 text-lg font-medium rounded-md w-fit text-center  ${
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
          else if (status == "Pending") setIsAlertModalOpen(true);
        }}
        className="w-full px-4 py-3 rounded-md bg-orange-300 hover:scale-[1.01] transition-transform cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs md:text-lg font-medium">
            <p>Bet of</p>

            <div className="flex items-center space-x-3">
              <img src={coinSVG} className="w-5 object-contain" />
              <p>{amount}</p>
            </div>

            <p>
              on {team}{" "}
              <span className=" text-blue-500 ml-6 md:ml-9">Odds: {odds}x</span>
            </p>
          </div>

          <div className="bg-neutral-700 text-white px-3 py-1 rounded-full">
            <p className="text-[10px] md:text-xs">
              {timeLeft.minutes}m:{timeLeft.seconds}s
            </p>
          </div>
        </div>

        {/*  */}
        <div className="my-3 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs md:text-base">
            <p className="">Sport Name: {sportName}</p>
            <p>
              Match: {team1} vs {team2}
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
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;
