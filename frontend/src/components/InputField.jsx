const InputField = ({ label, type, placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-white text-xl">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (type == "number") setValue(parseInt(e.target.value));
          else setValue(e.target.value);
        }}
        placeholder={placeholder}
        className="px-3 py-2 bg-transparent rounded-md border border-slate-500 w-full text-white"
      />
    </div>
  );
};

export default InputField;
