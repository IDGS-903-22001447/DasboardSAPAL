import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../Card";

export default function ConsumptionChart({ data }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Consumo Energético Mensual (kWh)</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="consumption" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
