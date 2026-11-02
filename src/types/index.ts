export type UserRole = 'admin' | 'senior_analyst' | 'operator' | 'auditor';

export type ViewType = 
  | 'landing'
  | 'login'
  | 'onboarding'
  | 'dashboard'
  | 'search'
  | 'result'
  | 'history'
  | 'reports'
  | 'credits'
  | 'integrations'
  | 'organization'
  | 'settings'
  | 'admin';

export type QueryCategory = 
  | 'cnpj'
  | 'validation'
  | 'vehicle'
  | 'contracts'
  | 'cnd_sanctions';

export interface QueryCategoryInfo {
  id: QueryCategory;
  name: string;
  description: string;
  creditCost: number;
  iconName: string;
  fields: {
    name: string;
    label: string;
    placeholder: string;
    mask?: string;
    helperText?: string;
  }[];
}

export interface LegalPurpose {
  id: string;
  code: string;
  name: string;
  legalBasis: string;
  description: string;
}

export interface QueryRecord {
  id: string; // e.g. DRP-2026-89412
  timestamp: string;
  category: QueryCategory;
  categoryLabel: string;
  parameter: string;
  parameterLabel: string;
  engine: string;
  creditsCost: number;
  status: 'completed' | 'divergence_detected' | 'not_found' | 'error';
  statusLabel: string;
  userName: string;
  userRole: string;
  legalPurpose: string;
  integrityHash: string;
  resultData?: any;
}

export interface CompanyResultData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  statusCadastral: 'ATIVA' | 'INAPTA' | 'SUSPENSA' | 'BAIXADA';
  dataAbertura: string;
  cnaePrincipal: {
    codigo: string;
    descricao: string;
  };
  cnaesSecundarios: string[];
  naturezaJuridica: string;
  capitalSocial: number;
  porte: string;
  regimeTributario: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  socios: {
    nome: string;
    cargo: string;
    documentoMascarado: string;
    participacao: string;
    entrada: string;
  }[];
  divergencias: {
    tipo: 'alerta' | 'critica' | 'informativa';
    titulo: string;
    descricao: string;
    fonte: string;
  }[];
  scoreConfiabilidade: number; // 0 - 100
  certidoes: {
    orgao: string;
    status: 'REGULAR' | 'PENDENCIA' | 'EXPIRADA';
    validade: string;
  }[];
}

export interface VehicleResultData {
  placa: string;
  chassiMascarado: string;
  renavamMascarado: string;
  marcaModelo: string;
  anoFabricacaoModelo: string;
  cor: string;
  combustivel: string;
  municipioEmplacamento: string;
  uf: string;
  situacaoVeiculo: 'REGULAR' | 'RESTRICAO' | 'ROUBO_FURTO';
  restricoesFinanceiras: string;
  gravame: string;
  debitos: {
    tipo: string;
    valor: number;
    anoExercicio: string;
    status: 'QUITADO' | 'PENDENTE';
  }[];
  scoreConsistencia: number;
}

export interface PersonValidationResultData {
  cpfMascarado: string;
  nomeCompleto: string;
  situacaoCpf: 'REGULAR' | 'SUSPENSA' | 'CANCELADA';
  dataNascimentoMascarada: string;
  nomeMaeMascarado: string;
  obitoRegistrado: boolean;
  scoreConsistenciaCadastral: number;
  indicesPep: boolean; // Pessoa Politicamente Exposta
  sancoesOFAC_CGU: boolean;
  divergencias: {
    campo: string;
    status: 'CONFERE' | 'DIVERGENTE';
    detalhe: string;
  }[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string;
  status: 'active' | 'revoked';
  environment: 'production' | 'sandbox';
  allowedIps?: string;
}

export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'invited' | 'suspended';
  monthlyCreditLimit: number;
  creditsUsedThisMonth: number;
  lastAccess: string;
}

export interface PlanItem {
  id: string;
  name: string;
  targetAudience: string;
  monthlyCredits: number;
  priceMonthly: number;
  priceAnnualMonthlyEquivalent: number;
  features: string[];
  isPopular?: boolean;
}

export interface DataEngineStatus {
  id: string;
  name: string;
  provider: string;
  category: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime90d: number;
  avgLatencyMs: number;
  costPerQueryUsdOrBrl: string;
  lastIncident?: string;
}

export interface ComplianceAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  action: string;
  category: string;
  legalPurpose: string;
  parameterQueried: string;
  ipAddress: string;
  resultStatus: string;
  anomalyDetected: boolean;
}
