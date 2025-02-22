import { CircularProgress, Modal, Tab, Tabs } from "@mui/material";
import InputField from "../../components/InputField";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import coinSVG from "../../assets/coin.svg";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";
import { formatDate } from "../../utils/formatDate";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const generatePass = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars[randomIndex];
    }

    setPassword(pass);
  };

  const addUser = async () => {
    if (isLoading) return;

    if (!name) {
      showSnackbar("Name is required", "warning");
      return;
    }

    if (!email) {
      showSnackbar("Email is required", "warning");
      return;
    }

    if (!password) {
      showSnackbar("Password is required", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminApi.post("/add-user", {
        name,
        email,
        password,
      });

      if (res.status == 200) {
        showSnackbar("User added successfully", "success");

        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      showSnackbar("Error while adding user", "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-full pt-8">
      <h2 className="text-white text-3xl mb-7">Add Users</h2>
      <div className="my-3 space-y-4">
        <InputField
          label={"Name"}
          type={"text"}
          value={name}
          setValue={setName}
          placeholder={"Enter the name"}
        />
        <InputField
          label={"Email"}
          type={"email"}
          value={email}
          setValue={setEmail}
          placeholder={"Enter the email"}
        />

        <div className="flex flex-col space-y-3">
          <InputField
            label={"Passoword"}
            type={"password"}
            value={password}
            setValue={setPassword}
            placeholder={"Enter a password"}
          />

          <button
            onClick={() => generatePass()}
            className="rounded-full text-xs bg-slate-100 px-4 py-2 w-fit cursor-pointer active:scale-95 transition-transform"
          >
            Generate a password
          </button>
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={addUser}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit active:scale-95 transition-transform"
          >
            Add user
          </button>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({
  id,
  name,
  email,
  balance,
  setIsTransactionsModalOpen,
  setTransactionUserId,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <div className="flex items-center space-x-4">
        <div className="text-white text-4xl">
          <PersonSharpIcon color="inherit" fontSize="inherit" />
        </div>

        <div>
          <p className="text-white font-semibold text-xl">{name}</p>
          <p className="text-white font-light">{email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-3 text-white">
          <img width={20} height={20} src={coinSVG} alt="coin svg icon" />
          <p>{balance}</p>
        </div>
        <div
          onClick={() => {
            setIsTransactionsModalOpen(true);
            setTransactionUserId(id);
          }}
          className="bg-slate-100 rounded-full px-3 py-2 cursor-pointer active:scale-95 transition-transform"
        >
          <p className="text-xs">View Transactions</p>
        </div>
      </div>
    </div>
  );
};

const AllUsers = () => {
  const { showSnackbar } = useSnackbar();

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);

  const [transactionUserId, setTransactionUserId] = useState("");
  const [transactionsCoinBuy, setTransactionsCoinBuy] = useState([]);
  const [transactionsBet, setTransactionsBet] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.get("/users");

      if (res.status == 200) {
        setUsers(res.data.users);
      }
    } catch (e) {
      showSnackbar("Error in fetching users", "error");
    }

    setIsLoading(false);
  };

  const fetchTransactions = async () => {
    if (!transactionUserId) return;

    try {
      const res = await adminApi.get(`/transactions?id=${transactionUserId}`);

      if (res.status == 200) {
        const transac = res.data.transactions;

        setTransactionsCoinBuy(transac.filter((t) => t.type == "coinbuy"));
        setTransactionsBet(transac.filter((t) => t.type == "bet"));
      }
    } catch (e) {
      showSnackbar("Error in fetching the transactions", "error");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [transactionUserId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full pt-8">
      <Modal open={isTransactionsModalOpen}>
        <div
          className="w-full h-full flex items-center justify-center"
          onClick={() => {
            setIsTransactionsModalOpen(false);
          }}
        >
          <div
            className="bg-slate-100 w-[80%] h-[80%] rounded-md px-8 py-8 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 className="text-2xl text-black font-semibold">Transactions</h1>

            <div className="w-full h-full mt-5 pb-20 space-y-7 overflow-y-scroll custom-scrollbar-light">
              <div>
                <h2 className="text-lg text-black font-medium my-3">Bets</h2>
                <table className="w-full">
                  <thead className="[&>tr>th]:py-2 [&>tr>th]:border [&>tr>th]:border-slate-400">
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Bid</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center">
                    {transactionsBet.length != 0 &&
                      transactionsBet.map((t) => (
                        <tr key={t._id}>
                          <td>{formatDate(t.createdAt)}</td>
                          <td>Cricket</td>
                          <td className="text-blue-600">{t.odds}x</td>
                          <td>
                            <div className="flex items-centerm w-full justify-center space-x-3">
                              <img
                                src={coinSVG}
                                alt="coins"
                                className="w-5 object-contain"
                              />
                              <p>{t.amount}</p>
                            </div>
                          </td>
                          <td>{t.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {transactionsBet.length == 0 && (
                  <div className="w-full text-center mt-4">
                    <p className="text-slate-500 text-sm">No bets done</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg text-black font-medium my-3">
                  Coin Purchase History
                </h2>
                <table className="w-full">
                  <thead className="[&>tr>th]:py-2 [&>tr>th]:border [&>tr>th]:border-slate-400">
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center">
                    {transactionsCoinBuy.length != 0 &&
                      transactionsCoinBuy.map((t) => (
                        <tr key={t._id}>
                          <td>{formatDate(t.createdAt)}</td>
                          <td>
                            <div className="flex items-centerm w-full justify-center space-x-3">
                              <img
                                src={coinSVG}
                                alt="coins"
                                className="w-5 object-contain"
                              />
                              <p>{t.amount}</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {transactionsCoinBuy.length == 0 && (
                  <div className="w-full mt-4 text-center">
                    <p>No coin purchase history</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
        {isLoading ? (
          <div className="w-full flex justify-center">
            <CircularProgress size={"25px"} />
          </div>
        ) : (
          users?.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              balance={user.coinBalance}
              setIsTransactionsModalOpen={setIsTransactionsModalOpen}
              setTransactionUserId={setTransactionUserId}
            />
          ))
        )}
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
