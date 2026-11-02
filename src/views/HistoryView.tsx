import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Lock,
} from 'lucide-react';
import { QueryRecord } from '../types';

export const HistoryView: React.FC = () => {
  const { queryHistory, inspectRecord, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30d');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredHistory = queryHistory.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameterLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Data/Hora,Categoria,Parametro,Usuario,Motor,Creditos,Status,Hash\n';
    const rows = filteredHistory
      .map(
        (i) =>
          `"${i.id}","${i.timestamp}","${i.categoryLabel}","${i.parameterLabel}","${i.userName}","${i.engine}",${i.creditsCost},"${i.statusLabel}","${i.integrityHash}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `drope-historico-consultas-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Histórico de operações exportado em formato CSV!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Histórico &amp; Auditoria de Consultas
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Trilha completa de operações executadas com retenção controlada conforme LGPD.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Exportar Planilha CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          {/* Search by term */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por ID, CNPJ, Placa ou Responsável..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter by Category */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Todas as Categorias</option>
              <option value="cnpj">Empresas e CNPJ</option>
              <option value="validation">Validação Cadastral</option>
              <option value="vehicle">Veículos e Frotas</option>
              <option value="contracts">Contratos e Registros</option>
              <option value="cnd_sanctions">CNDs e Sanções</option>
            </select>
          </div>

          {/* Filter by Period */}
          <div className="sm:col-span-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="today">Hoje</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="completed">Concluída</option>
              <option value="divergence_detected">Inconsistência</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>{filteredHistory.length} operações encontradas</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Lock className="w-3 h-3" />
            <span>Retenção legal ativa: logs anonimizados após 180 dias</span>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Identificador</th>
                <th className="py-3 px-4">Data e Hora</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Parâmetro / Consulta</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Créditos</th>
                <th className="py-3 px-4 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    Nenhuma operação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {item.timestamp}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {item.categoryLabel}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white max-w-[200px] truncate">
                      {item.parameterLabel}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-[11px]">
                      {item.userName}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {item.statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                      -{item.creditsCost}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => inspectRecord(item)}
                        className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                        title="Ver dossiê completo"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
