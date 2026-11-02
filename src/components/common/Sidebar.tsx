import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  LayoutDashboard,
  Search,
  History,
  FileText,
  Coins,
  Cpu,
  Building,
  Settings,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ViewType } from '../../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    currentView,
    setCurrentView,
    isAdminMode,
    setIsAdminMode,
    creditsBalance,
  } = useApp();

  const clientNavItems: { id: ViewType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'search', label: 'Central de Consultas', icon: Search },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'credits', label: 'Créditos e Planos', icon: Coins },
    { id: 'integrations', label: 'Integrações', icon: Cpu },
    { id: 'organization', label: 'Minha Organização', icon: Building },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const adminNavItems: { id: ViewType; label: string; icon: React.ElementType }[] = [
    { id: 'admin', label: 'Gestão Geral Admin', icon: ShieldAlert },
    { id: 'dashboard', label: 'Visão do Cliente', icon: LayoutDashboard },
    { id: 'search', label: 'Central de Consultas', icon: Search },
  ];

  const handleNavClick = (viewId: ViewType) => {
    setCurrentView(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <BrandLogo size="md" showSlogan />
      </div>

      {/* Nav List */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
          {isAdminMode ? 'Administração Master' : 'Navegação Principal'}
        </div>

        {(isAdminMode ? adminNavItems : clientNavItems).map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-colors text-left ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.id === 'search' && (
                <span className="text-[10px] text-blue-200 bg-blue-700/60 px-1.5 py-0.5 rounded font-mono">
                  PRO
                </span>
              )}
            </button>
          );
        })}

        {/* Separator for Admin Direct Switch */}
        <div className="pt-4 pb-2 px-3">
          <div className="border-t border-slate-800 pt-3 text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Controle de Modo
          </div>
        </div>

        <button
          onClick={() => {
            const nextMode = !isAdminMode;
            setIsAdminMode(nextMode);
            setCurrentView(nextMode ? 'admin' : 'dashboard');
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left border ${
            isAdminMode
              ? 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-950/60'
              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>{isAdminMode ? 'Modo Master Ativo' : 'Acessar Master Admin'}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Footer Credit Widget */}
      <div className="p-3 m-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-400">Saldo Disponível</span>
          <span className="text-xs font-bold font-mono text-blue-400 tabular-nums">
            {creditsBalance.toLocaleString('pt-BR')} cr
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, (creditsBalance / 2800) * 100)}%` }}
          />
        </div>
        <button
          onClick={() => handleNavClick('credits')}
          className="w-full py-1.5 px-2 text-[11px] font-semibold text-center text-slate-200 bg-slate-800 hover:bg-slate-700/80 rounded transition-colors"
        >
          Recarregar Créditos
        </button>
      </div>

      {/* Compliance Stamp */}
      <div className="px-4 py-3 border-t border-slate-800/70 text-[10px] text-slate-500 flex items-center justify-between">
        <span>DROPE SaaS v1.0</span>
        <span className="font-mono">LGPD Sec</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop permanent sidebar */}
      <aside className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-30">
        {navContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 h-full">{navContent}</div>
        </div>
      )}
    </>
  );
};
