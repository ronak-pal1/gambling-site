import { useEffect, useState } from "react";
import adminApi from "../../apis/adminApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await adminApi.get("/check-auth");

      if (res.status == 200) {
        navigate("/admin/");
      }
    } catch (e) {}
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    try {
      const res = await adminApi.post("/login", {
        email,
        password,
      });

      if (res.status == 200) {
        navigate("/admin/");
      }
    } catch (e) {}
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 text-center space-y-7">
        <h1 className="text-white text-3xl">Admin Login</h1>

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
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit active:scale-95 transition-transform"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
