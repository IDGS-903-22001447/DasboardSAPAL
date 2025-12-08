import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "./Card";

export default function KPICard(props) {
  const { title, value, change, icon: Icon, color } = props;

  const isPositive = change >= 0;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500">{title}</p>
          <h2 className="text-3xl font-semibold">{value}</h2>
        </div>

        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          <Icon size={28} />
        </div>
      </div>

      <div
        className={`mt-4 flex items-center ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="mr-1" size={18} />
        ) : (
          <TrendingDown className="mr-1" size={18} />
        )}
        <span>{change}% respecto al periodo anterior</span>
      </div>
    </Card>
  );
}
