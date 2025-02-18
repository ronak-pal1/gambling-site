import { useEffect, useRef, useState } from "react";
import InputField from "../../components/InputField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";

const PlayerCard = ({ name, position, removePlayer }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
      <div className="flex items-center space-x-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA5wU_GaflQCQv8QLqBIfCr9-Ki2bYYpIPdg&s"
          alt=""
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="text-white flex flex-col">
          <p className="text-lg">{name}</p>
          <p className="text-sm">{position}</p>
        </div>
      </div>

      <div>
        <div
          onClick={() => removePlayer(name)}
          className="text-white text-2xl cursor-pointer"
        >
          <CloseRoundedIcon color="inherit" fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

const TeamAddSection = ({
  label,
  teamName,
  setTeamName,
  players,
  setPlayers,
}) => {
  const inputRef = useRef(null);

  const [imgFile, setImgFile] = useState(undefined);
  const [imgURL, setImgURL] = useState("");

  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState("");

  const { showSnackbar } = useSnackbar();

  const simulateFileUpload = () => {
    inputRef.current.click();
  };

  const addPlayer = () => {
    const prevPlayers = [...players];

    prevPlayers.push({
      name: playerName,
      role: position,
      img: imgURL,
    });

    setPlayers(prevPlayers);
    setPlayerName("");
    setPosition("");
    setImgURL("");
  };

  const removePlayer = (name) => {
    const prevPlayers = players.filter((player) => player.name !== name);

    setPlayers(prevPlayers);
  };

  const uploadPlayerImg = async () => {
    if (!imgFile) return;

    const formData = new FormData();
    formData.append("playerImg", imgFile);

    try {
      const res = await adminApi.post("/upload-profile", formData);

      if (res.status == 200) {
        setImgURL(res.data.imgURL);

        showSnackbar("Profile uploaded successfully", "success");
      }
    } catch (e) {
      showSnackbar("Error in uploading profile image", "error");
    }
  };

  useEffect(() => {
    uploadPlayerImg();
  }, [imgFile]);

  return (
    <div className="my-9 border border-slate-700 rounded-lg px-4 py-7">
      <h2 className="text-white text-2xl">{label}</h2>
      <div className=" mt-10 space-y-7">
        <InputField
          label={"Team 1 name"}
          value={teamName}
          setValue={setTeamName}
          type={"text"}
          placeholder={"Enter team 1 name"}
        />
        {/* For adding the players */}
        <div className="pt-6 border-t border-slate-700">
          <p className="text-white text-2xl">Add players</p>

          <div className="mt-10 space-y-5">
            <input
              onChange={(e) => {
                setImgFile(e.target.files[0]);
              }}
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/png"
            />

            <div className="flex items-center space-x-4">
              <div
                onClick={simulateFileUpload}
                className="text-white w-fit border border-slate-400 rounded-full px-3 py-2 cursor-pointer"
              >
                {imgFile ? "Change Profile image" : "Add Profile image"}
              </div>
              {imgFile && <p className=" text-slate-300">{imgFile.name}</p>}
            </div>

            <InputField
              label={"Player name"}
              type={"text"}
              value={playerName}
              setValue={setPlayerName}
              placeholder={"Enter a player name"}
            />

            <InputField
              label={"Player position"}
              type={"text"}
              value={position}
              setValue={setPosition}
              placeholder={"Enter the player position"}
            />

            <button
              onClick={addPlayer}
              className="bg-[#e8d62ed4] px-7 py-1 text-lg font-medium rounded-md w-fit active:scale-95 transition-transform"
            >
              Add player
            </button>
          </div>

          <div className="space-y-3 mt-5 px-3 py-5 border border-slate-700 rounded-md">
            {players.length != 0 ? (
              players?.map((player, index) => (
                <PlayerCard
                  key={index}
                  name={player.name}
                  position={player.position}
                  removePlayer={removePlayer}
                />
              ))
            ) : (
              <div className="w-full text-center">
                <p className="text-slate-400">No players added</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddEvents = () => {
  const [sportName, setSportName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [prizePool, setPrizePool] = useState(0);

  const [team1Name, setTeam1Name] = useState("");
  const [team1Players, setTeam1Players] = useState([]);

  const [team2Name, setTeam2Name] = useState("");
  const [team2Players, setTeam2Players] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const addEvent = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await adminApi.post("/add-event", {
        sportName,
        date,
        startTime,
        endTime,
        prizePool,
        team1: {
          teamName: team1Name,
          players: team1Players,
        },
        team2: {
          teamName: team2Name,
          players: team2Players,
        },
      });

      if (res.status == 200) {
        showSnackbar("Event is added successfully", "success");

        setSportName("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setPrizePool(0);
        setTeam1Name("");
        setTeam1Players([]);
        setTeam2Name("");
        setTeam2Players([]);
      }
    } catch (e) {
      showSnackbar("Error while adding an event", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Add Events</h2>

      <div className="w-full h-full pt-10 pb-28 px-5 overflow-y-scroll custom-scrollbar-light">
        <div className="space-y-7">
          <InputField
            label={"Sport Name"}
            type={"text"}
            value={sportName}
            setValue={setSportName}
            placeholder={"Enter the name of the sport"}
          />
          <InputField
            label={"Date of the match"}
            type={"date"}
            value={date}
            setValue={setDate}
          />
          <InputField
            label={"Starting time"}
            type={"time"}
            value={startTime}
            setValue={setStartTime}
          />
          <InputField
            label={"Ending time"}
            type={"time"}
            value={endTime}
            setValue={setEndTime}
          />
          <InputField
            label={"Prize Pool amount"}
            type={"number"}
            value={prizePool}
            setValue={setPrizePool}
          />
        </div>

        <TeamAddSection
          label={"Team 1 informations"}
          teamName={team1Name}
          setTeamName={setTeam1Name}
          players={team1Players}
          setPlayers={setTeam1Players}
        />

        <TeamAddSection
          label={"Team 2 informations"}
          teamName={team2Name}
          setTeamName={setTeam2Name}
          players={team2Players}
          setPlayers={setTeam2Players}
        />

        <div className="w-full flex justify-center">
          <button
            onClick={addEvent}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium rounded-md w-fit active:scale-95 transition-transform"
          >
            Add the event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;
