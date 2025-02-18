import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";

const PlayerCard = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-[50px] h-[50px] rounded-full bg-blue-400"></div>
      <div>
        <p className="text-black font-semibold text-xl">Ronak Paul</p>
        <p className="text-black font-light">Batsman</p>
      </div>
    </div>
  );
};

const TeamCard = ({ teamPosition, setIsBettingModalOpen }) => {
  const [isPlayersContainerOpen, setIsPlayerContainerOpen] = useState(false);

  return (
    <div
      className={`w-full h-full border-t border-slate-400 px-4 py-5 relative ${
        teamPosition == "left" ? "border-r" : "border-l"
      }`}
    >
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
         
        transition-transform duration-500`}
      >
        <div
          className={` w-[93%] h-[95%] bg-slate-100  px-3 py-3 ${
            teamPosition == "left" ? "rounded-r-md" : "rounded-l-md"
          }`}
        >
          <div className="w-full flex justify-end text-3xl">
            <CloseIcon
              fontSize="inherit"
              onClick={() => setIsPlayerContainerOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col space-y-7 px-3">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-5">
        <div className="w-[100px] h-[100px] rounded-full bg-yellow-100"></div>

        <h1 className="text-white text-3xl">NIET</h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center my-3">
        <button
          onClick={() => setIsPlayerContainerOpen(true)}
          className="bg-slate-200 px-5 py-1 text-lg rounded-md w-fit text-black "
        >
          Show all players
        </button>

        <div className="items-center mt-10 space-y-7">
          <h2 className="text-white text-4xl">Odds</h2>
          <p className="text-yellow-300 text-8xl">7x</p>
        </div>
      </div>

      <div className="w-full absolute bottom-7 left-0 flex justify-center z-10">
        <button
          onClick={() => setIsBettingModalOpen(true)}
          className="bg-[#fee715b4] px-5 py-1 text-lg font-medium rounded-md w-[90%] "
        >
          Bet Now
        </button>
      </div>
    </div>
  );
};

const playerCard = () => {
  return <div></div>;
};

const EventPage = () => {
  const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-1 flex-col pt-6 relative">
      {/* Modal for betting */}
      <Modal open={isBettingModalOpen}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white w-[50%] rounded-lg text-center py-3 px-4">
            <div className="w-full flex justify-end text-2xl">
              <CloseIcon
                onClick={() => setIsBettingModalOpen(false)}
                fontSize="inherit"
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-3xl">Bet on NIET</h1>

            <div className="my-6">
              <div className="flex items-center justify-center space-x-5">
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label>500/-</label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label>1000/-</label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label>1500/-</label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label>2000/-</label>
                </div>
              </div>
            </div>

            <button className="bg-[#fee715b4] px-5 py-1 text-lg font-medium rounded-md w-fit ">
              Start Bet
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex-1 w-full h-full flex items-center overflow-x-hidden">
        <div className="flex-[0.4] w-full h-full [&>div]:rounded-r-lg">
          <TeamCard
            teamPosition={"left"}
            setIsBettingModalOpen={setIsBettingModalOpen}
          />
        </div>

        <div className="flex-[0.2] text-center space-y-4">
          <h1 className=" text-5xl text-yellow-200">Cricket</h1>
          <p className="text-white text-7xl">VS</p>
        </div>

        <div className="flex-[0.4] w-full h-full [&>div]:rounded-l-lg">
          <TeamCard
            teamPosition={"right"}
            setIsBettingModalOpen={setIsBettingModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
