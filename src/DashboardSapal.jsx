import KPICard from "./components/KPICard";
import PowerFactorChart from "./components/charts/PowerFactorChart";
import ConsumptionChart from "./components/charts/ConsumptionChart";
import SummaryTable from "./components/tables/SummaryTable";

import {
  powerFactorData,
  consumptionData,
  summaryData,
} from "./data/mockData";

import {
  Gauge,
  Zap,
  BatteryCharging,
  Activity,
} from "lucide-react";

export default function DashboardSapal() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">
        Tablero de Monitoreo Energético – SAPAL
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Factor de Potencia"
          value="0.91"
          change={+2.3}
          icon={Gauge}
          color="yellow"
        />
        <KPICard
          title="Consumo Mensual"
          value="4700 kWh"
          change={-1.1}
          icon={Zap}
          color="sky"
        />
        <KPICard
          title="Eficiencia Energética"
          value="94%"
          change={+3.0}
          icon={Activity}
          color="green"
        />
        <KPICard
          title="Carga del Sistema"
          value="74%"
          change={+0.5}
          icon={BatteryCharging}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PowerFactorChart data={powerFactorData} />
        <ConsumptionChart data={consumptionData} />
      </div>

      <SummaryTable data={summaryData} />
    </div>
  );
}
