import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import coinIcon from "../assets/coin.svg";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    label: "FAQs",
    route: "/faqs",
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

  const [qrURL, setqrURL] = useState("");

  const logout = async () => {
    try {
      const res = await userApi.post("/logout");

      if (res.status == 200) {
        setIsLogoutModalOpen(false);
        navigate("/login");
      }
    } catch (e) {}
  };

  const fetchQR = async () => {
    try {
      const res = await userApi.get("/get-qr");

      if (res.status == 200) setqrURL(res.data.qrURL);
    } catch (e) {}
  };

  useEffect(() => {
    fetchQR();
  }, []);

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
          <p className="text-white text-sm font-medium">
            Hii, {userInfo?.name}
          </p>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl md:text-3xl text-slate-300 cursor-pointer"
          >
            <CloseIcon color="inherit" fontSize="inherit" />
          </div>
        </div>

        {innerWidth < 600 && (
          <div className="relative mt-6 w-full">
            <div className="w-full flex justify-center">
              <div
                onClick={() => {
                  setIsCoinsPaySelected(!isCoinsPaySelected);
                }}
                className="text-white flex items-center space-x-3 border border-white  rounded-md px-4 py-1 text-sm md:text-xl cursor-pointer active:scale-95 w-fit"
              >
                <WalletOutlinedIcon fontSize="inherit" />
                <p className="font-bold">
                  {userInfo ? parseFloat(userInfo.balance).toFixed(2) : "..."}
                </p>
                <img
                  src={coinIcon}
                  alt="coin icon"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </div>
            </div>

            {isCoinsPaySelected && (
              <div className="absolute bg-white w-80 h-fit translate-x-0 mt-2 rounded-md z-50 flex flex-col items-center py-3">
                <div className="flex items-center space-x-2">
                  <p>Current Balance: </p>
                  <p className=" font-medium ">
                    {parseFloat(userInfo.balance).toFixed(2)}{" "}
                  </p>
                  <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <p>Exposure amount: </p>
                  <p className=" font-medium ">
                    {parseFloat(userInfo.totalBetAmount).toFixed(2)}
                  </p>
                  <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                </div>

                <div className="w-52 h-52">
                  <img
                    src={qrURL}
                    alt="QR code"
                    className="w-52 object-contain"
                  />
                </div>

                <p className="text-sm">Pay using the QR to get your coins</p>

                <div className="w-full my-3 flex items-center space-x-5 px-4">
                  <Link
                    to={
                      "https://docs.google.com/forms/d/e/1FAIpQLSeDm7FHsRxhZ72da5WdwxK7gqAFwZRqIuzJOXjUw-b9az-F4w/viewform?usp=sharing"
                    }
                    target="_blank"
                    className="w-full text-center bg-blue-500 text-white py-1 rounded-xl"
                  >
                    Deposit
                  </Link>
                  <Link
                    to={
                      "https://docs.google.com/forms/d/e/1FAIpQLScr13Bzc_vAcg8btE7GA4eqUlqXXem-T5Yeegwq5TYEIBkjPA/viewform?usp=sharing"
                    }
                    target="_blank"
                    className="w-full text-center bg-green-400 py-1 rounded-xl"
                  >
                    Withdrawal
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

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

        <div className="w-full flex justify-center mt-5">
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
          onClick={() => navigate("/dashboard")}
          className="text-white text-xl md:text-3xl cursor-pointer"
        >
          Khelo Spardha
        </h1>
      </div>

      <div className="flex items-center space-x-7">
        {location.pathname != "/" && innerWidth >= 600 && (
          <p className="text-white text-lg font-bold">Hii, {userInfo?.name}</p>
        )}

        <div
          className="text-white text-xl md:text-3xl relative cursor-pointer"
          onClick={() => navigate("/alerts")}
        >
          <div className="absolute -top-2 -left-2 bg-red-500 px-[7px] py-[3px] text-sm rounded-full">
            <p className="text-white text-xs">5</p>
          </div>
          <NotificationsOutlinedIcon fontSize="inherit" />
        </div>

        {location.pathname != "/" && innerWidth >= 600 && (
          <>
            <div className="relative">
              <div
                onClick={() => {
                  setIsCoinsPaySelected(!isCoinsPaySelected);
                }}
                className="text-white flex items-center space-x-3 border border-white  rounded-md px-4 py-1 text-xl cursor-pointer active:scale-95"
              >
                <WalletOutlinedIcon fontSize="inherit" />
                <p className="font-medium">
                  {userInfo ? parseFloat(userInfo.balance).toFixed(2) : "..."}{" "}
                </p>
                <img src={coinIcon} alt="coin icon" className="w-5 h-5" />
              </div>

              {isCoinsPaySelected && (
                <div className="absolute bg-white w-80 h-fit -translate-x-1/2 mt-2 rounded-md z-50 flex flex-col items-center py-3">
                  <div className="flex items-center space-x-2">
                    <p>Current Balance: </p>
                    <p className=" font-medium ">
                      {parseFloat(userInfo.balance).toFixed(2)}{" "}
                    </p>
                    <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <p>Exposure amount: </p>
                    <p className=" font-medium ">
                      {parseFloat(userInfo.totalBetAmount).toFixed(2)}{" "}
                    </p>
                    <img src={coinIcon} alt="coin icon" className="w-4 h-4" />
                  </div>

                  <div className="w-52 h-52">
                    <img
                      src={qrURL}
                      alt="QR code"
                      className="w-52 object-contain"
                    />
                  </div>

                  <p className="text-sm">Pay using the QR to get your coins</p>

                  <div className="w-full my-3 flex items-center space-x-5 px-4">
                    <Link
                      to={
                        "https://docs.google.com/forms/d/e/1FAIpQLSeDm7FHsRxhZ72da5WdwxK7gqAFwZRqIuzJOXjUw-b9az-F4w/viewform?usp=sharing"
                      }
                      target="_blank"
                      className="w-full text-center bg-blue-500 text-white py-1 rounded-xl"
                    >
                      Deposit
                    </Link>
                    <Link
                      to={
                        "https://docs.google.com/forms/d/e/1FAIpQLScr13Bzc_vAcg8btE7GA4eqUlqXXem-T5Yeegwq5TYEIBkjPA/viewform?usp=sharing"
                      }
                      target="_blank"
                      className="w-full text-center bg-green-400 py-1 rounded-xl"
                    >
                      Withdrawal
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
