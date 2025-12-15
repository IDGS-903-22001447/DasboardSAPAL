import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "../Card";

/**
 * Tooltip personalizado en español
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded shadow p-3 text-sm">
        <p className="font-semibold mb-1">{label}</p>
        <p>
          <span className="font-medium">Valor:</span>{" "}
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function PFCategoryChart({ data }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Estado del Factor de Potencia
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={180}
              tick={{ fontSize: 12 }}
            />

            {/* Tooltip en español */}
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="value" barSize={32}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Resumen inferior */}
      <div className="mt-4">
        {data.map(item => (
          <div
            key={item.name}
            className="flex justify-between text-sm mb-1"
          >
            <span>{item.name}</span>
            <span>{item.value} registros</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
