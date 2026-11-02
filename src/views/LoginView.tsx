import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  CheckCircle,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { setIsAuthenticated, setCurrentView, showToast, setIsAdminMode } = useApp();

  const [email, setEmail] = useState('carlos.prado@nexusfin.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [mfaCode, setMfaCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Preencha e-mail e senha corporativos.', 'warning');
      return;
    }
    // Advance to MFA verification step
    setStep('mfa');
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    showToast('Sessão autenticada com sucesso!', 'success');
  };

  const handleQuickDemo = (role: 'analyst' | 'admin') => {
    setIsAuthenticated(true);
    if (role === 'admin') {
      setIsAdminMode(true);
      setCurrentView('admin');
      showToast('Entrando como Master Administrator do DROPE', 'info');
    } else {
      setIsAdminMode(false);
      setCurrentView('dashboard');
      showToast('Entrando como Analista Corporativo da Nexus Finanças', 'success');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center">
            <BrandLogo size="lg" showSlogan />
          </div>
          <h2 className="text-xl font-bold text-white pt-2">
            Acesso à Plataforma Corporativa
          </h2>
          <p className="text-xs text-slate-400">
            Ambiente restrito e monitorado em conformidade com a LGPD
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  E-mail Corporativo
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="usuario@organizacao.com.br"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 text-xs"
                />
                <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
                  Manter conectado neste dispositivo confiável
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <span>Avançar para Verificação MFA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/60 text-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Autenticação em Dois Fatores (MFA)</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Insira o código de 6 dígitos gerado no seu aplicativo autenticador
                  (Google Authenticator ou Microsoft Authenticator).
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Código de Verificação
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ex: 849201"
                    className="w-full pl-9 pr-3 py-2 text-center tracking-widest font-mono text-base rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="text-[10px] text-slate-500 text-center">
                  (Dica de demonstração: qualquer código de 6 dígitos ou deixe vazio)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-1/3 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Validar e Entrar</span>
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Pre-fill Pills */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <div className="text-[11px] text-slate-500 text-center">
              Acesso Rápido para Avaliação do Sistema
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('analyst')}
                className="py-1.5 px-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60 transition-colors"
              >
                Perfil Analista
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-indigo-300 text-xs font-medium border border-slate-700/60 transition-colors"
              >
                Perfil Master Admin
              </button>
            </div>
          </div>
        </div>

        {/* Security Reassurance Footer */}
        <div className="text-center space-y-2 text-xs text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Sessão protegida por Criptografia TLS 1.3 &amp; Auditoria de IP</span>
          </div>
          <div>
            Ainda não possui conta?{' '}
            <button
              onClick={() => setCurrentView('onboarding')}
              className="text-blue-400 hover:underline font-medium"
            >
              Cadastre sua organização
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Recuperação de Acesso</h3>
              <p className="text-xs text-slate-400">
                Insira o e-mail corporativo cadastrado para receber o link de redefinição.
              </p>
            </div>

            {forgotSent ? (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 space-y-2">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instruções enviadas!</span>
                </div>
                <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                  Verifique sua caixa de entrada no endereço corporativo informado.
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="w-full mt-2 py-1.5 px-3 rounded bg-slate-800 text-slate-200 text-xs font-medium"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="seu.email@empresa.com.br"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="w-1/2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (!forgotEmail) {
                        showToast('Informe seu e-mail corporativo.', 'warning');
                        return;
                      }
                      setForgotSent(true);
                      showToast('E-mail de recuperação simulado com sucesso.', 'info');
                    }}
                    className="w-1/2 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
                  >
                    Enviar Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
