const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-white text-xl">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
      />
    </div>
  );
};

export default InputField;
