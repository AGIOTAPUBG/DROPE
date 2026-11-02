import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  Search,
  Building2,
  Car,
  ShieldCheck,
  FileCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Database,
  ExternalLink,
} from 'lucide-react';
import { QUERY_CATEGORIES } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const {
    creditsBalance,
    queryHistory,
    setCurrentView,
    inspectRecord,
    engines,
    organizationName,
  } = useApp();

  const recentQueries = queryHistory.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Painel de Inteligência de Dados
            </h1>
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 text-blue-300">
              Nexus Fintech S/A
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Bem-vindo, <strong>Carlos Prado</strong>. Todos os 5 motores oficiais estão
            operacionais com SLA médio de 310ms.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('search')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Nova Consulta Inteligente</span>
          </button>
          <button
            onClick={() => setCurrentView('credits')}
            className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors"
          >
            Gerenciar Créditos
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Saldo */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Saldo de Créditos</span>
            <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {creditsBalance.toLocaleString('pt-BR')}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              / 2.800 cr
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${Math.min(100, (creditsBalance / 2800) * 100)}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Consultas no Mês */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Consultas Realizadas (Mês)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              2.148
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              +14.2% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Consumo médio de 71 consultas/dia
          </div>
        </div>

        {/* Stat 3: Tempo de Resposta */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Latência Média dos Motores</span>
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              342ms
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Ótimo
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            99.9% entregues em menos de 800ms
          </div>
        </div>

        {/* Stat 4: Conformidade LGPD */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Conformidade &amp; Bases Legais</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              100%
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Auditado
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Todas com hash SHA-256 e finalidade
          </div>
        </div>
      </div>

      {/* Shortcuts to Query Engines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
            Atalhos para Novas Consultas
          </h2>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Ver todas as categorias</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUERY_CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCurrentView('search')}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 text-left transition-all group shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                  {cat.id === 'cnpj' && <Building2 className="w-4 h-4" />}
                  {cat.id === 'validation' && <ShieldCheck className="w-4 h-4" />}
                  {cat.id === 'vehicle' && <Car className="w-4 h-4" />}
                  {cat.id === 'contracts' && <FileCheck className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {cat.creditCost} cr
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Recent Queries + Active Engine Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recent Queries */}
        <div className="lg:col-span-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                Últimas Consultas Realizadas
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Histórico recente de requisições da organização
              </p>
            </div>
            <button
              onClick={() => setCurrentView('history')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver histórico completo
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Identificador</th>
                  <th className="py-2.5 px-4">Parâmetro / Nome</th>
                  <th className="py-2.5 px-4">Categoria</th>
                  <th className="py-2.5 px-4">Data/Hora</th>
                  <th className="py-2.5 px-4 text-right">Créditos</th>
                  <th className="py-2.5 px-4 text-center">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {recentQueries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-blue-600 dark:text-blue-400">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200 max-w-[180px] truncate">
                      {item.parameterLabel}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      {item.categoryLabel}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {item.timestamp}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                      -{item.creditsCost}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => inspectRecord(item)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                      >
                        Ver Dossiê
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Active Data Engines Status */}
        <div className="lg:col-span-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                Motores &amp; Conectores
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Disponibilidade das fontes integradas
              </p>
            </div>
            <button
              onClick={() => setCurrentView('integrations')}
              className="text-slate-400 hover:text-slate-200"
              title="Ver detalhes de integrações"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {engines.map((eng) => (
              <div
                key={eng.id}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {eng.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-mono ${
                      eng.status === 'operational'
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-amber-500'
                    }`}
                  >
                    {eng.status === 'operational' ? 'ONLINE' : 'DEGRADADO'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Latência: {eng.avgLatencyMs}ms</span>
                  <span>Uptime: {eng.uptime90d}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
