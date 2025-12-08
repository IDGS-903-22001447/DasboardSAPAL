import Card from "../Card";

export default function SummaryTable({ data }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Resumen General del Pozo</h2>

      <table className="w-full table-auto text-left">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="py-2">Parámetro</th>
            <th className="py-2">Valor</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-slate-100">
              <td className="py-2 font-medium">{row.name}</td>
              <td className="py-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
