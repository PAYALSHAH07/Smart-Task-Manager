import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const Charts = ({ todos }) => {

  // 📊 LAST 7 DAYS DATA
  const getLast7DaysData = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dayStr = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const created = todos.filter(
        (t) =>
          new Date(t.createdAt).toDateString() === date.toDateString()
      ).length;

      const completed = todos.filter(
        (t) =>
          t.completed &&
          new Date(t.updatedAt).toDateString() === date.toDateString()
      ).length;

      days.push({
        name: dayStr,
        created,
        completed,
      });
    }

    return days;
  };

  // 🥧 PRIORITY DATA
  const getPriorityData = () => {
    return [
      {
        name: "Low",
        value: todos.filter((t) => t.priority === "low").length,
      },
      {
        name: "Medium",
        value: todos.filter((t) => t.priority === "medium").length,
      },
      {
        name: "High",
        value: todos.filter((t) => t.priority === "high").length,
      },
    ];
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">

      {/* 📊 BAR CHART */}
      <div className="bg-slate-800 p-5 rounded-2xl">
        <h3 className="mb-4 font-semibold">
          📊 Tasks (Last 7 Days)
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={getLast7DaysData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="created" fill="#3b82f6" />
            <Bar dataKey="completed" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 PIE CHART */}
      <div className="bg-slate-800 p-5 rounded-2xl">
        <h3 className="mb-4 font-semibold">
          🥧 Priority Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={getPriorityData()}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {getPriorityData().map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Charts;