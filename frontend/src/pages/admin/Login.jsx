const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 text-center space-y-7">
        <h1 className="text-white text-3xl">Admin Login</h1>

        <div className="flex flex-col items-center w-full space-y-5">
          <input
            type="email"
            className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
            placeholder="Password"
            required
          />
          <button className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
