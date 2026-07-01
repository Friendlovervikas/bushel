import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

function AdminCharts({
  revenueData,
  orderData,
}) {
  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#f97316",
    "#9333ea",
  ];
    return (
    <div className="grid lg:grid-cols-2 gap-8 mt-8">

      {/* Revenue Chart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Revenue
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={revenueData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="revenue"
              fill="#16a34a"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Orders Chart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Orders Status
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={orderData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >

              {orderData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AdminCharts;