import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import QRImage from "../assets/QR.svg";
import coinIcon from "../assets/coin.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import userApi from "../apis/userApi";

const Header = ({ isAuthenticated, userInfo }) => {
  const [isCoinsPaySelected, setIsCoinsPaySelected] = useState(false);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();

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
    <header className="flex items-center justify-between px-7 py-5">
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

      <div>
        <h1
          onClick={() => navigate("/")}
          className="text-white text-3xl cursor-pointer"
        >
          Gambling
        </h1>
      </div>

      <div className="flex items-center space-x-7">
        {location.pathname != "/" && (
          <>
            <div
              className="text-white text-3xl relative"
              onClick={() => navigate("/alerts")}
            >
              <div className="absolute -top-1 -left-1 bg-red-500 px-2 py-1 text-sm rounded-full">
                <p>5</p>
              </div>
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
                    <p className=" font-medium ">500 </p>
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
      </div>
    </header>
  );
};

export default Header;
