import { useEffect, useState } from "react";
import KPICardFactorCharge from "./components/KPICardFactorCharge";
import KPICardSimple from "./components/KPICardSimple";
import KPICardConsumption from "./components/KPICardConsumption";
import KPICardDemand from "./components/KIPCardDemand";
import PFCategoryChart from "./components/charts/PFCategoryChart";
import ConsumptionChart from "./components/charts/ConsumptionChart";
import SummaryTable from "./components/tables/SummaryTable";
import { Gauge, Zap, BatteryCharging, Activity } from "lucide-react";

export default function DashboardSapal() {
  const [avgPF, setAvgPF] = useState("Cargando...");
  const [avgFC, setAvgFC] = useState("Cargando...");
  const [avgCM, setAvgCM] = useState("Cargando...");
  const [avgDP, setAvgDP] = useState("Cargando...");
  const [chartData, setChartData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState([]);

  function categorizePF(pf) {
    if (pf >= 95) return "optimo";
    if (pf >= 90) return "aceptable";
    if (pf >= 80) return "problematico";
    return "critico";
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("https://sheetdb.io/api/v1/r72lcozggemro");
        const json = await res.json();

        // -------------------------------
        // FACTOR DE POTENCIA PROMEDIO
        // -------------------------------
        const valuesPF = json
          .map(i => parseFloat(String(i["FACTOR POTENCIA"]).replace(",", "")))
          .filter(n => !isNaN(n));

        const avgPowerFactor = valuesPF.reduce((s, n) => s + n, 0) / valuesPF.length;
        setAvgPF(avgPowerFactor.toFixed(2) + " %");

        // -------------------------------
        // FACTOR DE CARGA PROMEDIO
        // -------------------------------
        const valuesFC = json
          .map(i => parseFloat(String(i["FACTOR CARGA"]).replace(",", "")))
          .filter(n => !isNaN(n));

        const avgFactorCharge = valuesFC.reduce((s, n) => s + n, 0) / valuesFC.length;
        setAvgFC(avgFactorCharge.toFixed(2));

        // -------------------------------
        // DEMANDA PROMEDIO
        // -------------------------------
        const valuesDP = json
          .map(i => parseFloat(String(i["DEMANDA"]).replace(",", "")))
          .filter(n => !isNaN(n));

        const avgDemand =
          valuesDP.reduce((s, n) => s + n, 0) / valuesDP.length;

        setAvgDP(avgDemand.toLocaleString("es-MX") + " kW");

        // -------------------------------
        // CONSUMO MENSUAL PROMEDIO
        // -------------------------------
        const valuesCM = json
          .map(i => parseFloat(String(i["CONSUMO"]).replace(/,/g, "")))
          .filter(n => !isNaN(n));

        const avgConsumption =
          valuesCM.reduce((s, n) => s + n, 0) / valuesCM.length;

        setAvgCM(avgConsumption.toLocaleString("es-MX") + " kWh");

        // -------------------------------
        // CLASIFICACIÓN PF
        // -------------------------------
        const categories = { optimo: 0, aceptable: 0, problematico: 0, critico: 0 };

        json.forEach(i => {
          const pf = parseFloat(String(i["FACTOR POTENCIA"]).replace(",", ""));
          if (!isNaN(pf)) {
            categories[categorizePF(pf)]++;
          }
        });

        setChartData([
          { name: "Óptimo (>95%)", value: categories.optimo, color: "#16a34a" },
          { name: "Aceptable (90-94.9%)", value: categories.aceptable, color: "#facc15" },
          { name: "Problemático (80-89.9%)", value: categories.problematico, color: "#fb923c" },
          { name: "Crítico (<80%)", value: categories.critico, color: "#dc2626" }
        ]);

        // -------------------------------
        // TABLA RESUMEN
        // -------------------------------
        const totalConsumption = valuesCM.reduce((s, n) => s + n, 0);

        const valuesTotal = json
          .map(i => parseFloat(String(i["TOTAL"]).replace(/,/g, "")))
          .filter(n => !isNaN(n));

        const totalPaid = valuesTotal.reduce((s, n) => s + n, 0);

        const maxDemand = Math.max(...valuesDP);
        const minPFvalue = Math.min(...valuesPF);

        setSummaryData([
          { name: "Consumo total del periodo", value: totalConsumption.toLocaleString("es-MX") + " kWh" },
          { name: "Importe total pagado", value: "$ " + totalPaid.toLocaleString("es-MX") },
          { name: "Demanda máxima registrada", value: maxDemand.toLocaleString("es-MX") + " kW" },
          { name: "Factor de potencia mínimo registrado", value: minPFvalue.toFixed(2) + " %" }
        ]);

       // -------------------------------
// CONSOLIDAR CONSUMO POR MES (ORDENADO)
// -------------------------------
const monthsES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const monthlyMap = {};

// Inicializamos todos los meses en 0 (opcional pero recomendado)
monthsES.forEach((_, index) => {
  monthlyMap[index] = 0;
});

json.forEach(item => {
  const date = new Date(item["DESDE"]);
  if (isNaN(date)) return;

  const monthIndex = date.getMonth();
  const consumo = parseFloat(String(item["CONSUMO"]).replace(/,/g, ""));

  if (!isNaN(consumo)) {
    monthlyMap[monthIndex] += consumo;
  }
});

// Convertimos a arreglo ORDENADO
const monthlyArray = Object.keys(monthlyMap)
  .sort((a, b) => a - b)
  .map(index => ({
    month: monthsES[index],
    consumption: monthlyMap[index]
  }));

setMonthlyConsumption(monthlyArray);


      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">
        Tablero de Monitoreo Energético – SAPAL
      </h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICardSimple title="Factor de Potencia Promedio" value={avgPF} icon={Gauge} color="yellow" />
        <KPICardConsumption title="Consumo Mensual Promedio" value={avgCM} icon={Zap} color="red" />
        <KPICardDemand title="Demanda Promedio del Periodo" value={avgDP} icon={Activity} color="green" />
        <KPICardFactorCharge title="Factor de Carga Promedio" value={avgFC} icon={BatteryCharging} color="slate" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PFCategoryChart data={chartData} />
        <ConsumptionChart data={monthlyConsumption} />
      </div>

      <SummaryTable data={summaryData} />
    </div>
  );
}
