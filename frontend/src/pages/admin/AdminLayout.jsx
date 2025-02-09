import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const tabs = ["Add Events", "Modify Events", "Users", "Add Coins", "Change QR"];

const getTabRoute = (text) => {
  return text.toLowerCase().replace(" ", "-");
};

const AdminLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("add-events");

  useEffect(() => {
    const paths = location.pathname.split("/");

    setActiveTab(paths[paths.length - 1]);
  }, [location]);

  return (
    <div className="w-full h-screen flex flex-1 flex-col overflow-y-hidden">
      <div className="flex-[0.1] h-full">
        <Header />
      </div>

      <div className="flex-[0.9] h-full flex">
        <div className="flex-[0.2] h-full bg-neutral-950 space-y-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => navigate(`/admin/dashboard/${getTabRoute(tab)}`)}
              className={`w-full h-fit flex items-center justify-center py-4 cursor-pointer rounded-md  ${
                activeTab === getTabRoute(tab)
                  ? "bg-slate-200 font-normal"
                  : "bg-transparent font-extralight"
              }`}
            >
              <p
                className={` ${
                  activeTab === getTabRoute(tab) ? "text-black" : "text-white"
                } text-2xl`}
              >
                {tab}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-[0.8] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
