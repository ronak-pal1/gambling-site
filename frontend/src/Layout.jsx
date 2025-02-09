import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-1 flex-col overflow-y-hidden">
      <div className="flex-[0.1] h-full">
        <Header />
      </div>

      <div className="flex-[0.9] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
