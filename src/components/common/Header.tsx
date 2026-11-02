import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Sun,
  Moon,
  Coins,
  Plus,
  Shield,
  User,
  LogOut,
  ChevronDown,
  Building,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  mobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  mobileSidebarOpen,
}) => {
  const {
    currentView,
    setCurrentView,
    isDark,
    toggleTheme,
    isAuthenticated,
    setIsAuthenticated,
    isAdminMode,
    setIsAdminMode,
    creditsBalance,
    addCredits,
    organizationName,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // If in public view (Landing, Login, Onboarding)
  if (!isAuthenticated && (currentView === 'landing' || currentView === 'login' || currentView === 'onboarding')) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-left focus:outline-none whitespace-nowrap shrink-0"
          >
            <BrandLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setCurrentView('landing')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'landing' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              Visão Geral
            </button>
            <a
              href="#recursos"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Recursos &amp; Motores
            </a>
            <a
              href="#conformidade"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Segurança &amp; LGPD
            </a>
            <a
              href="#planos"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Planos &amp; Créditos
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentView !== 'login' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  Entrar
                </button>
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-500/20 transition-all whitespace-nowrap shrink-0"
                >
                  Cadastrar Organização
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('landing')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Voltar ao Início
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Logged-in Header
  const viewTitles: Record<string, string> = {
    dashboard: 'Visão Geral do Painel',
    search: 'Central de Consultas Inteligentes',
    result: 'Dossiê Analítico da Consulta',
    history: 'Histórico & Auditoria de Consultas',
    reports: 'Central de Relatórios & Autenticidade',
    credits: 'Gestão de Créditos & Planos',
    integrations: 'Integrações, APIs & Webhooks',
    organization: 'Minha Organização & Membros',
    settings: 'Configurações de Acesso & LGPD',
    admin: 'DROPE Master Admin Console',
  };

  return (
    <header className="sticky top-0 z-30 w-full h-15 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-6">
        {/* Zone 1: Mobile toggle + Breadcrumb Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Abrir menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
              {isAdminMode ? 'Painel Administrativo' : organizationName}
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight whitespace-nowrap">
              {viewTitles[currentView] || 'DROPE'}
            </span>
          </div>
        </div>

        {/* Zone 2: Middle Status Info (Clean unboxed text) */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>Ambiente Seguro SSL</span>
          <span aria-hidden="true">·</span>
          <span>LGPD Compliant</span>
          <span aria-hidden="true">·</span>
          <span>SLA 99.9%</span>
        </div>

        {/* Zone 3: Balance + Actions + Profile Menu */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Credit balance display with quick recharge button */}
          <div className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
            <div className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <div className="flex items-baseline gap-1 text-xs">
                <span className="font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  {creditsBalance.toLocaleString('pt-BR')}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">créditos</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('credits')}
              title="Adicionar ou gerenciar créditos"
              className="p-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar modo claro e escuro"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold font-mono">
                CP
              </div>
              <div className="hidden sm:flex flex-col text-xs leading-none">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Carlos Prado
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Analista Sênior
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      Carlos Prado
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      carlos.prado@nexusfin.com.br
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('organization');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    Minha Organização
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Configurações &amp; Perfil
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  {/* Master Admin Toggle Switcher */}
                  <button
                    onClick={() => {
                      const nextMode = !isAdminMode;
                      setIsAdminMode(nextMode);
                      setCurrentView(nextMode ? 'admin' : 'dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-between text-blue-600 dark:text-blue-400 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" />
                      {isAdminMode ? 'Voltar p/ Visão Cliente' : 'Painel Master Admin'}
                    </span>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setCurrentView('landing');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 text-rose-600 dark:text-rose-400"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Encerrar Sessão
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
