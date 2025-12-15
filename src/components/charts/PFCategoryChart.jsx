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

export default function PFCategoryChart({ data }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Estado del Factor de Potencia</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={180} />
            <Tooltip />

            <Bar dataKey="value" barSize={35}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        {data.map(item => (
          <div key={item.name} className="flex justify-between text-sm mb-1">
            <span>{item.name}</span>
            <span>{item.value} RPUs | {item.percent}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
