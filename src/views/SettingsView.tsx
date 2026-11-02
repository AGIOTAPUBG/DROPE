import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Lock,
  ShieldCheck,
  Bell,
  Sun,
  Moon,
  Smartphone,
  Globe,
  KeyRound,
  Trash2,
  CheckCircle,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { isDark, toggleTheme, showToast } = useApp();

  const [name, setName] = useState('Carlos Prado');
  const [email] = useState('carlos.prado@nexusfin.com.br');
  const [phone, setPhone] = useState('(11) 98412-4491');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [divergenceAlerts, setDivergenceAlerts] = useState(true);
  const [language, setLanguage] = useState('pt_BR');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Dados de perfil atualizados com sucesso!', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Preencha a senha atual e a nova senha.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('A nova senha e a confirmação não coincidem.', 'error');
      return;
    }
    showToast('Senha corporativa alterada com sucesso!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Configurações &amp; Preferências da Conta
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Gerenciamento de credenciais, autenticação multifator e diretrizes de privacidade.
        </p>
      </div>

      {/* Grid: Profile & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Perfil do Usuário
            </h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                E-mail Corporativo (Login)
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 font-mono cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Telefone de Contato
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-sm transition-colors"
            >
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <KeyRound className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Alterar Senha de Acesso
            </h2>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Senha Atual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres com números e símbolos"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
            >
              Atualizar Senha
            </button>
          </form>
        </div>
      </div>

      {/* Security & Multi-Factor (MFA) */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Autenticação Multifator (MFA / 2FA)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {mfaEnabled ? 'ATIVO' : 'DESATIVADO'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            Proteção de conta obrigatória segundo as diretrizes de compliance do DROPE.
            Exige um código temporário de 6 dígitos ao iniciar sessão a partir de novos navegadores.
          </p>

          <button
            onClick={() => {
              setMfaEnabled(!mfaEnabled);
              showToast(
                mfaEnabled ? 'MFA temporariamente desativado' : 'MFA ativado com sucesso!',
                'info'
              );
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors shrink-0"
          >
            {mfaEnabled ? 'Gerenciar Chaves TOTP' : 'Habilitar 2FA'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Smartphone className="w-4 h-4 text-blue-500" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
            Sessões Ativas
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Navegador Atual (Chrome 128 / macOS)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                IP: 177.136.24.12 · São Paulo, Brasil · Conectado agora
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              ESTA SESSÃO
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Dispositivo Móvel (iPhone / Safari)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                IP: 189.44.112.5 · Há 2 horas
              </span>
            </div>
            <button
              onClick={() => showToast('Sessão secundária revogada com sucesso.', 'info')}
              className="text-xs text-rose-500 hover:underline font-medium"
            >
              Desconectar
            </button>
          </div>
        </div>
      </div>

      {/* Preferences & Theme */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Globe className="w-4 h-4 text-blue-500" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
            Preferências de Interface &amp; Notificações
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Tema da Interface
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isDark) toggleTheme();
                }}
                className={`flex-1 py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 ${
                  !isDark
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Modo Claro</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isDark) toggleTheme();
                }}
                className={`flex-1 py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 ${
                  isDark
                    ? 'border-blue-600 bg-blue-950/60 text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Modo Escuro</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Idioma do Sistema
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="pt_BR">Português (Brasil)</option>
              <option value="en_US">English (United States)</option>
              <option value="es_ES">Español</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
