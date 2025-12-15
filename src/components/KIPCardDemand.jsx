import Card from "./Card";
const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  indigo: "bg-indigo-100 text-indigo-600",
  purple: "bg-purple-100 text-purple-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600",
  cyan: "bg-cyan-100 text-cyan-600",
  lime: "bg-lime-100 text-lime-600",
  emerald: "bg-emerald-100 text-emerald-600",
  violet: "bg-violet-100 text-violet-600",
  rose: "bg-rose-100 text-rose-600",
  amber: "bg-amber-100 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
  stone: "bg-stone-100 text-stone-600",
  neutral: "bg-neutral-100 text-neutral-600",
  zinc: "bg-zinc-100 text-zinc-600",
  sky: "bg-sky-100 text-sky-600",
  fuchsia: "bg-fuchsia-100 text-fuchsia-600",
};

export default function KIPCardDemand({ title, value, icon: Icon, color }) {
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
