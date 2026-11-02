import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  CreditCard,
  QrCode,
  Check,
  Download,
  Receipt,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { COMMERCIAL_PLANS, CREDIT_PACKAGES, FINANCIAL_INVOICES } from '../data/mockData';

export const CreditsPlansView: React.FC = () => {
  const { creditsBalance, addCredits, showToast } = useApp();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof CREDIT_PACKAGES[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleOpenBuyPackage = (pkg: typeof CREDIT_PACKAGES[0]) => {
    setSelectedPackage(pkg);
    setShowCheckoutModal(true);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPackage) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      addCredits(selectedPackage.credits, `Recarga Pacote ${selectedPackage.credits} créditos`);
      setIsProcessingPayment(false);
      setShowCheckoutModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Balance Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Balance */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-800/60 text-white space-y-3">
          <div className="flex items-center justify-between text-xs text-blue-200">
            <span className="font-semibold uppercase tracking-wider">Saldo de Créditos Ativo</span>
            <Coins className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums">
              {creditsBalance.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs text-blue-300">créditos</span>
          </div>
          <p className="text-xs text-blue-200/80 leading-relaxed">
            Renovação programada do ciclo em <strong>15/11/2026</strong> (+2.800 créditos).
          </p>
        </div>

        {/* Card 2: Current Active Plan */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Plano em Vigor</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              ATIVO
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Plano Profissional
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              R$ 1.490,00/mês (Ciclo Anual)
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Até 15 usuários corporativos com controle individual de cotas.
          </p>
        </div>

        {/* Card 3: Quick Action */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recarga Rápida Avulsa
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Precisa de créditos imediatos sem alterar a assinatura contratada?
          </p>
          <button
            onClick={() => handleOpenBuyPackage(CREDIT_PACKAGES[2])}
            className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all text-center"
          >
            Adicionar +2.000 Créditos Instantâneos
          </button>
        </div>
      </div>

      {/* Credit Packages Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
            Pacotes de Créditos Avulsos
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Créditos sem data de expiração, ativados no mesmo segundo via PIX ou Cartão.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDIT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-5 rounded-xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between space-y-4 ${
                pkg.popular
                  ? 'border-blue-500 shadow-md shadow-blue-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pacote {pkg.credits} cr
                  </span>
                  {pkg.bonus !== '0%' && (
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                      {pkg.bonus}
                    </span>
                  )}
                </div>

                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                  R$ {pkg.price.toLocaleString('pt-BR')}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  R$ {(pkg.price / pkg.credits).toFixed(2)} por crédito
                </div>
              </div>

              <button
                onClick={() => handleOpenBuyPackage(pkg)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  pkg.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                Comprar Pacote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Plans Section */}
      <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Planos &amp; Assinaturas Recorrentes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Economize 20% contratando o faturamento anual com faturas mensais.
            </p>
          </div>

          {/* Monthly / Annual Toggle Switch */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faturamento Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Faturamento Anual</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMERCIAL_PLANS.map((plan) => {
            const price =
              billingCycle === 'annual'
                ? plan.priceAnnualMonthlyEquivalent
                : plan.priceMonthly;

            const isCurrentPlan = plan.id === 'professional';

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-xl bg-white dark:bg-slate-900 border flex flex-col justify-between space-y-6 ${
                  isCurrentPlan
                    ? 'border-blue-500 ring-1 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {plan.name}
                      </h3>
                      {isCurrentPlan && (
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                          PLANO ATUAL
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{plan.targetAudience}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                      R$ {price.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-slate-500">/mês</span>
                  </div>

                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {plan.monthlyCredits.toLocaleString('pt-BR')} créditos mensais
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  disabled={isCurrentPlan}
                  onClick={() => showToast(`Solicitação de alteração para ${plan.name} enviada ao executivo de contas.`, 'info')}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors ${
                    isCurrentPlan
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  {isCurrentPlan ? 'Plano Ativo' : 'Migrar para este Plano'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Ledger & Invoices */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
            Extrato Financeiro &amp; Notas Fiscais de Serviço (NFS-e)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Histórico contábil de faturamento e notas fiscais emitidas.
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Identificador da Fatura</th>
                  <th className="py-3 px-4">Competência</th>
                  <th className="py-3 px-4">Descrição do Plano / Pacote</th>
                  <th className="py-3 px-4">Data Vencimento</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">NFS-e</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {FINANCIAL_INVOICES.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {inv.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {inv.competencia}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {inv.plano}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {inv.vencimento}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      R$ {inv.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          showToast(`Baixando documento XML/PDF da ${inv.nfe}`, 'info')
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-colors"
                      >
                        <Download className="w-3 h-3 text-slate-400" />
                        <span>{inv.nfe}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recarga Instantânea de Créditos
              </h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Pacote {selectedPackage.credits.toLocaleString('pt-BR')} Créditos
                </span>
                <span className="text-[11px] text-slate-500">
                  Créditos sem vencimento
                </span>
              </div>
              <span className="text-base font-extrabold font-mono text-blue-600 dark:text-blue-400">
                R$ {selectedPackage.price.toLocaleString('pt-BR')}
              </span>
            </div>

            {/* Payment method toggle */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 ${
                  paymentMethod === 'pix'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>PIX Instantâneo</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão Corporativo</span>
              </button>
            </div>

            {paymentMethod === 'pix' ? (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <div className="w-32 h-32 bg-white rounded-lg p-2 mx-auto border border-slate-200 flex items-center justify-center">
                  {/* Simulated SVG QR Code */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="40" y="10" width="15" height="10" />
                    <rect x="40" y="30" width="20" height="10" />
                    <rect x="40" y="50" width="20" height="20" />
                    <rect x="70" y="40" width="20" height="15" />
                    <rect x="70" y="70" width="15" height="20" />
                  </svg>
                </div>
                <div className="text-[11px] text-slate-500">
                  Escaneie o código QR acima ou copie a chave PIX Copia e Cola.
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-semibold">
                    <span>Cartão Final •••• 4912</span>
                    <span className="font-mono text-[10px]">Exp 09/29</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Nexus Finanças e Crédito S/A (Padrão Corporativo)
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="w-1/3 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPurchase}
                disabled={isProcessingPayment}
                className="w-2/3 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <span>Liberando Créditos...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirmar Pagamento</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
