import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewType,
  QueryRecord,
  OrganizationMember,
  ApiKeyItem,
  DataEngineStatus,
  ComplianceAuditLog,
} from '../types';
import {
  INITIAL_QUERY_HISTORY,
  INITIAL_MEMBERS,
  INITIAL_API_KEYS,
  DATA_ENGINES,
  INITIAL_AUDIT_LOGS,
  SAMPLE_COMPANY_TECHSOLUTIONS,
  SAMPLE_VEHICLE_DATA,
  SAMPLE_PERSON_VALIDATION,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  creditsBalance: number;
  addCredits: (amount: number, reason?: string) => void;
  queryHistory: QueryRecord[];
  activeQuery: QueryRecord | null;
  setActiveQuery: (record: QueryRecord | null) => void;
  inspectRecord: (record: QueryRecord) => void;
  executeQuery: (
    category: string,
    parameter: string,
    legalPurposeId: string,
    cost: number
  ) => Promise<boolean>;
  members: OrganizationMember[];
  addMember: (member: Omit<OrganizationMember, 'id' | 'creditsUsedThisMonth' | 'lastAccess'>) => void;
  apiKeys: ApiKeyItem[];
  addApiKey: (name: string, env: 'production' | 'sandbox') => void;
  revokeApiKey: (id: string) => void;
  engines: DataEngineStatus[];
  auditLogs: ComplianceAuditLog[];
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  privacyMaskEnabled: boolean;
  setPrivacyMaskEnabled: (val: boolean) => void;
  isSearching: boolean;
  organizationName: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [creditsBalance, setCreditsBalance] = useState<number>(1840);
  const [queryHistory, setQueryHistory] = useState<QueryRecord[]>(INITIAL_QUERY_HISTORY);
  const [activeQuery, setActiveQuery] = useState<QueryRecord | null>(INITIAL_QUERY_HISTORY[0]);
  const [members, setMembers] = useState<OrganizationMember[]>(INITIAL_MEMBERS);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(INITIAL_API_KEYS);
  const [engines] = useState<DataEngineStatus[]>(DATA_ENGINES);
  const [auditLogs, setAuditLogs] = useState<ComplianceAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [privacyMaskEnabled, setPrivacyMaskEnabled] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const organizationName = 'Nexus Finanças & Inteligência S/A';

  // Manage dark mode on html tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addCredits = (amount: number, reason: string = 'Recarga Avulsa de Créditos') => {
    setCreditsBalance((prev) => prev + amount);
    showToast(`+${amount.toLocaleString('pt-BR')} créditos adicionados com sucesso!`, 'success');
  };

  const inspectRecord = (record: QueryRecord) => {
    setActiveQuery(record);
    setCurrentView('result');
  };

  const executeQuery = async (
    category: string,
    parameter: string,
    legalPurposeId: string,
    cost: number
  ): Promise<boolean> => {
    if (creditsBalance < cost) {
      showToast('Saldo insuficiente de créditos para esta consulta. Recarregue seu plano.', 'error');
      return false;
    }

    setIsSearching(true);
    // Simulate real network validation and engine response normalization
    await new Promise((resolve) => setTimeout(resolve, 850));

    let simulatedResult: any = SAMPLE_COMPANY_TECHSOLUTIONS;
    let categoryLabel = 'Empresas e CNPJ';
    let engineUsed = 'Conector RFB + Sintegra Pro';

    if (category === 'vehicle') {
      simulatedResult = SAMPLE_VEHICLE_DATA;
      categoryLabel = 'Veículos e Frotas';
      engineUsed = 'Conector Senatran + Renavam Live';
    } else if (category === 'validation') {
      simulatedResult = SAMPLE_PERSON_VALIDATION;
      categoryLabel = 'Validação Cadastral';
      engineUsed = 'Validador Cadastral Unificado';
    } else if (category === 'contracts') {
      simulatedResult = {
        ...SAMPLE_COMPANY_TECHSOLUTIONS,
        cartoriosConsultados: 14,
        protestosEncontrados: 0,
        situacaoGeral: 'Nenhum protesto ativo registrado nos últimos 5 anos',
      };
      categoryLabel = 'Contratos e Registros';
      engineUsed = 'Cartórios Integrados BR';
    } else if (category === 'cnd_sanctions') {
      simulatedResult = {
        ...SAMPLE_COMPANY_TECHSOLUTIONS,
        scoreCompliance: 99,
        ceisCnepStatus: 'NENHUMA SANCAO ENCONTRADA',
        processosAtivos: 0,
      };
      categoryLabel = 'CNDs e Sanções';
      engineUsed = 'Tribunais & CEIS/CNEP Hub';
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `DRP-2026-${randomNum}`;
    const hashRandom = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newRecord: QueryRecord = {
      id: newId,
      timestamp: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      category: category as any,
      categoryLabel,
      parameter,
      parameterLabel: parameter.includes('/') ? simulatedResult.razaoSocial || parameter : parameter,
      engine: engineUsed,
      creditsCost: cost,
      status: 'completed',
      statusLabel: 'Concluída',
      userName: 'Carlos Prado',
      userRole: 'Analista de Risco',
      legalPurpose: legalPurposeId,
      integrityHash: hashRandom,
      resultData: simulatedResult,
    };

    // Deduct credits
    setCreditsBalance((prev) => prev - cost);

    // Save to history
    setQueryHistory((prev) => [newRecord, ...prev]);

    // Log to compliance
    const newAuditLog: ComplianceAuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      userId: 'usr_2',
      userName: 'Carlos Prado',
      organizationId: 'org_nexus',
      organizationName,
      action: `CONSULTA_${category.toUpperCase()}`,
      category: categoryLabel,
      legalPurpose: legalPurposeId,
      parameterQueried: parameter,
      ipAddress: '177.136.24.12',
      resultStatus: 'SUCESSO_REGULAR',
      anomalyDetected: false,
    };
    setAuditLogs((prev) => [newAuditLog, ...prev]);

    setActiveQuery(newRecord);
    setIsSearching(false);
    setCurrentView('result');
    showToast(`Consulta realizada com sucesso! ID: ${newId} (-${cost} créditos)`, 'success');
    return true;
  };

  const addMember = (
    member: Omit<OrganizationMember, 'id' | 'creditsUsedThisMonth' | 'lastAccess'>
  ) => {
    const newMember: OrganizationMember = {
      ...member,
      id: `usr_${Date.now()}`,
      creditsUsedThisMonth: 0,
      lastAccess: 'Convite pendente',
    };
    setMembers((prev) => [...prev, newMember]);
    showToast(`Convite enviado com sucesso para ${member.email}!`, 'success');
  };

  const addApiKey = (name: string, env: 'production' | 'sandbox') => {
    const prefix = env === 'production' ? 'drp_live_' : 'drp_test_';
    const randomHex = Math.random().toString(36).substring(2, 8);
    const newKey: ApiKeyItem = {
      id: `key_${Date.now()}`,
      name,
      prefix: `${prefix}${randomHex}...${Math.random().toString(36).substring(2, 5)}`,
      createdAt: 'Hoje',
      lastUsedAt: 'Nunca utilizada',
      status: 'active',
      environment: env,
    };
    setApiKeys((prev) => [...prev, newKey]);
    showToast(`Chave de integração "${name}" gerada com sucesso!`, 'success');
  };

  const revokeApiKey = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'revoked' } : k))
    );
    showToast('Chave de API revogada com sucesso.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
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
        queryHistory,
        activeQuery,
        setActiveQuery,
        inspectRecord,
        executeQuery,
        members,
        addMember,
        apiKeys,
        addApiKey,
        revokeApiKey,
        engines,
        auditLogs,
        toasts,
        showToast,
        removeToast,
        privacyMaskEnabled,
        setPrivacyMaskEnabled,
        isSearching,
        organizationName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
