import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import QRImage from "../assets/qr.jpeg";
import coinIcon from "../assets/coin.svg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import userApi from "../apis/userApi";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SIDEBAR_BUTTONS = [
  {
    label: "Transactions",
    route: "/transactions",
  },
  {
    label: "Contact",
    route: "/contact",
  },
  {
    label: "Terms & Conditons",
    route: "/terms-conditions",
  },
];

const Header = ({ isAuthenticated, userInfo }) => {
  const [isCoinsPaySelected, setIsCoinsPaySelected] = useState(false);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = async () => {
    try {
      const res = await userApi.post("/logout");

      if (res.status == 200) {
        setIsLogoutModalOpen(false);
        navigate("/login");
      }
    } catch (e) {}
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-7 py-5">
      <Modal open={isLogoutModalOpen}>
        <div
          className="w-full h-full flex items-center justify-center"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          <div
            className="bg-white w-[80%] md:w-[50%] rounded-lg text-center py-7 px-4 space-y-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg md:text-2xl">Are you sure ?</h1>

            <div className="w-full flex justify-center">
              <button
                onClick={logout}
                className="bg-slate-800 text-white px-5 py-1 text-sm md:text-lg font-medium rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* collapsable Sidebar */}
      <div
        className={`w-[280px] md:w-[350px] h-screen absolute top-0 left-0 bg-neutral-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform px-3 py-3 duration-500 z-30`}
      >
        <div className="w-full flex justify-between md:justify-end">
          {innerWidth < 600 && (
            <div className="relative">
              <div
                onClick={() => {
                  setIsCoinsPaySelected(!isCoinsPaySelected);
                }}
                className="text-white flex items-center space-x-3 border border-white  rounded-md px-4 py-1 text-sm md:text-xl cursor-pointer active:scale-95"
              >
                <WalletOutlinedIcon fontSize="inherit" />
                <p>{userInfo ? userInfo.balance : "..."} </p>
                <img
                  src={coinIcon}
                  alt="coin icon"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </div>

              {isCoinsPaySelected && (
                <div className="absolute bg-white w-80 h-fit translate-x-0 mt-2 rounded-md z-50 flex flex-col items-center py-3">
                  <div className="flex items-center space-x-2">
                    <p>Current Balance: </p>
                    <p className=" font-medium ">{userInfo.balance} </p>
                    <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                  </div>
                  <img
                    src={QRImage}
                    alt="QR code"
                    className="w-52 object-contain"
                  />

                  <p className="text-sm">Pay using the QR to get your coins</p>
                </div>
              )}
            </div>
          )}

          <div
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl md:text-3xl text-slate-300 cursor-pointer"
          >
            <CloseIcon color="inherit" fontSize="inherit" />
          </div>
        </div>

        <div></div>

        <div className="mt-7 space-y-6">
          {SIDEBAR_BUTTONS.map((button, index) => (
            <div
              key={index}
              onClick={() => {
                setIsSidebarOpen(false);
                navigate(button.route);
              }}
              className="text-center w-full py-2 hover:bg-neutral-900 rounded-lg cursor-pointer"
            >
              <p className="text-white text-base md:text-2xl">{button.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3 text-white text-2xl md:text-3xl">
        {location.pathname != "/" && (
          <MenuIcon
            onClick={() => setIsSidebarOpen(true)}
            color="inherit"
            fontSize="inherit"
            className="cursor-pointer"
          />
        )}

        <h1
          onClick={() => navigate("/")}
          className="text-white text-xl md:text-3xl cursor-pointer"
        >
          Khelo Spardha
        </h1>
      </div>

      <div className="flex items-center space-x-7">
        {location.pathname != "/" && innerWidth >= 600 && (
          <>
            <div
              className="text-white text-3xl relative cursor-pointer"
              onClick={() => navigate("/alerts")}
            >
              <div className="absolute -top-0 left-0 bg-red-500 px-2 py-2 text-sm rounded-full"></div>
              <NotificationsOutlinedIcon fontSize="inherit" />
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  setIsCoinsPaySelected(!isCoinsPaySelected);
                }}
                className="text-white flex items-center space-x-3 border border-white  rounded-md px-4 py-1 text-xl cursor-pointer active:scale-95"
              >
                <WalletOutlinedIcon fontSize="inherit" />
                <p>{userInfo ? userInfo.balance : "..."} </p>
                <img src={coinIcon} alt="coin icon" className="w-5 h-5" />
              </div>

              {isCoinsPaySelected && (
                <div className="absolute bg-white w-80 h-fit -translate-x-1/2 mt-2 rounded-md z-50 flex flex-col items-center py-3">
                  <div className="flex items-center space-x-2">
                    <p>Current Balance: </p>
                    <p className=" font-medium ">{userInfo.balance} </p>
                    <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                  </div>
                  <img
                    src={QRImage}
                    alt="QR code"
                    className="w-52 object-contain"
                  />

                  <p className="text-sm">Pay using the QR to get your coins</p>
                </div>
              )}
            </div>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bg-[#FEE715] px-5 py-1 text-sm md:text-lg font-medium rounded-md"
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
      </div>
    </header>
  );
};

export default Header;
