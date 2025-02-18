import { useState } from "react";
import InputField from "../../components/InputField";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "../../hooks/SnackBarContext";
import adminApi from "../../apis/adminApi";

const AddCoins = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const transferAmount = async () => {
    if (isLoading) return;

    if (!email) {
      showSnackbar("Email is required", "warning");
      return;
    }

    if (!amount) {
      showSnackbar("Amount is required", "warning");
    }

    setIsLoading(true);
    try {
      const res = await adminApi.post("/add-coins", {
        email,
        amount,
      });
      if (res.status == 200) {
        showSnackbar("Coins transferred successfully", "success");
      }
    } catch (e) {
      showSnackbar("Error in transfer", "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Add Coins</h2>

      <div className="mt-10 space-y-6">
        <InputField
          label={"Email"}
          type={"email"}
          value={email}
          setValue={setEmail}
          placeholder={"Enter the email"}
        />
        <InputField
          label={"Coin Amount"}
          type={"number"}
          value={amount}
          setValue={setAmount}
          placeholder={"Enter a coin amount"}
        />

        <div className="w-full flex justify-center">
          <button
            onClick={transferAmount}
            className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit min-w-28 flex items-center justify-center"
          >
            {isLoading ? <CircularProgress size={"25px"} /> : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoins;
