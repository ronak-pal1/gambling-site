import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image-2.jpg";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-1 items-center flex-col  md:flex-row relative">
      <img
        src={heroImage}
        alt="Hero sports image"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10 object-left"
      />
      {/* Left portion */}
      <div className="flex-[1] h-full flex  py-7 px-7 backdrop-blur-sm items-start md:items-center">
        <div className="flex-1 md:flex-[0.5]">
          <h2 className="text-white text-3xl md:text-5xl font-semibold mb-5">
            Bet on the Best, Win the Rest!
          </h2>
          <p className="text-white text-base md:text-xl xl:text-2xl">
            Place your bets, challenge your friends, and make every match
            thrilling. 🚀🔥
          </p>

          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="bg-[#FEE715] px-3 py-1 text-base md:text-xl font-medium mt-8 rounded-md w-fit"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right portion */}
      <div className="flex-[0] w-full h-full "></div>
    </div>
  );
};

export default Homepage;
