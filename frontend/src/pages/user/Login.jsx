import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hooks/SnackBarContext";
import { CircularProgress } from "@mui/material";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

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
    if (isLoading) return;

    setIsLoading(true);
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

    setIsLoading(false);
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
            className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white outline-none"
            placeholder="Email"
            required
          />

          <div className=" px-3 py-2 w-full flex items-center border border-slate-500 rounded-md ">
            <input
              type={isPassVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent   w-full text-white outline-none"
              placeholder="Password"
              required
            />

            {password && (
              <div
                className="text-white"
                onClick={() => setIsPassVisible((current) => !current)}
              >
                {isPassVisible ? (
                  <VisibilityOffSharpIcon size={"13px"} color="inherit" />
                ) : (
                  <VisibilitySharpIcon size={"13px"} color="inherit" />
                )}
              </div>
            )}
          </div>

          <button
            onClick={login}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit flex items-center justify-center"
          >
            {isLoading ? <CircularProgress size={"15px"} /> : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
