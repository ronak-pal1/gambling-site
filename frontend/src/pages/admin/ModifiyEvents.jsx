import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";
import { CircularProgress, Modal } from "@mui/material";
import { convertTo12Hour } from "../../utils/convertTo12Hour";
import { formatDate, formateDateReverse } from "../../utils/formatDate";

const ModifyEventModalContent = ({ content }) => {
  const [sportName, setSportName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  const [team1Odd, setTeam1Odd] = useState(0);
  const [team2Odd, setTeam2Odd] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isDelReqLoading, setIsDelReqLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setSportName(content.sportName);
    setDate(formateDateReverse(content.date));
    setStartTime(content.startTime);
    setEndTime(content.endTime);
    setTeam1Name(content.team1.teamName);
    setTeam2Name(content.team2.teamName);
    setTeam1Score(content.team1.score);
    setTeam2Score(content.team2.score);
    setTeam1Odd(content.team1.odds);
    setTeam2Odd(content.team2.odds);
  }, [content]);

  const updateEvent = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      let changedInfo = {};

      if (sportName != content.sportName) changedInfo.sportName = sportName;

      if (date != formateDateReverse(content.date)) changedInfo.date = date;

      if (startTime != content.startTime) changedInfo.startTime = startTime;

      if (endTime != content.endTime) changedInfo.endTime = endTime;

      changedInfo.team1 = {
        teamName: team1Name,
        score: team1Score,
        odds: team1Odd,
      };

      changedInfo.team2 = {
        teamName: team2Name,
        score: team2Score,
        odds: team2Odd,
      };

      const res = await adminApi.post("/modify-event", {
        changedInfo,
        eventId: content._id,
      });

      if (res.status == 200)
        showSnackbar("Event is updated successfully", "success");
    } catch (e) {
      showSnackbar("Error in updating the event", "error");
    }

    setIsLoading(false);
  };

  const deleteEvent = async () => {
    if (isDelReqLoading) return;

    setIsDelReqLoading(true);
    try {
      const res = await adminApi.post("/delete-event", {
        eventId: content._id,
      });

      if (res.status == 200)
        showSnackbar("Successfully deleted the event", "success");
    } catch (e) {
      showSnackbar("Error in deleting the event", "error");
    }

    setIsDelReqLoading(false);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6 justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Modify</h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={deleteEvent}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-yellow-800 flex items-center justify-center"
          >
            {isDelReqLoading ? <CircularProgress size={"20px"} /> : "Delete"}
          </button>
          <button
            onClick={updateEvent}
            className="bg-yellow-300 text-black px-6 py-2 rounded-md hover:bg-yellow-500 flex items-center justify-center"
          >
            {isLoading ? <CircularProgress size={"20px"} /> : "Update"}{" "}
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {/* Sport and Timing Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sport Name
            </label>
            <input
              type="text"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Enter sport name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="e.g., 90 minutes"
            />
          </div>
        </div>

        {/* Time Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>
        </div>

        {/* Teams Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team 1 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team 1</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Score
                </label>
                <input
                  type="text"
                  value={team1Score}
                  onChange={(e) => setTeam1Score(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Odds
                </label>
                <input
                  type="number"
                  value={team1Odd}
                  onChange={(e) => setTeam1Odd(parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
            </div>
          </div>

          {/* Team 2 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team 2</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Score
                </label>
                <input
                  type="text"
                  value={team2Score}
                  onChange={(e) => setTeam2Score(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Odds
                </label>
                <input
                  type="number"
                  value={team2Odd}
                  onChange={(e) => setTeam2Odd(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  step="0.1"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModifyEvents = () => {
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState(undefined);

  const fetchAllEvents = async () => {
    setIsLoading(true);

    try {
      const res = await adminApi.get("/all-events");

      if (res.status == 200) {
        setEvents(res.data.events);
      }
    } catch (e) {
      showSnackbar("Error in fetching events", "errors");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="w-full h-full px-7 py-3">
      <Modal open={isEditModalOpen}>
        <div
          className="w-full h-full flex items-center justify-center"
          onClick={() => {
            setIsEditModalOpen(false);
          }}
        >
          <div
            className="bg-slate-100 w-[80%] h-[80%] rounded-md"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModifyEventModalContent content={currentModalContent} />
          </div>
        </div>
      </Modal>

      <h2 className="text-white text-3xl">Modify Events</h2>

      <div className="w-full h-full px-3 pb-56 mt-9 overflow-y-scroll custom-scrollbar-light">
        <table className="w-full    ">
          <thead className="[&>tr>th]:text-white [&>tr>th]:text-xl [&>tr>*]:border [&>tr>*]:border-slate-600 [&>tr>*]:py-5">
            <tr>
              <th>Sport Name</th>
              <th>Teams</th>
              <th>Timing</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:text-slate-300 [&>tr>td]:text-center [&>tr>*]:border [&>tr>*]:border-slate-600 [&>tr>*]:py-5">
            {!isLoading &&
              events.length != 0 &&
              events.map((event) => (
                <tr key={event._id}>
                  <td>{event.sportName}</td>
                  <td>
                    {event.team1.teamName} vs {event.team2.teamName}
                  </td>
                  <td>
                    {convertTo12Hour(event.startTime)} -{" "}
                    {convertTo12Hour(event.endTime)}
                  </td>
                  <td>{formatDate(event.date)}</td>
                  <td>
                    <div
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setCurrentModalContent(event);
                      }}
                      className="bg-yellow-100 rounded-full px-2 py-1 text-black text-sm mx-3 cursor-pointer active:scale-95 transition-transform"
                    >
                      Edit
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="w-full flex justify-center py-10">
            <CircularProgress size={"25px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyEvents;
