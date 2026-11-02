import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Building,
  Cpu,
  Coins,
  FileCheck2,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Search,
  Sliders,
  RotateCw,
  Plus,
} from 'lucide-react';
import { DATA_ENGINES } from '../data/mockData';

export const AdminPanelView: React.FC = () => {
  const { auditLogs, engines, showToast, setIsAdminMode, setCurrentView } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'clients' | 'engines' | 'pricing' | 'compliance' | 'monitoring'
  >('monitoring');

  // Organizations management state
  const [organizations, setOrganizations] = useState([
    {
      id: 'org_nexus',
      name: 'Nexus Finanças & Crédito S/A',
      cnpj: '44.891.022/0001-94',
      status: 'ATIVA',
      plan: 'Plano Profissional',
      usersCount: 5,
      creditsBalance: 1840,
      monthlyConsumption: 2148,
    },
    {
      id: 'org_alfa',
      name: 'Alfa Logística & Frotas Ltda',
      cnpj: '19.492.110/0001-33',
      status: 'ATIVA',
      plan: 'Plano Corporativo',
      usersCount: 18,
      creditsBalance: 8420,
      monthlyConsumption: 6290,
    },
    {
      id: 'org_beta',
      name: 'Beta Soluções Jurídicas e Compliance',
      cnpj: '28.109.840/0001-09',
      status: 'PENDENTE_APROVACAO',
      plan: 'Plano Essencial',
      usersCount: 2,
      creditsBalance: 0,
      monthlyConsumption: 0,
    },
  ]);

  const [pricingPerCategory, setPricingPerCategory] = useState({
    cnpj: 5,
    validation: 3,
    vehicle: 4,
    contracts: 8,
    cnd_sanctions: 6,
  });

  const handleToggleOrgStatus = (id: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === id) {
          const nextStatus = org.status === 'ATIVA' ? 'SUSPENSA' : 'ATIVA';
          showToast(`Status da organização ${org.name} alterado para ${nextStatus}`, 'info');
          return { ...org, status: nextStatus };
        }
        return org;
      })
    );
  };

  const handleApproveOrg = (id: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === id) {
          showToast(`Organização ${org.name} homologada e credenciada com sucesso!`, 'success');
          return { ...org, status: 'ATIVA', creditsBalance: 600 };
        }
        return org;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Admin Master Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/60 text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight">
              DROPE Master Admin Console
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ROOT / SUPERVISOR
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Governança central de organizações credenciadas, conectores de dados, auditoria de compliance e SLA.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdminMode(false);
            setCurrentView('dashboard');
          }}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all self-start md:self-auto"
        >
          Retornar à Visão do Cliente
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('monitoring')}
          className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeAdminTab === 'monitoring'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-blue-500" />
          <span>Monitoramento &amp; SLA</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('clients')}
          className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeAdminTab === 'clients'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-blue-500" />
          <span>Gestão de Organizações ({organizations.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('engines')}
          className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeAdminTab === 'engines'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-blue-500" />
          <span>Motores &amp; Conectores ({engines.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('pricing')}
          className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeAdminTab === 'pricing'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Coins className="w-3.5 h-3.5 text-blue-500" />
          <span>Gestão Comercial &amp; Preços</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('compliance')}
          className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeAdminTab === 'compliance'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Auditoria &amp; Conformidade LGPD</span>
        </button>
      </div>

      {/* TAB 1: MONITORING */}
      {activeAdminTab === 'monitoring' && (
        <div className="space-y-6">
          {/* Top telemetry KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-slate-400">Total Consultas Processadas (24h)</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                142.890
              </div>
              <span className="text-emerald-500 font-semibold">+8.4% vs dia anterior</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-slate-400">Taxa de Sucesso Global</span>
              <div className="text-2xl font-extrabold text-emerald-500 font-mono tabular-nums">
                99.84%
              </div>
              <span className="text-slate-500">Dentro da meta contratual de 99.5%</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-slate-400">Latência P95</span>
              <div className="text-2xl font-extrabold text-blue-500 font-mono tabular-nums">
                410ms
              </div>
              <span className="text-slate-500">Tempo de normalização e resposta</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-slate-400">Incidentes Ativos</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                0
              </div>
              <span className="text-emerald-500 font-semibold">Todos os motores operacionais</span>
            </div>
          </div>

          {/* Engine Health Grid */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                  Telemetria em Tempo Real por Conector Autorizado
                </h3>
                <p className="text-[11px] text-slate-500">
                  Status de disponibilidade e custo de fornecedor
                </p>
              </div>
              <button
                onClick={() => showToast('Atualizando métricas dos conectores...', 'info')}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                title="Atualizar"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Nome do Motor</th>
                    <th className="py-2.5 px-4">Provedor Oficial</th>
                    <th className="py-2.5 px-4">Categoria Atendida</th>
                    <th className="py-2.5 px-4">Latência Média</th>
                    <th className="py-2.5 px-4">Uptime (90d)</th>
                    <th className="py-2.5 px-4">Custo Fornecedor</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {engines.map((eng) => (
                    <tr key={eng.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {eng.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {eng.provider}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {eng.category}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {eng.avgLatencyMs} ms
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {eng.uptime90d}%
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {eng.costPerQueryUsdOrBrl}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            eng.status === 'operational'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {eng.status === 'operational' ? 'ONLINE' : 'DEGRADADO'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORGANIZATIONS */}
      {activeAdminTab === 'clients' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-0">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                Organizações Cadastradas na Plataforma DROPE
              </h3>
              <p className="text-[11px] text-slate-500">
                Aprovação, suspensão e limites contratuais por empresa
              </p>
            </div>
            <button
              onClick={() => showToast('Formulário de cadastro manual aberto', 'info')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Organização</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Razão Social / Nome</th>
                  <th className="py-3 px-4">CNPJ</th>
                  <th className="py-3 px-4">Plano Contratado</th>
                  <th className="py-3 px-4 text-center">Usuários</th>
                  <th className="py-3 px-4 text-right">Saldo de Créditos</th>
                  <th className="py-3 px-4 text-center">Situação</th>
                  <th className="py-3 px-4 text-center">Ações Administrativas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {org.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {org.cnpj}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {org.plan}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {org.usersCount}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {org.creditsBalance.toLocaleString('pt-BR')} cr
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          org.status === 'ATIVA'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : org.status === 'PENDENTE_APROVACAO'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {org.status === 'PENDENTE_APROVACAO' ? (
                        <button
                          onClick={() => handleApproveOrg(org.id)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px]"
                        >
                          Aprovar Cadastro
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleOrgStatus(org.id)}
                          className={`px-2.5 py-1 rounded font-medium text-[11px] ${
                            org.status === 'ATIVA'
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
                          }`}
                        >
                          {org.status === 'ATIVA' ? 'Suspender' : 'Reativar'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ENGINES CONFIG */}
      {activeAdminTab === 'engines' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                Cadastro &amp; Failover de Conectores de Dados
              </h3>
              <p className="text-xs text-slate-500">
                Configuração de redundância automática entre múltiplos fornecedores
              </p>
            </div>
            <button
              onClick={() => showToast('Modal de novo conector em desenvolvimento', 'info')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Conectar Novo Bureau
            </button>
          </div>

          <div className="space-y-3">
            {engines.map((eng) => (
              <div
                key={eng.id}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{eng.name}</h4>
                  <p className="text-slate-500">
                    Provedor: {eng.provider} · Categoria: {eng.category}
                  </p>
                  {eng.lastIncident && (
                    <p className="text-[11px] text-amber-500 mt-1">
                      Aviso: {eng.lastIncident}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right font-mono text-[11px] text-slate-500">
                    <div>Custo/Req: {eng.costPerQueryUsdOrBrl}</div>
                    <div>Latência: {eng.avgLatencyMs}ms</div>
                  </div>
                  <button
                    onClick={() =>
                      showToast(`Testando conectividade de ping com ${eng.name}... OK`, 'success')
                    }
                    className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200"
                  >
                    Testar Ping
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRICING & CATEGORY CONFIG */}
      {activeAdminTab === 'pricing' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Gestão de Custo em Créditos por Categoria
            </h3>
            <p className="text-xs text-slate-500">
              Defina o multiplicador de consumo que cada pesquisa debita da conta do cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Empresas e CNPJ
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pricingPerCategory.cnpj}
                  onChange={(e) =>
                    setPricingPerCategory({
                      ...pricingPerCategory,
                      cnpj: Number(e.target.value),
                    })
                  }
                  className="w-20 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
                <span className="text-slate-500">créditos por busca</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Validação Cadastral PF/PJ
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pricingPerCategory.validation}
                  onChange={(e) =>
                    setPricingPerCategory({
                      ...pricingPerCategory,
                      validation: Number(e.target.value),
                    })
                  }
                  className="w-20 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
                <span className="text-slate-500">créditos por busca</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Veículos e Frotas
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pricingPerCategory.vehicle}
                  onChange={(e) =>
                    setPricingPerCategory({
                      ...pricingPerCategory,
                      vehicle: Number(e.target.value),
                    })
                  }
                  className="w-20 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
                <span className="text-slate-500">créditos por busca</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Contratos e Registros
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pricingPerCategory.contracts}
                  onChange={(e) =>
                    setPricingPerCategory({
                      ...pricingPerCategory,
                      contracts: Number(e.target.value),
                    })
                  }
                  className="w-20 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
                <span className="text-slate-500">créditos por busca</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                CNDs e Sanções
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pricingPerCategory.cnd_sanctions}
                  onChange={(e) =>
                    setPricingPerCategory({
                      ...pricingPerCategory,
                      cnd_sanctions: Number(e.target.value),
                    })
                  }
                  className="w-20 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
                <span className="text-slate-500">créditos por busca</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Tabela de precificação atualizada em todo o cluster!', 'success')}
            className="py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            Salvar Novas Tabelas de Preço
          </button>
        </div>
      )}

      {/* TAB 5: COMPLIANCE AUDIT LOGS */}
      {activeAdminTab === 'compliance' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-0">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                Trilha de Auditoria Geral LGPD &amp; Detecção de Anomalias
              </h3>
              <p className="text-[11px] text-slate-500">
                Log imutável de todas as requisições realizadas por clientes na infraestrutura DROPE
              </p>
            </div>
            <button
              onClick={() => showToast('Exportando relatório geral de conformidade...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              Exportar Trilha DPO
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Log ID</th>
                  <th className="py-2.5 px-4">Carimbo Data/Hora</th>
                  <th className="py-2.5 px-4">Organização</th>
                  <th className="py-2.5 px-4">Usuário / Agente</th>
                  <th className="py-2.5 px-4">Base Legal Declarada</th>
                  <th className="py-2.5 px-4">IP Origem</th>
                  <th className="py-2.5 px-4 text-center">Detecção de Anomalia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {log.id}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {log.organizationName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {log.userName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-[11px]">
                      {log.legalPurpose}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {log.anomalyDetected ? (
                        <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          ALERTA DE ANOMALIA
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          REGULAR
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
