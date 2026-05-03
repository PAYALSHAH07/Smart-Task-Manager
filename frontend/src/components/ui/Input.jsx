const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full p-2 rounded bg-slate-700 text-white outline-none"
    />
  );
};

export default Input;