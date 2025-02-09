import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-1 items-center">
      {/* Left portion */}
      <div className="flex-[0.5] px-7">
        <h2 className="text-white text-7xl font-semibold mb-5">
          Bet on the Best, Win the Rest!
        </h2>
        <p className="text-white text-2xl">
          Place your bets, challenge your friends, and make every match
          thrilling. 🚀🔥
        </p>

        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="bg-[#FEE715] px-3 py-1 text-xl font-medium mt-8 rounded-md"
        >
          Get Started
        </button>
      </div>

      {/* Right portion */}
      <div className="flex-[0.5]"></div>
    </div>
  );
};

export default Homepage;
