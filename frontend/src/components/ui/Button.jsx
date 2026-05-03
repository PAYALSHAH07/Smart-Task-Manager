const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default Button;