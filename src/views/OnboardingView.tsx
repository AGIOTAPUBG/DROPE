import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import {
  Building,
  User,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { LEGAL_PURPOSES } from '../data/mockData';

export const OnboardingView: React.FC = () => {
  const { setCurrentView, setIsAuthenticated, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    cnpj: '44.891.022/0001-94',
    razaoSocial: 'NEXUS FINANCAS & INTELIGENCIA S/A',
    nomeFantasia: 'NEXUS FINTECH',
    segmento: 'Instituição de Pagamento / Fintech',
    porte: 'Médio / Grande Porte',
    responsavelNome: 'Carlos Prado',
    responsavelCargo: 'Gerente de Riscos e Compliance',
    responsavelEmail: 'carlos.prado@nexusfin.com.br',
    responsavelTelefone: '(11) 98412-4491',
    finalidadesSelecionadas: ['credito', 'fraude', 'obrigacao_legal'],
    aceiteTermos: true,
    aceiteLgpd: true,
  });

  const handleNext = () => {
    if (step === 3 && formData.finalidadesSelecionadas.length === 0) {
      showToast('Selecione ao menos uma finalidade legal para prosseguir.', 'warning');
      return;
    }
    if (step === 4 && (!formData.aceiteTermos || !formData.aceiteLgpd)) {
      showToast('É necessário aceitar os termos de serviço e a política LGPD.', 'warning');
      return;
    }
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleFinishOnboarding = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    showToast('Organização aprovada com sucesso! Bem-vindo ao DROPE.', 'success');
  };

  const stepsList = [
    { num: 1, label: 'Organização' },
    { num: 2, label: 'Responsável' },
    { num: 3, label: 'Finalidades LGPD' },
    { num: 4, label: 'Aceite Contratual' },
    { num: 5, label: 'Aprovação' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100">
      <div className="w-full max-w-2xl space-y-6">
        {/* Step indicator header */}
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center">
            <BrandLogo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Credenciamento &amp; Habilitação de Organização
          </h2>
          <p className="text-xs text-slate-400">
            Processo de qualificação para acesso a dados autorizados em conformidade legal
          </p>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="grid grid-cols-5 gap-2 px-2">
          {stepsList.map((s) => (
            <div key={s.num} className="space-y-1.5 text-center">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  step >= s.num ? 'bg-blue-600' : 'bg-slate-800'
                }`}
              />
              <span
                className={`text-[10px] font-semibold block truncate ${
                  step === s.num ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                {s.num}. {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Card Content */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Step 1: Identificação da Organização */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-500" />
                  <span>1. Identificação da Organização</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dados corporativos da pessoa jurídica solicitante.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-300">CNPJ da Empresa</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-300">Razão Social</label>
                  <input
                    type="text"
                    value={formData.razaoSocial}
                    onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Nome Fantasia</label>
                  <input
                    type="text"
                    value={formData.nomeFantasia}
                    onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Segmento de Atuação</label>
                  <input
                    type="text"
                    value={formData.segmento}
                    onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados do Responsável */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span>2. Responsável Técnico &amp; Legal</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Profissional encarregado pela administração da conta ou DPO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-300">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.responsavelNome}
                    onChange={(e) => setFormData({ ...formData, responsavelNome: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Cargo / Função</label>
                  <input
                    type="text"
                    value={formData.responsavelCargo}
                    onChange={(e) => setFormData({ ...formData, responsavelCargo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Telefone / Celular</label>
                  <input
                    type="text"
                    value={formData.responsavelTelefone}
                    onChange={(e) => setFormData({ ...formData, responsavelTelefone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-300">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={formData.responsavelEmail}
                    onChange={(e) => setFormData({ ...formData, responsavelEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Finalidade Pretendida (LGPD) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>3. Finalidades Pretendidas de Tratamento (LGPD)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  A criação da conta não concede acesso irrestrito a dados pessoais sem respaldo legal.
                </p>
              </div>

              <div className="space-y-2.5">
                {LEGAL_PURPOSES.map((lp) => {
                  const isChecked = formData.finalidadesSelecionadas.includes(lp.id);
                  return (
                    <div
                      key={lp.id}
                      onClick={() => {
                        const next = isChecked
                          ? formData.finalidadesSelecionadas.filter((id) => id !== lp.id)
                          : [...formData.finalidadesSelecionadas, lp.id];
                        setFormData({ ...formData, finalidadesSelecionadas: next });
                      }}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors text-xs flex items-start gap-3 ${
                        isChecked
                          ? 'border-blue-500 bg-blue-950/40 text-slate-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{lp.name}</span>
                          <span className="text-[10px] font-mono text-blue-400">
                            {lp.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">{lp.legalBasis}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Aceite Contratual */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>4. Aceite Contratual &amp; Termos de Adesão</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Formalização jurídica do acesso e deveres de sigilo.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 max-h-48 overflow-y-auto space-y-2 leading-relaxed">
                <p className="font-semibold text-white">
                  TERMO DE ADESÃO E COMPROMISSO DE CONFORMIDADE — PLATAFORMA DROPE
                </p>
                <p>
                  1. A CONTRATANTE declara que utilizará as consultas disponibilizadas pelo DROPE
                  estritamente para as finalidades legítimas registradas no momento de cada requisição.
                </p>
                <p>
                  2. É expressamente vedada a comercialização, cessão a terceiros ou utilização
                  indiscriminada de dados para práticas ilícitas ou discriminatórias.
                </p>
                <p>
                  3. A CONTRATANTE reconhece que o DROPE mantém trilha de auditoria digital com
                  registro de IP e hash criptográfico, disponível para fiscalização regulatória da ANPD.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aceiteTermos}
                    onChange={(e) => setFormData({ ...formData, aceiteTermos: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span className="text-slate-300">
                    Li e concordo com o Termo de Adesão e Condições Gerais de Fornecimento de Dados.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aceiteLgpd}
                    onChange={(e) => setFormData({ ...formData, aceiteLgpd: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span className="text-slate-300">
                    Declaro ciência das obrigações de controlador de dados segundo a Lei 13.709/2018 (LGPD).
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Verificação e Aprovação */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-600/60 mx-auto flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Habilitação Preliminar Concluída!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  A organização <strong className="text-white">{formData.razaoSocial}</strong> foi
                  cadastrada com perfil empresarial verificado. Seus créditos de boas-vindas
                  foram liberados.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">ID da Organização:</span>
                  <span className="text-blue-400">ORG-NEXUS-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Responsável:</span>
                  <span className="text-slate-200">{formData.responsavelNome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saldo Inicial:</span>
                  <span className="text-emerald-400 font-bold">1.840 créditos</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleFinishOnboarding}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Acessar Painel Principal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          {step < 5 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentView('landing')}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  Cancelar
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-sm flex items-center gap-1.5"
              >
                <span>{step === 4 ? 'Confirmar e Habilitar' : 'Próxima Etapa'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
