import Card from "./Card";
const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
};

export default function KPICardSimple({ title, value, icon: Icon, color }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500">{title}</p>
          <h2 className="text-3xl font-semibold">{value}</h2>
        </div>
<div className={`p-3 rounded-full ${colorMap[color]}`}>
  <Icon size={28} />
</div>

      </div>
    </Card>
  );
}
