import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ConsumptionChart({ data }) {
  // Formato para números grandes (k, M)
  const formatNumber = (value) => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + " M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + " k";
    return value;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">
        Consumo Energético Mensual (kWh)
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* EJE X → MESES */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11 }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />

          {/* EJE Y → CONSUMO */}
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={formatNumber}
          />

          {/* TOOLTIP EN ESPAÑOL */}
          <Tooltip
            formatter={(value) => [
              value.toLocaleString("es-MX") + " kWh",
              "Consumo"
            ]}
            labelFormatter={(label) => `Mes: ${label}`}
          />

          <Bar
            dataKey="consumption"
            fill="#0ea5e9"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
