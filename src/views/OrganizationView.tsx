import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building,
  Users,
  UserPlus,
  ShieldCheck,
  FileCheck2,
  Mail,
  Coins,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types';

export const OrganizationView: React.FC = () => {
  const { members, addMember, organizationName, showToast } = useApp();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('senior_analyst');
  const [inviteLimit, setInviteLimit] = useState(800);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    addMember({
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'invited',
      monthlyCreditLimit: Number(inviteLimit),
    });

    setInviteName('');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const roleLabels: Record<UserRole, string> = {
    admin: 'Administrador da Organização',
    senior_analyst: 'Analista de Risco Sênior',
    operator: 'Operador de Consulta',
    auditor: 'Auditor de Conformidade / DPO',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Minha Organização &amp; Gestão de Acessos
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Controle de governança, membros de equipe, limites de créditos e compliance corporativo.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Convidar Novo Usuário</span>
        </button>
      </div>

      {/* Organization Master Card */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {organizationName}
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                CNPJ: 44.891.022/0001-94 · Conta Corporativa Verificada
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
            STATUS: ATIVA &amp; REGULAR
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Encarregado DPO</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Mariana Duarte
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">E-mail de Conformidade</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              dpo@nexusfin.com.br
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Membros Ativos</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {members.length} colaboradores
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Cota Mensal Global</span>
            <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
              2.800 créditos
            </span>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-0">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Colaboradores e Limites Individuais de Créditos
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {members.length} membros vinculados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Nome do Usuário</th>
                <th className="py-3 px-4">E-mail Corporativo</th>
                <th className="py-3 px-4">Perfil / Papel</th>
                <th className="py-3 px-4 text-right">Limite Mensal</th>
                <th className="py-3 px-4 text-right">Utilizado</th>
                <th className="py-3 px-4">Último Acesso</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {member.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {member.email}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-[11px]">
                      {roleLabels[member.role] || member.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {member.monthlyCreditLimit.toLocaleString('pt-BR')} cr
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                    {member.creditsUsedThisMonth.toLocaleString('pt-BR')} cr
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {member.lastAccess}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        member.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {member.status === 'active' ? 'ATIVO' : 'CONVIDADO'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Matrix & Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Lock className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Matriz de Permissões (RBAC)
            </h3>
          </div>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold">Administrador:</span>
              <span>Acesso irrestrito a faturamento, usuários e API</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold">Analista Sênior:</span>
              <span>Execução de consultas com e sem mascaramento</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold">Operador:</span>
              <span>Execução de consultas com dados mascarados</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold">Auditor / DPO:</span>
              <span>Acesso somente leitura a trilhas de auditoria e logs</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <FileCheck2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white">
              Documentos &amp; Acordos Contratuais
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span>Termo de Adesão Corporativo DROPE (Assinado)</span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold">VÁLIDO</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span>Acordo de Tratamento de Dados (DPA / LGPD)</span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold">HOMOLOGADO</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span>Relatório de Impacto à Proteção de Dados (RIPD)</span>
              <span className="text-[10px] text-blue-500 font-mono font-bold">ARQUIVADO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Convidar Colaborador para a Organização
            </h3>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Ex: Juliana Furtado"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="juliana.furtado@nexusfin.com.br"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Perfil de Acesso
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="senior_analyst">Analista Sênior</option>
                    <option value="operator">Operador</option>
                    <option value="auditor">Auditor LGPD</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Limite Mensal (Créditos)
                  </label>
                  <input
                    type="number"
                    value={inviteLimit}
                    onChange={(e) => setInviteLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="w-1/2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
