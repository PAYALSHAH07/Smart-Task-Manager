import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-20 bg-slate-950">

      <h2 className="text-3xl font-bold mb-4">
        Ready to boost productivity?
      </h2>

      <button
        onClick={() => navigate("/register")}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        Start Now
      </button>

    </section>
  );
};

export default CTA;