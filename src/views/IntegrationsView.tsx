import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  KeyRound,
  Terminal,
  Webhook,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  Play,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Code2,
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const { apiKeys, addApiKey, revokeApiKey, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'keys' | 'docs' | 'sandbox' | 'webhooks'>('docs');
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'production' | 'sandbox'>('production');

  // Sandbox state
  const [sandboxEndpoint, setSandboxEndpoint] = useState('/v1/search/cnpj');
  const [sandboxPayload, setSandboxPayload] = useState('{\n  "cnpj": "38412980000172",\n  "legal_purpose": "credito"\n}');
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  // Webhook state
  const [webhookUrl, setWebhookUrl] = useState('https://api.nexusfin.com.br/drope-listener');
  const [webhookSaved, setWebhookSaved] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    addApiKey(newKeyName.trim(), newKeyEnv);
    setNewKeyName('');
    setShowNewKeyModal(false);
  };

  const handleRunSandbox = () => {
    setIsSandboxRunning(true);
    setTimeout(() => {
      setSandboxResponse(
        JSON.stringify(
          {
            status: 'success',
            operation_id: 'DRP-2026-API-9941',
            timestamp: new Date().toISOString(),
            credits_consumed: 5,
            data: {
              cnpj: '38.412.980/0001-72',
              razao_social: 'AURORA TECNOLOGIA E SERVICOS DE DADOS S.A.',
              status_cadastral: 'ATIVA',
              cnae_principal: '62.01-5-01',
              score_confiabilidade: 96,
              integrity_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
          },
          null,
          2
        )
      );
      setIsSandboxRunning(false);
      showToast('Requisição executada com sucesso no ambiente Sandbox!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Integrações, APIs &amp; Webhooks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conecte o motor de busca e validação do DROPE diretamente aos seus sistemas core.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'docs'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Documentação da API
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'keys'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Chaves de Acesso ({apiKeys.length})
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'sandbox'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Console de Testes
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeTab === 'webhooks'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Webhooks
          </button>
        </div>
      </div>

      {/* TAB 1: API DOCS */}
      {activeTab === 'docs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Guia Rápido da API REST v1
              </h2>
              <p className="text-xs text-slate-500">
                URL Base: <code className="font-mono text-blue-500">https://api.drope.com.br/v1</code>
              </p>
            </div>

            {/* Endpoints list */}
            <div className="space-y-4 text-xs">
              {/* Endpoint 1 */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">
                    POST
                  </span>
                  <code className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    /v1/search/cnpj
                  </code>
                  <span className="text-slate-400 ml-auto">5 créditos</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Realiza busca autorizada de dados cadastrais, QSA, CNAE e situação fiscal da empresa.
                </p>
                <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {`curl -X POST https://api.drope.com.br/v1/search/cnpj \\
  -H "Authorization: Bearer drp_live_9a7x..." \\
  -H "Content-Type: application/json" \\
  -d '{"cnpj": "38412980000172", "legal_purpose": "credito"}'`}
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">
                    POST
                  </span>
                  <code className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    /v1/validate/cadastral
                  </code>
                  <span className="text-slate-400 ml-auto">3 créditos</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Validação de consistência cadastral e confrontamento algorítmico de CPF/CNPJ com bases governamentais.
                </p>
              </div>

              {/* Endpoint 3 */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">
                    POST
                  </span>
                  <code className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    /v1/search/vehicle
                  </code>
                  <span className="text-slate-400 ml-auto">4 créditos</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Consulta de dados de frota, débitos de IPVA, gravames e restrições via Senatran.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Technical Limits & SLA */}
          <div className="lg:col-span-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800 dark:text-slate-200">
              Limites &amp; Parâmetros Operacionais
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Rate Limit (Geral):</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                  10 req / segundo
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Timeout por Motor:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                  3.500 ms
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Disponibilidade SLA:</span>
                <span className="font-bold font-mono text-emerald-500">
                  99.9% Contratual
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Formato de Resposta:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                  JSON UTF-8
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
              * Para contratar lotes de alta volumetria (acima de 100 req/s), contate o
              gerente da sua conta corporativa.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: API KEYS */}
      {activeTab === 'keys' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Chaves de API Corporativas
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Credenciais de autorização Bearer para chamadas aos motores do DROPE.
              </p>
            </div>
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Gerar Nova Chave</span>
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <KeyRound className="w-4 h-4 text-blue-500" />
                    <span>{key.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase ${
                        key.environment === 'production'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300'
                      }`}
                    >
                      {key.environment}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                    <span>Token: {key.prefix}</span>
                    <span>·</span>
                    <span>Criada em: {key.createdAt}</span>
                    <span>·</span>
                    <span>Último uso: {key.lastUsedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {key.status === 'active' ? (
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="px-3 py-1.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-200 dark:border-rose-900 transition-colors"
                    >
                      Revogar Chave
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono font-bold text-rose-500">
                      REVOGADA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SANDBOX TEST CONSOLE */}
      {activeTab === 'sandbox' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Console de Testes Interativo (Sandbox)
            </h2>
            <p className="text-xs text-slate-500">
              Envie requisições de teste em tempo real sem afetar seu saldo de créditos de produção.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Request Box */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Endpoint:</span>
                <select
                  value={sandboxEndpoint}
                  onChange={(e) => setSandboxEndpoint(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                >
                  <option value="/v1/search/cnpj">POST /v1/search/cnpj</option>
                  <option value="/v1/validate/cadastral">POST /v1/validate/cadastral</option>
                  <option value="/v1/search/vehicle">POST /v1/search/vehicle</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">Payload JSON:</label>
                <textarea
                  rows={8}
                  value={sandboxPayload}
                  onChange={(e) => setSandboxPayload(e.target.value)}
                  className="w-full p-3 font-mono text-xs rounded-lg bg-slate-950 text-slate-200 border border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleRunSandbox}
                disabled={isSandboxRunning}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSandboxRunning ? 'Executando Teste...' : 'Disparar Chamada de Teste'}</span>
              </button>
            </div>

            {/* Response Box */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Resposta do Servidor:</label>
              <div className="w-full h-[235px] p-3 font-mono text-xs rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 overflow-y-auto">
                {sandboxResponse ? (
                  <pre>{sandboxResponse}</pre>
                ) : (
                  <span className="text-slate-500">
                    Clique em "Disparar Chamada de Teste" para visualizar o retorno da API.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Configuração de Notificações via Webhook
            </h2>
            <p className="text-xs text-slate-500">
              Receba eventos em tempo real quando uma consulta assíncrona for concluída.
            </p>
          </div>

          <div className="space-y-4 max-w-xl text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Endpoint URL de Escuta (HTTPS Obrigatório)
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Eventos Assinados:
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <code>query.completed</code> — Consulta normalizada com sucesso
                </label>
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <code>divergence.detected</code> — Divergência cadastral crítica encontrada
                </label>
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <code>credits.threshold_warning</code> — Saldo abaixo de 20% da cota mensal
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setWebhookSaved(true);
                showToast('Configurações de Webhook salvas com sucesso!', 'success');
              }}
              className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm"
            >
              Salvar Alterações de Webhook
            </button>
          </div>
        </div>
      )}

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Gerar Nova Chave de API
            </h3>

            <form onSubmit={handleCreateKey} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Identificador / Nome do Sistema
                </label>
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Ex: ERP Protheus Faturamento"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Ambiente
                </label>
                <select
                  value={newKeyEnv}
                  onChange={(e) => setNewKeyEnv(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="production">Produção (Consome créditos reais)</option>
                  <option value="sandbox">Sandbox (Ambiente de testes gratuito)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewKeyModal(false)}
                  className="w-1/2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Gerar Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
