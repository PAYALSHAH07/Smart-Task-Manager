const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-slate-900">

      <h2 className="text-3xl text-center mb-10 font-bold">
        What Users Say
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <p>"Best todo app ever!"</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p>"Very clean and fast."</p>
        </div>

      </div>

    </section>
  );
};

export default Testimonials;