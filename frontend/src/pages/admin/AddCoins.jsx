import InputField from "../../components/InputField";

const AddCoins = () => {
  return (
    <div className="w-full h-full px-7 py-3">
      <h2 className="text-white text-3xl">Add Coins</h2>

      <div className="mt-10 space-y-6">
        <InputField
          label={"Email"}
          type={"email"}
          placeholder={"Enter the email"}
        />
        <InputField
          label={"Coin Amount"}
          type={"number"}
          placeholder={"Enter a coin amount"}
        />

        <div className="w-full flex justify-center">
          <button className="bg-[#FEE715] px-7 py-1 text-lg font-medium mt-8 rounded-md w-fit">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoins;
