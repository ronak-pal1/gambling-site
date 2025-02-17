import { Tab, Tabs } from "@mui/material";
import InputField from "../../components/InputField";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import coinSVG from "../../assets/coin.svg";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const AddUsers = () => {
  return (
    <div className="w-full h-full pt-8">
      <h2 className="text-white text-3xl mb-7">Add Users</h2>
      <div className="my-3 space-y-4">
        <InputField
          label={"Email"}
          type={"email"}
          placeholder={"Enter the email"}
        />

        <div className="flex flex-col space-y-3">
          <InputField
            label={"Passoword"}
            type={"password"}
            placeholder={"Enter a password"}
          />

          <button className="rounded-full text-xs bg-slate-100 px-4 py-2 w-fit">
            Generate a password
          </button>
        </div>

        <div className="w-full flex justify-center">
          <button className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
};

const UserCard = () => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <div className="flex items-center space-x-4">
        <div className="text-white text-4xl">
          <PersonSharpIcon color="inherit" fontSize="inherit" />
        </div>

        <div>
          <p className="text-white font-semibold text-xl">Ronak Paul</p>
          <p className="text-white font-light">ronak@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-3 text-white">
          <img width={20} height={20} src={coinSVG} alt="coin svg icon" />
          <p>500</p>
        </div>
        <div className="bg-slate-100 rounded-full px-3 py-2 cursor-pointer">
          <p className="text-xs">View Transactions</p>
        </div>
      </div>
    </div>
  );
};

const AllUsers = () => {
  return (
    <div className="w-full h-full pt-8">
      <div className="flex items-center">
        <div className="flex items-center border border-slate-500 w-full px-3  rounded-full">
          <SearchIcon color="inherit" className="text-white" />
          <input
            type="text"
            className="px-3 py-2 bg-transparent w-full  text-white outline-none"
            placeholder="Search users using email"
          />
        </div>

        <button className="bg-[#FEE715] px-7 py-1 mx-2 font-medium rounded-full w-fit">
          Search
        </button>
      </div>

      <div className="flex flex-col space-y-7 my-10">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

const TabContents = ({ currentTab }) => {
  if (currentTab == 0) return <AddUsers />;
  else if (currentTab == 1) {
    return <AllUsers />;
  } else {
    return <>empty</>;
  }
};

const Users = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="w-full h-full px-7 py-3">
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="User tabs"
        sx={{ width: "100%" }}
      >
        <Tab
          label="Add Users"
          {...a11yProps(0)}
          sx={{
            color: "white",
            width: "100%",
            maxWidth: "50%",
            fontSize: "1.3rem",
          }}
        />
        <Tab
          label="All Users"
          {...a11yProps(1)}
          sx={{
            color: "white",
            width: "100%",
            maxWidth: "50%",
            fontSize: "1.3rem",
          }}
        />
      </Tabs>

      <TabContents currentTab={currentTab} />
    </div>
  );
};

export default Users;
