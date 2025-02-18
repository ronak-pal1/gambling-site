import { useRef } from "react";
import InputField from "../../components/InputField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const PlayerCard = ({ name, position }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
      <div className="flex items-center space-x-3">
        <img src="" alt="" />
        <div className="text-white flex flex-col">
          <p className="text-lg">{name}</p>
          <p className="text-sm">{position}</p>
        </div>
      </div>

      <div>
        <div className="text-white text-2xl">
          <CloseRoundedIcon color="inherit" fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

const TeamAddSection = ({ teamName }) => {
  const inputRef = useRef(null);

  const simulateFileUpload = () => {
    inputRef.current.click();
  };

  return (
    <div className="my-9 border border-slate-700 rounded-lg px-4 py-7">
      <h2 className="text-white text-2xl">{teamName}</h2>
      <div className=" mt-10 space-y-7">
        <InputField
          label={"Team 1 name"}
          type={"text"}
          placeholder={"Enter team 1 name"}
        />
        {/* For adding the players */}
        <div className="pt-6 border-t border-slate-700">
          <p className="text-white text-2xl">Add players</p>

          <div className="mt-10 space-y-5">
            <input ref={inputRef} type="file" className="hidden" />

            <div
              onClick={simulateFileUpload}
              className="text-white w-fit border border-slate-400 rounded-full px-3 py-2 cursor-pointer"
            >
              Add Profile IMG
            </div>

            <InputField
              label={"Player name"}
              type={"text"}
              placeholder={"Enter a player name"}
            />

            <InputField
              label={"Player position"}
              type={"text"}
              placeholder={"Enter the player position"}
            />

            <button className="bg-[#e8d62ed4] px-7 py-1 text-lg font-medium rounded-md w-fit">
              Add player
            </button>
          </div>

          <div className="space-y-3 mt-5 px-3 py-5 border border-slate-700 rounded-md">
            <PlayerCard name={"Ronak"} position={"Batsman"} />
            <PlayerCard name={"Ronak"} position={"Batsman"} />
            <PlayerCard name={"Ronak"} position={"Batsman"} />
            <PlayerCard name={"Ronak"} position={"Batsman"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddEvents = () => {
  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Add Events</h2>

      <div className="w-full h-full pt-10 pb-28 pr-5 overflow-y-scroll custom-scrollbar">
        <div className="space-y-7">
          <InputField
            label={"Sport Name"}
            type={"text"}
            placeholder={"Enter the name of the sport"}
          />
          <InputField label={"Date of the match"} type={"date"} />
          <InputField label={"Starting time"} type={"time"} />
          <InputField label={"Ending time"} type={"time"} />
        </div>

        <TeamAddSection teamName={"Team 1 informations"} />
        <TeamAddSection teamName={"Team 2 informations"} />

        <div className="w-full flex justify-center">
          <button className="bg-[#FEE715] px-7 py-1 text-lg font-medium rounded-md w-fit">
            Add the event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;
