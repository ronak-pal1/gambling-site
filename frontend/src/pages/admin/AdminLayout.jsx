import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import adminApi from "../../apis/adminApi";
import { Modal } from "@mui/material";

const tabs = ["Add Events", "Modify Events", "Users", "Add Coins", "Change QR"];

const getTabRoute = (text) => {
  return text.toLowerCase().replace(" ", "-");
};

const AdminLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("add-events");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await adminApi.get("/check-auth");

      if (res.status != 200) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    } catch (e) {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const paths = location.pathname.split("/");

    setActiveTab(paths[paths.length - 1]);
  }, [location]);

  const logout = async () => {
    try {
      const res = await adminApi.post("/logout");

      if (res.status == 200) {
        setIsLogoutModalOpen(false);
        navigate("/admin/login");
      }
    } catch (e) {}
  };

  return (
    <>
      <div className="w-full h-screen flex flex-1 flex-col overflow-y-hidden">
        <Modal open={isLogoutModalOpen}>
          <div
            className="w-full h-full flex items-center justify-center"
            onClick={() => setIsLogoutModalOpen(false)}
          >
            <div
              className="bg-white w-[50%] rounded-lg text-center py-7 px-4 space-y-7"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-2xl">Are you sure ?</h1>

              <div className="w-full flex justify-center">
                <button
                  onClick={logout}
                  className="bg-slate-800 text-white px-5 py-1 text-lg font-medium rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <div className="flex-[0.1] h-full">
          <header className="flex items-center justify-between px-7 py-5">
            <div>
              <h1
                onClick={() => navigate("/")}
                className="text-white text-3xl cursor-pointer"
              >
                Khelo Sphardha
              </h1>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="bg-[#FEE715] px-5 py-1 text-lg font-medium rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#FEE715] px-5 py-1 text-lg font-medium rounded-md"
              >
                Login
              </button>
            )}
          </header>
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
    </>
  );
};

export default AdminLayout;
