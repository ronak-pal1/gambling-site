import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";

const ChangeQR = () => {
  const inputRef = useRef(null);
  const [qrFile, setQRFile] = useState(undefined);
  const [qrURL, setQRURL] = useState("");

  const simulateUpload = () => {
    const inputElement = inputRef.current;
    inputElement.click();
  };

  const { showSnackbar } = useSnackbar();

  const uploadQR = async () => {
    try {
      const payload = new FormData();
      payload.append("qr", qrFile);

      //   For deleting the previously uploaded file
      if (qrURL) payload.append("previousURL", qrURL);

      const res = await adminApi.post("/change-qr", payload);

      if (res.status == 200) {
        setQRURL(res.data.qrURL);
        showSnackbar("QR is uploaded successfully", "success");
      }
    } catch (e) {
      showSnackbar("Error in uploading the QR", "error");
    }
  };

  const fetchQR = async () => {
    try {
      const res = await adminApi.get("/get-qr");

      if (res.status == 200) setQRURL(res.data.qrURL);
    } catch (e) {}
  };

  useEffect(() => {
    fetchQR();
  }, []);

  useEffect(() => {
    if (!qrFile) return;

    uploadQR();
  }, [qrFile]);

  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Change QR</h2>

      <div className=" h-full w-full flex justify-center items-center">
        <div className="w-fit h-fit flex flex-col items-center">
          <div className="w-[300px] h-[300px] bg-white">
            <img
              src={qrURL}
              alt="QR code"
              className="w-[300px] h-[300px] object-contain"
            />
          </div>
          <input
            ref={inputRef}
            onChange={(e) => {
              setQRFile(e.target.files[0]);
            }}
            type="file"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
          />
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
