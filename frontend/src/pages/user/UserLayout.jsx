import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import userApi from "../../apis/userApi";
import { useEffect, useState } from "react";

const UserLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const location = useLocation();

  const getUser = async () => {
    try {
      const res = await userApi.get("/get-user");

      if (res.status == 200) {
        setIsAuthenticated(true);
        setUserInfo(res.data.user);
      } else {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-screen flex flex-1 flex-col overflow-y-hidden">
      <div className="flex-[0.05] md:flex-[0.1] h-full">
        <Header isAuthenticated={isAuthenticated} userInfo={userInfo} />
      </div>

      <div className="flex-[0.95] md:flex-[0.9] h-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
