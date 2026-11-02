import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import {
  Search,
  ShieldCheck,
  Building2,
  Car,
  FileCheck,
  Zap,
  Lock,
  Database,
  ArrowRight,
  Check,
  Layers,
  Scale,
  Cpu,
  BarChart3,
  Server,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMMERCIAL_PLANS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'cnpj' | 'veiculo' | 'cadastral'>('cnpj');
  const [searchSample, setSearchSample] = useState('38.412.980/0001-72');

  const handleQuickDemoEnter = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-800/80">
        {/* Subtle geometric grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Plataforma SaaS de Inteligência &amp; Validação de Dados</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Inteligência de dados para decisões mais rápidas e seguras.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                O <strong className="text-white font-semibold">DROPE</strong> unifica
                fontes de informações oficiais e autorizadas em uma interface
                elegante, auditável e 100% em conformidade com a LGPD. Elimine
                consultas fragmentadas em múltiplos portais.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleQuickDemoEnter}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Experimentar Plataforma Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Cadastrar Minha Organização</span>
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>SLA 99.9% de Disponibilidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Criptografia Ponta a Ponta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Hash SHA-256 Imutável</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Demo Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs text-slate-400 font-mono ml-2">
                      central-consultas.drope
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 font-medium">
                    Motor Ativo
                  </span>
                </div>

                {/* Simulated Category Switcher */}
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('cnpj');
                      setSearchSample('38.412.980/0001-72');
                    }}
                    className={`py-1.5 px-2 rounded font-medium transition-colors text-center ${
                      activeTab === 'cnpj'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Empresas
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('veiculo');
                      setSearchSample('DRP-9A42');
                    }}
                    className={`py-1.5 px-2 rounded font-medium transition-colors text-center ${
                      activeTab === 'veiculo'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Veículos
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('cadastral');
                      setSearchSample('***.814.398-**');
                    }}
                    className={`py-1.5 px-2 rounded font-medium transition-colors text-center ${
                      activeTab === 'cadastral'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cadastral
                  </button>
                </div>

                {/* Input Simulation */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Parâmetro de Consulta
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 font-mono text-xs text-slate-200">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span className="flex-1">{searchSample}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">
                      5 créditos
                    </span>
                  </div>
                </div>

                {/* Sample Result Preview Box */}
                <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/90 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status na RFB</span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      ATIVA / REGULAR
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Confiabilidade</span>
                    <span className="text-blue-400 font-semibold font-mono">
                      96 / 100 (Alta)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Hash SHA-256</span>
                    <span className="text-slate-400 font-mono truncate max-w-[180px]">
                      e3b0c44298fc1c...b855
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleQuickDemoEnter}
                  className="w-full py-2 px-3 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  <span>Executar Consulta Completa no Painel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pillars & Features */}
      <section id="recursos" className="py-20 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400">
              Diferenciais Tecnológicos
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Uma única interface. Todas as fontes necessárias.
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              O DROPE substitui o trabalho manual e desarticulado de consultas em dezenas
              de sites governamentais e birôs fechados por uma esteira unificada e inteligente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Empresas e CNPJs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quadro de Sócios e Administradores (QSA), capital social, CNAEs,
                regime tributário, inscrições estaduais e cruzamento com a Receita Federal.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Validação Cadastral &amp; PEP</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Confronto algorítmico de dados de pessoas físicas e jurídicas, verificação
                de Pessoas Politicamente Expostas (PEP) e bases restritivas.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Veículos &amp; Frotas</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integração com bases do Senatran, verificação de alienação fiduciária,
                débitos de IPVA, multas ativas e restrições judiciais.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Contratos &amp; Cartórios</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Varredura em centrais notariais e cartórios de títulos e protestos,
                agilizando a formalização e análise de fornecedores.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">CNDs, CEIS &amp; Sanções</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Emissão unificada de certidões negativas (Federal, FGTS, Trabalhista e Estadual)
                e verificação no Cadastro de Empresas Inidôneas (CEIS/CNEP).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-950/80 border border-violet-800/60 flex items-center justify-center text-violet-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">API REST &amp; Webhooks</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integração direta com seus sistemas ERP, esteiras de crédito e CRM via
                APIs robustas com alta vazão e resposta em milissegundos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & LGPD Compliance */}
      <section id="conformidade" className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                Conformidade Regulatória
              </span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Privacidade por concepção e conformidade estrita com a LGPD
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                O DROPE foi desenhado do zero para atender a Lei Geral de Proteção de Dados
                (Lei nº 13.709/2018). Toda consulta exige declaração de base legal,
                possui trilha de auditoria e garante mascaramento adequado de dados sensíveis.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Bases Legais Vinculadas</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cada requisição armazena a finalidade legal declarada (Art. 7º e Art. 11),
                      pronta para apresentação a órgãos fiscalizadores e auditorias.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Trilha de Auditoria Imutável</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Registros de IP, usuário, carimbo de tempo e hash SHA-256 criptografado
                      para assegurar integridade contra manipulações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Mascaramento Inteligente</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Documentos pessoais (CPF, chassi, telefones) são protegidos e exibidos
                      apenas de acordo com os privilégios estritos do usuário.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Box Mockup */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-semibold text-slate-200">
                  Certificado de Autenticidade &amp; Log
                </span>
                <span className="text-emerald-400 font-mono">AUDIT_VERIFIED</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">ID Operação: </span>
                  <span className="text-blue-400">DRP-2026-94812</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">Base Legal: </span>
                  <span className="text-slate-300">Art. 7º, X (Proteção do Crédito)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">Hash SHA-256: </span>
                  <span className="text-slate-400 text-[11px] break-all">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Encarregado DPO: compliance@drope.com.br</span>
                <span>ISO 27001 Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Plans Preview */}
      <section id="planos" className="py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400">
              Planos &amp; Créditos
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Modelos comerciais transparentes para cada escala
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Créditos flexíveis com custos pré-definidos por categoria. Sem taxas ocultas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMMERCIAL_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-xl bg-slate-900 border flex flex-col justify-between relative transition-all ${
                  plan.isPopular
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'border-slate-800'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Mais Escolhido
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{plan.targetAudience}</p>
                  </div>

                  <div className="pt-2 pb-4 border-b border-slate-800 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-white font-mono">
                      R$ {plan.priceMonthly.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-slate-400">/mês</span>
                  </div>

                  <div className="text-xs font-semibold text-blue-400">
                    Inclui {plan.monthlyCredits.toLocaleString('pt-BR')} créditos/mês
                  </div>

                  <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsAuthenticated(true);
                      setCurrentView('credits');
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                      plan.isPopular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    Contratar {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <BrandLogo size="md" showSlogan />
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('landing')}
                className="hover:text-white transition-colors"
              >
                Início
              </button>
              <button
                onClick={handleQuickDemoEnter}
                className="hover:text-white transition-colors"
              >
                Acessar Plataforma
              </button>
              <button
                onClick={() => setCurrentView('onboarding')}
                className="hover:text-white transition-colors"
              >
                Cadastro de Organizações
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="hover:text-white transition-colors"
              >
                Portal de Acesso
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 DROPE — Intelligent Data Search &amp; Validation. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Termos de Uso</span>
              <span aria-hidden="true">·</span>
              <span>Política de Privacidade LGPD</span>
              <span aria-hidden="true">·</span>
              <span>Canal do Titular de Dados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
