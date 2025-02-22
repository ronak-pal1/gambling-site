import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hooks/SnackBarContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const getUser = async () => {
    try {
      const res = await userApi.get("/get-user");

      if (res.status != 200) {
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    } catch (e) {
      navigate("/login");
    }
  };

  const login = async () => {
    try {
      const res = await userApi.post("/login", {
        email,
        password,
      });

      if (res.status == 200) {
        navigate("/dashboard");
      }
    } catch (e) {
      showSnackbar(e.response.data.message, "error");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-1/3 text-center space-y-7">
        <h1 className="text-white text-3xl">Login</h1>

        <div className="flex flex-col items-center w-full space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
            placeholder="Password"
            required
          />
          <button
            onClick={login}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
