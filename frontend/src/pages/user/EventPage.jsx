import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../hooks/SnackBarContext";
import userApi from "../../apis/userApi";
import { addMinutesToCurrentTime } from "../../utils/convertTo12Hour";

const PlayerCard = ({ name, role, img }) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={img}
        alt="profile"
        className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover rounded-full"
      />
      <div>
        <p className="text-black font-semibold text-lg md:text-xl">{name}</p>
        <p className="text-black text-xs  md:text-base font-light">{role}</p>
      </div>
    </div>
  );
};

const TeamCard = ({
  teamPosition,
  teamName,
  players,
  score,
  odds,
  teamLogo,
}) => {
  const [isPlayersContainerOpen, setIsPlayerContainerOpen] = useState(false);
  const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [timing, setTiming] = useState("2m");

  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const { eventId } = useParams();

  const initiateBet = async () => {
    if (isLoading) {
      return;
    }

    if (totalAmount == 0) {
      showSnackbar("Betting amount can't be 0", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const res = await userApi.post("/initiate-bet", {
        eventId,
        team: teamName,
        odds,
        amount: totalAmount,
        endTime: addMinutesToCurrentTime(timing),
      });

      if (res.status == 200) {
        showSnackbar("Bet is initiated successfully", "success");
      }
    } catch (e) {
      if (e.status == 400) showSnackbar(e.response.data.message, "warning");
      else showSnackbar("Error in initiating bet", "error");
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`w-full h-full border-t border-slate-400 px-4 py-5 relative ${
        teamPosition == "left"
          ? " border-b md:border-r"
          : "border-t md:border-l"
      }`}
    >
      {/* Modal for betting */}
      <Modal open={isBettingModalOpen}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white w-[95%] md:w-[50%] rounded-lg text-center py-3 px-4">
            <div className="w-full flex justify-end text-2xl">
              <CloseIcon
                onClick={() => {
                  setIsBettingModalOpen(false);
                  setTotalAmount(0);
                }}
                fontSize="inherit"
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-lg md:text-3xl font-medium">
              Bet on {teamName}
            </h1>

            <div className="my-6">
              <div className="flex items-center justify-center text-sm md:text-base space-x-5">
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

              <div className="my-7 items-center w-full space-y-3">
                <p className="text-xl font-semibold">Total: {totalAmount}/-</p>
                <p className="text-xl font-semibold text-blue-500">
                  Win amount: {(totalAmount * odds).toFixed(2)}/-
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
              onClick={initiateBet}
              className={`bg-[#fee715d5] px-5 py-1 text-sm  md:text-lg font-medium rounded-md w-fit text-center  ${
                totalAmount == 0 && "opacity-70"
              }`}
            >
              {isLoading ? <CircularProgress size={"20px"} /> : "Start Bet"}
            </button>
          </div>
        </div>
      </Modal>

      {/* all player section */}
      <div
        className={`absolute w-full h-full top-0 left-0 z-30  flex items-center  ${
          isPlayersContainerOpen
            ? teamPosition == "left"
              ? "-translate-0 justify-start"
              : "translate-x-0 justify-end"
            : teamPosition == "left"
            ? "-translate-x-full justify-start"
            : "translate-x-full justify-end"
        }
         
        transition-transform duration-500 `}
      >
        <div
          className={` w-[93%] h-[95%] bg-slate-100  px-3 py-3 ${
            teamPosition == "left" ? "rounded-r-md" : "rounded-l-md"
          } overflow-y-scroll`}
        >
          <div className="w-full flex justify-end text-3xl">
            <CloseIcon
              fontSize="inherit"
              onClick={() => setIsPlayerContainerOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col space-y-7 px-3 ">
            {players?.map((player) => (
              <>
                <PlayerCard
                  key={player._id}
                  name={player.name}
                  role={player.role}
                  img={player.img}
                />
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-5">
        <div
          className={`md:w-[100px] md:h-[100px] w-[50px] h-[50px] rounded-full bg-transparent border border-slate-400`}
        >
          {teamLogo && (
            <img
              className="w-full h-full object-cover rounded-full"
              src={teamLogo}
            />
          )}
        </div>

        <h1 className="text-white text-xl  md:text-3xl">{teamName}</h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-3 md:mt-8">
        <button
          onClick={() => setIsPlayerContainerOpen(true)}
          className="bg-slate-200 px-5 py-1 text-xs md:text-lg rounded-md w-fit text-black "
        >
          Show all players
        </button>
        <div className="flex items-center mt-3 md:mt-10 space-x-4">
          <h2 className="text-white text-lg md:text-4xl">Score:</h2>
          <p className="text-yellow-300 text-base md:text-5xl">{score}</p>
        </div>

        <div className="flex items-center my-3 md:mt-10 space-x-4">
          <h2 className="text-white text-lg md:text-4xl">Odds:</h2>
          <p className="text-yellow-300 text-base md:text-5xl">{odds}</p>
        </div>
      </div>

      <div className="w-full md:absolute md:bottom-7 md:left-0 flex justify-center z-10">
        <button
          onClick={() => setIsBettingModalOpen(true)}
          className={`${
            teamPosition == "left" ? "bg-red-500" : "bg-green-400"
          } px-5 py-1 text-sm md:text-lg font-medium rounded-md w-[90%] `}
        >
          Bet Now
        </button>
      </div>
    </div>
  );
};

const EventPage = () => {
  const [eventInfo, setEventInfo] = useState(undefined);
  const { showSnackbar } = useSnackbar();
  const { eventId } = useParams();

  const fetchEventInfo = async () => {
    try {
      const res = await userApi.get(`/event/${eventId}`);

      if (res.status == 200) {
        setEventInfo(res.data.event);
      }
    } catch (e) {
      showSnackbar("Error in fetching event details", "error");
    }
  };

  useEffect(() => {
    fetchEventInfo();
  }, []);

  return (
    <div className="w-full h-full flex flex-1 flex-col pt-6 relative">
      <div className="flex-1 w-full h-full flex items-center flex-col md:flex-row overflow-x-hidden overflow-y-scroll md:overflow-y-hidden pb-32 md:pb-0 space-y-0 md:space-y-3">
        <div className="flex-[0.4] w-full h-full [&>div]:rounded-r-lg">
          <TeamCard
            teamPosition={"left"}
            teamName={eventInfo?.team1.teamName}
            players={eventInfo?.team1.players}
            odds={eventInfo?.team1.odds}
            score={eventInfo?.team1.score}
            teamLogo={eventInfo?.team1.logo}
          />
        </div>

        <div className="flex-[0.2] text-center space-y-4 bg-black w-full h-full py-3">
          <h1 className=" text-xl md:text-3xl text-yellow-200 font-medium">
            {eventInfo?.sportName}
          </h1>
          <p className="text-white text-lg md:text-7xl">VS</p>
        </div>

        <div className="flex-[0.4] w-full h-full [&>div]:rounded-l-lg">
          <TeamCard
            teamPosition={"right"}
            teamName={eventInfo?.team2.teamName}
            players={eventInfo?.team2.players}
            odds={eventInfo?.team2.odds}
            score={eventInfo?.team2.score}
            teamLogo={eventInfo?.team2.logo}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
