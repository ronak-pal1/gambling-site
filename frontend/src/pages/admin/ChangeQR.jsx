import { useRef } from "react";
import demoQR from "../../assets/QR.svg";

const ChangeQR = () => {
  const inputRef = useRef(null);

  const simulateUpload = () => {
    const inputElement = inputRef.current;
    inputElement.click();
  };

  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Change QR</h2>

      <div className=" h-full w-full flex justify-center items-center">
        <div className="w-fit h-fit flex flex-col items-center">
          <div className="w-fit h-fit bg-white">
            <img
              src={demoQR}
              alt="QR code"
              className="w-[300px] object-contain"
            />
          </div>
          <input ref={inputRef} type="file" className="hidden" />
          <button
            onClick={simulateUpload}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit"
          >
            Change QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeQR;
