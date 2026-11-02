import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Download,
  Printer,
  Copy,
  ShieldCheck,
  Building2,
  Car,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  MapPin,
  Users,
  BadgeCheck,
  Eye,
  EyeOff,
  Hash,
  Scale,
} from 'lucide-react';
import { CompanyResultData, VehicleResultData, PersonValidationResultData } from '../types';

export const QueryResultView: React.FC = () => {
  const {
    activeQuery,
    setCurrentView,
    privacyMaskEnabled,
    setPrivacyMaskEnabled,
    showToast,
  } = useApp();

  const [copiedHash, setCopiedHash] = useState(false);

  if (!activeQuery) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-slate-500">Nenhuma consulta ativa selecionada.</p>
        <button
          onClick={() => setCurrentView('search')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Voltar à Central de Consultas
        </button>
      </div>
    );
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText(activeQuery.integrityHash);
    setCopiedHash(true);
    showToast('Hash de integridade SHA-256 copiado para a área de transferência!', 'info');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleExportPDF = () => {
    showToast('Exportando dossiê analítico oficial em formato PDF certificado...', 'success');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeQuery, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${activeQuery.id}-dossie.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Arquivo JSON estruturado baixado com sucesso!', 'success');
  };

  const data = activeQuery.resultData;
  const isCompany = activeQuery.category === 'cnpj' || !activeQuery.category;
  const isVehicle = activeQuery.category === 'vehicle';
  const isPersonValidation = activeQuery.category === 'validation';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentView('search')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Central de Consultas</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Privacy Mask Toggle Button */}
          <button
            onClick={() => {
              setPrivacyMaskEnabled(!privacyMaskEnabled);
              showToast(
                privacyMaskEnabled
                  ? 'Mascaramento desativado temporariamente para auditoria'
                  : 'Mascaramento de privacidade LGPD ativo',
                'info'
              );
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              privacyMaskEnabled
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
            }`}
          >
            {privacyMaskEnabled ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Mascaramento LGPD Ativo</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Exibição Desmascarada (Auditoria)</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportPDF}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar PDF</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Operation Header Certificate Card */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-base font-extrabold font-mono text-blue-600 dark:text-blue-400">
              {activeQuery.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              REGULAR &amp; AUTORIZADA
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Carimbo: {activeQuery.timestamp}</span>
            <span aria-hidden="true">·</span>
            <span>{activeQuery.creditsCost} créditos</span>
          </div>
        </div>

        {/* Query Meta Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Motor Oficial Conectado</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {activeQuery.engine}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Base Legal Registrada</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {activeQuery.legalPurpose.toUpperCase()}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Analista Responsável</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {activeQuery.userName} ({activeQuery.userRole})
            </span>
          </div>
        </div>

        {/* SHA-256 Hash Verification */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2 truncate">
            <Hash className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-slate-400 shrink-0">Hash SHA-256:</span>
            <span className="text-slate-600 dark:text-slate-300 truncate">
              {activeQuery.integrityHash}
            </span>
          </div>
          <button
            onClick={handleCopyHash}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-2 font-sans font-medium"
          >
            {copiedHash ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Divergences & Alerts Section if present */}
      {data?.divergencias && data.divergencias.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
            Verificações de Consistência &amp; Divergências Cadastrais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.divergencias.map((div: any, idx: number) => {
              const isAlert = div.tipo === 'alerta';
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-1 text-xs ${
                    isAlert
                      ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200'
                      : 'border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {isAlert ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                    <span>{div.titulo}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {div.descricao}
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    Fonte: {div.fonte}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPANY DOSSIER VIEW (CNPJ) */}
      {isCompany && (
        <div className="space-y-6">
          {/* Main Company Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                  {data?.cnpj || activeQuery.parameter}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {data?.razaoSocial || activeQuery.parameterLabel}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nome Fantasia: {data?.nomeFantasia || 'NÃO INFORMADO'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Situação Cadastral RFB</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {data?.statusCadastral || 'ATIVA'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold font-mono">
                  {data?.scoreConfiabilidade || 96}
                </div>
              </div>
            </div>

            {/* Grid of Key Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Data de Abertura</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.dataAbertura || '14/05/2018'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Capital Social</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                  {data?.capitalSocial
                    ? `R$ ${data.capitalSocial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    : 'R$ 4.500.000,00'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Porte Empresarial</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.porte || 'DEMAIS (MÉDIA/GRANDE)'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Regime Tributário</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.regimeTributario || 'Lucro Real'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[11px]">Natureza Jurídica</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.naturezaJuridica || '205-4 - Sociedade Anônima Fechada'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[11px]">Atividade Principal (CNAE)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.cnaePrincipal?.codigo || '62.01-5-01'} -{' '}
                  {data?.cnaePrincipal?.descricao || 'Desenvolvimento de programas sob encomenda'}
                </span>
              </div>
            </div>

            {/* Endereço Fiscal */}
            {data?.endereco && (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Endereço Fiscal Homologado</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {data.endereco.logradouro}, {data.endereco.numero}{' '}
                  {data.endereco.complemento && `- ${data.endereco.complemento}`} —{' '}
                  {data.endereco.bairro}, {data.endereco.municipio}/{data.endereco.uf} — CEP:{' '}
                  <span className="font-mono">{data.endereco.cep}</span>
                </p>
              </div>
            )}
          </div>

          {/* Quadro de Sócios e Administradores (QSA) */}
          {data?.socios && (
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                    Quadro de Sócios e Administradores (QSA)
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  {data.socios.length} integrantes vinculados
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Nome do Sócio / Representante</th>
                      <th className="py-2.5 px-4">Qualificação / Cargo</th>
                      <th className="py-2.5 px-4">Documento</th>
                      <th className="py-2.5 px-4 text-right">Participação</th>
                      <th className="py-2.5 px-4 text-right">Data de Entrada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {data.socios.map((socio: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                          {socio.nome}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {socio.cargo}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">
                          {privacyMaskEnabled
                            ? socio.documentoMascarado
                            : socio.documentoMascarado.replace(/\*/g, '8')}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-blue-600 dark:text-blue-400">
                          {socio.participacao}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-500">
                          {socio.entrada}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Certidões de Regularidade (CNDs) */}
          {data?.certidoes && (
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <BadgeCheck className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
                  Situação Fiscal &amp; Certidões Negativas Integradas
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.certidoes.map((cnd: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        {cnd.orgao}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Validade até {cnd.validade}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/10">
                      {cnd.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VEHICLE DOSSIER VIEW */}
      {isVehicle && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div className="space-y-1">
                <span className="text-xl font-extrabold font-mono text-blue-600 dark:text-blue-400 px-3 py-1 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 inline-block">
                  {data?.placa || 'DRP-9A42'}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white pt-1">
                  {data?.marcaModelo || 'VOLVO XC60 T8 RECHARGE INSCRIPTION'}
                </h2>
                <p className="text-xs text-slate-500">
                  {data?.anoFabricacaoModelo} · {data?.cor} · {data?.combustivel}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Situação no Senatran</span>
                <span className="text-sm font-bold text-emerald-500 font-mono">
                  {data?.situacaoVeiculo || 'REGULAR'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Chassi</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                  {data?.chassiMascarado}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">RENAVAM</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                  {data?.renavamMascarado}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Município Emplacamento</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data?.municipioEmplacamento} / {data?.uf}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Restrição Financeira</span>
                <span className="font-semibold text-amber-500">
                  {data?.restricoesFinanceiras}
                </span>
              </div>
            </div>

            {data?.gravame && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
                <span className="font-bold">Gravame / Alienação: </span>
                <span>{data.gravame}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PERSON VALIDATION DOSSIER VIEW */}
      {isPersonValidation && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono text-blue-500 font-bold">
                  {data?.cpfMascarado}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {data?.nomeCompleto}
                </h2>
                <p className="text-xs text-slate-400">
                  Data de Nascimento: {data?.dataNascimentoMascarada} · Nome da Mãe:{' '}
                  {data?.nomeMaeMascarado}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Status Cadastral RFB</span>
                <span className="text-sm font-bold text-emerald-500 font-mono">
                  {data?.situacaoCpf}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>Pessoa Exposta (PEP):</span>
                <span className="font-bold text-emerald-500">NÃO CONSTA</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>Sanções CGU / OFAC:</span>
                <span className="font-bold text-emerald-500">NENHUMA</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>Registro de Óbito:</span>
                <span className="font-bold text-emerald-500">NÃO REGISTRADO</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
