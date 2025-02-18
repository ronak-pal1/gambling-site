import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";
import { CircularProgress, Modal } from "@mui/material";
import { convertTo12Hour } from "../../utils/convertTo12Hour";
import { formatDate } from "../../utils/formatDate";

const ModifyEvents = () => {
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
          ></div>
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
                      onClick={() => setIsEditModalOpen(true)}
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
