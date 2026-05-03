const Card = ({ children }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow">
      {children}
    </div>
  );
};

export default Card;