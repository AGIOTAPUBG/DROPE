import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  CheckCircle,
  Hash,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  QrCode,
  Sparkles,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'gerar' | 'historico'>('gerar');
  const [reportType, setReportType] = useState<'individual' | 'consolidado' | 'lgpd'>('consolidado');
  const [period, setPeriod] = useState('outubro_2026');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'json' | 'csv'>('pdf');

  const generatedReportsList = [
    {
      id: 'REL-2026-10-CONSOL',
      title: 'Relatório Executivo Mensal de Consultas — Outubro 2026',
      emissao: '01/11/2026 08:30',
      responsavel: 'Mariana Duarte (DPO)',
      hash: '9f83a2884b2...84a1',
      tamanho: '2.4 MB',
      formato: 'PDF Certificado',
      status: 'Autenticado',
    },
    {
      id: 'REL-2026-LGPD-Q3',
      title: 'Dossiê Trimestral de Conformidade Regulatória LGPD',
      emissao: '15/10/2026 14:10',
      responsavel: 'Carlos Prado',
      hash: '3a1290bb341...982f',
      tamanho: '5.1 MB',
      formato: 'PDF + Hash SHA-256',
      status: 'Autenticado',
    },
    {
      id: 'REL-2026-09-CONSOL',
      title: 'Relatório Executivo Mensal de Consultas — Setembro 2026',
      emissao: '01/10/2026 09:00',
      responsavel: 'Mariana Duarte (DPO)',
      hash: 'cc8109341aa...5531',
      tamanho: '2.1 MB',
      formato: 'PDF Certificado',
      status: 'Autenticado',
    },
  ];

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Relatório ${reportType.toUpperCase()} gerado com sucesso com Hash de Integridade Digital!`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Central de Relatórios &amp; Dossiês Certificados
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Documentos analíticos com hash de integridade imutável e autenticidade verificável.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('gerar')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'gerar'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Emitir Novo Dossiê
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'historico'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Histórico de Emissões ({generatedReportsList.length})
          </button>
        </div>
      </div>

      {activeTab === 'gerar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Generator Form */}
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 dark:text-slate-200">
              Configuração do Documento
            </h2>

            <form onSubmit={handleGenerateReport} className="space-y-5">
              {/* Report Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tipo de Relatório
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div
                    onClick={() => setReportType('consolidado')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      reportType === 'consolidado'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="font-bold block">Consolidado Mensal</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Volume, volumetria por motor e créditos
                    </span>
                  </div>

                  <div
                    onClick={() => setReportType('individual')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      reportType === 'individual'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="font-bold block">Dossiê Específico</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Certidão única com dados cadastrais e QSA
                    </span>
                  </div>

                  <div
                    onClick={() => setReportType('lgpd')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      reportType === 'lgpd'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="font-bold block">Auditoria LGPD</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Relatório de conformidade para DPO/ANPD
                    </span>
                  </div>
                </div>
              </div>

              {/* Period selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Período de Competência
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="outubro_2026">Outubro / 2026 (Atual)</option>
                    <option value="setembro_2026">Setembro / 2026</option>
                    <option value="agosto_2026">Agosto / 2026</option>
                    <option value="q3_2026">3º Trimestre 2026 (Consolidado)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Formato de Exportação
                  </label>
                  <div className="flex items-center gap-2">
                    {(['pdf', 'json', 'csv'] as const).map((fmt) => (
                      <button
                        type="button"
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg border transition-colors ${
                          selectedFormat === fmt
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security reassurance */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Autenticação Digital e Integridade Garantida</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Todo relatório emitido pelo DROPE recebe um Hash SHA-256 e código validador
                  público que impede falsificações ou adulterações de dados.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Gerar e Baixar Documento Certificado</span>
              </button>
            </form>
          </div>

          {/* Right: Certificate Sample & Authenticity Preview */}
          <div className="lg:col-span-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-800 dark:text-slate-200">
                Padrão do Dossiê DROPE
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                VALIDADO
              </span>
            </div>

            {/* Document layout simulation */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold font-sans text-slate-900 dark:text-white">
                  DROPE Data Intelligence
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  CERT-DRP-89401
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Titular da Requisição:</strong> Nexus Finanças S/A
                </p>
                <p>
                  <strong>Encarregado Técnico:</strong> Carlos Prado (Analista)
                </p>
                <p>
                  <strong>Bases Oficiais:</strong> RFB, Sintegra, Senatran, Tribunais
                </p>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500 break-all space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Hash SHA-256 de Autenticidade:
                </span>
                <span>f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Validador: verify.drope.com.br</span>
                <span>QR Code Embutido</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed">
              * Relatórios são aceitos judicialmente e em auditorias de conformidade com
              carimbo de tempo oficial ICP-Brasil e carimbo digital DROPE.
            </div>
          </div>
        </div>
      ) : (
        /* History of Issued Reports */
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Identificador</th>
                  <th className="py-3 px-4">Título do Documento</th>
                  <th className="py-3 px-4">Data de Emissão</th>
                  <th className="py-3 px-4">Responsável</th>
                  <th className="py-3 px-4">Formato / Tamanho</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {generatedReportsList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {item.emissao}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {item.responsavel}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {item.formato} ({item.tamanho})
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() =>
                          showToast(`Baixando cópia oficial do relatório ${item.id}`, 'info')
                        }
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-colors"
                      >
                        Baixar
                      </button>
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
