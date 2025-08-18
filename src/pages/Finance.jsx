import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import RestaurantService from "../api/RestaurantService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  RadialBarChart,
  RadialBar,
} from "recharts";

const toYMD = (d) => {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

const formatNumber = (n) => new Intl.NumberFormat("pt-BR").format(n ?? 0);

export default function Finance() {
  const today = useMemo(() => new Date(), []);
  const [startDate, setStartDate] = useState(
    toYMD(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29))
  );
  const [endDate, setEndDate] = useState(toYMD(today));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ count: 0, sum: 0, avg: 0, max: 0, min: 0 });

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await RestaurantService.getOrderStatistics(startDate, endDate);
      const data = res?.data?.data; 
      if (!data) throw new Error("Resposta inesperada do servidor");
      setStats({
        count: data.count ?? 0,
        sum: data.sum ?? 0,
        avg: data.avg ?? 0,
        max: data.max ?? 0,
        min: data.min ?? 0,
      });
    } catch (e) {
      console.error(e);
      setError("Não foi possível carregar os indicadores financeiros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const ticketData = useMemo(
    () => [
      { name: "Mínimo", value: stats.min },
      { name: "Médio", value: stats.avg },
      { name: "Máximo", value: stats.max },
    ],
    [stats]
  );

  const summaryData = useMemo(
    () => [
      { label: "Período", receita: stats.sum, pedidos: stats.count },
    ],
    [stats]
  );

  const radialData = useMemo(() => {
    const ratio = stats.max > 0 ? Math.max(0, Math.min(1, stats.avg / stats.max)) : 0;
    return [
      {
        name: "Ticket Médio",
        value: Math.round(ratio * 100),
        fill: "#22c55e",
      },
    ];
  }, [stats]);

  const noData = !loading && (stats.count === 0 || stats.sum === 0);

  return (
    <div className="flex h-screen bg-[#101014] text-white">
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold">Resumo Financeiro</h1>
            <p className="text-sm text-white/60 mt-1">
              Indicadores e comparativos do período selecionado.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchStats();
            }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 bg-[#1a1a22] rounded-xl px-3 py-2 ring-1 ring-white/10">
              <label className="text-xs text-white/60">De</label>
              <input
                type="date"
                className="bg-transparent outline-none text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
                required
              />
              <label className="text-xs text-white/60 ml-2">até</label>
              <input
                type="date"
                className="bg-transparent outline-none text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#F37359] hover:opacity-90 transition px-4 py-2 rounded-xl text-sm font-semibold"
              disabled={loading}
            >
              {loading ? "Carregando…" : "Aplicar"}
            </button>
          </form>
        </motion.div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Receita Bruta" value={BRL.format(stats.sum)} />
          <KpiCard title="Pedidos" value={formatNumber(stats.count)} />
          <KpiCard title="Ticket Médio" value={BRL.format(stats.avg)} />
          <KpiCard title="Maior Pedido" value={BRL.format(stats.max)} />
        </section>

        {error && (
          <div className="rounded-xl bg-rose-500/10 ring-1 ring-rose-400/30 p-4 text-rose-200">
            {error}
          </div>
        )}

        {noData ? (
          <EmptyState />
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Ticket — Mín, Médio e Máx" subtitle="Comparativo do período">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2b2b33" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis tickFormatter={(v) => BRL.format(v)} stroke="#9ca3af" />
                  <Tooltip formatter={(v) => BRL.format(v)} cursor={{ fill: "#ffffff08" }} />
                  <Bar dataKey="value" name="Valor" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Receita x Pedidos" subtitle="Totais do período">
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={summaryData}>
                  <CartesianGrid stroke="#2b2b33" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis yAxisId="left" tickFormatter={(v) => BRL.format(v)} stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value, name) =>
                      name === "receita" ? BRL.format(value) : formatNumber(value)
                    }
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="receita" name="Receita" />
                  <Bar yAxisId="right" dataKey="pedidos" name="Pedidos" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Aproveitamento do Ticket Médio" subtitle="Ticket médio em relação ao maior pedido">
              <ResponsiveContainer width="100%" height={260}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={16}
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar dataKey="value" cornerRadius={8} />
                  <Tooltip formatter={(v) => `${v}%`} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center mt-2 text-sm text-white/70">
                {stats.max > 0
                  ? `${BRL.format(stats.avg)} de ${BRL.format(stats.max)} (${Math.round(
                      (stats.avg / stats.max) * 100
                    )}%)`
                  : "Sem referência de máximo no período"}
              </div>
            </ChartCard>

          </section>
        )}
      </main>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-[#1a1a22] ring-1 ring-white/10 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl bg-[#1a1a22] ring-1 ring-white/10 p-4">
      <div className="mb-3">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-[#1a1a22] ring-1 ring-white/10 p-8 text-center">
      <div className="text-lg font-semibold mb-2">Sem dados no período</div>
      <div className="text-white/60 text-sm">
        Ajuste o intervalo de datas acima para visualizar os indicadores.
      </div>
    </div>
  );
}
