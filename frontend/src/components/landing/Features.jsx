const Features = () => {
  return (
    <section className="py-20 px-6 bg-slate-900">

      <h2 className="text-3xl text-center mb-10 font-bold">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="mb-2 font-semibold">Fast</h3>
          <p className="text-gray-400">Quick task management</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="mb-2 font-semibold">Secure</h3>
          <p className="text-gray-400">JWT Authentication</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="mb-2 font-semibold">Simple</h3>
          <p className="text-gray-400">Clean UI</p>
        </div>

      </div>

    </section>
  );
};

export default Features;