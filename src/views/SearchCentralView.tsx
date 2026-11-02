import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Building2,
  ShieldCheck,
  Car,
  FileCheck,
  Scale,
  Coins,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react';
import { QUERY_CATEGORIES, LEGAL_PURPOSES } from '../data/mockData';
import { QueryCategory } from '../types';

export const SearchCentralView: React.FC = () => {
  const { executeQuery, creditsBalance, isSearching, setCurrentView } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<QueryCategory>('cnpj');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('credito');
  const [searchParam, setSearchParam] = useState<string>('38.412.980/0001-72');
  const [auxiliaryParam, setAuxiliaryParam] = useState<string>('');
  const [querySimulationMode, setQuerySimulationMode] = useState<
    'normal' | 'not_found' | 'motor_unavail'
  >('normal');

  const currentCategoryInfo =
    QUERY_CATEGORIES.find((c) => c.id === selectedCategory) || QUERY_CATEGORIES[0];

  const handleCategorySelect = (catId: QueryCategory) => {
    setSelectedCategory(catId);
    if (catId === 'cnpj') {
      setSearchParam('38.412.980/0001-72');
    } else if (catId === 'validation') {
      setSearchParam('***.814.398-**');
      setAuxiliaryParam('Fernando Henrique Moreira');
    } else if (catId === 'vehicle') {
      setSearchParam('DRP-9A42');
      setAuxiliaryParam('01298492012');
    } else if (catId === 'contracts') {
      setSearchParam('04.189.771/0001-80');
      setAuxiliaryParam('SP');
    } else if (catId === 'cnd_sanctions') {
      setSearchParam('38.412.980/0001-72');
    }
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParam.trim()) return;

    await executeQuery(
      selectedCategory,
      searchParam,
      selectedPurpose,
      currentCategoryInfo.creditCost
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Central de Consultas Inteligentes
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Selecione a categoria pretendida, informe os parâmetros autorizados e declare
          a finalidade legal vinculada nos termos da LGPD.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {QUERY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.id === 'cnpj' && <Building2 className="w-4 h-4" />}
                  {cat.id === 'validation' && <ShieldCheck className="w-4 h-4" />}
                  {cat.id === 'vehicle' && <Car className="w-4 h-4" />}
                  {cat.id === 'contracts' && <FileCheck className="w-4 h-4" />}
                  {cat.id === 'cnd_sanctions' && <Scale className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {cat.creditCost} cr
                </span>
              </div>

              <div>
                <span className="text-xs font-bold block">{cat.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {cat.fields[0].label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Form Container */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
        <form onSubmit={handleExecute} className="space-y-6">
          {/* Section 1: Parameters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span>Parâmetros da Consulta — {currentCategoryInfo.name}</span>
              </label>

              {/* Sample Preload helpers */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px] hidden sm:inline">Exemplos:</span>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedCategory === 'cnpj') setSearchParam('38.412.980/0001-72');
                    if (selectedCategory === 'vehicle') setSearchParam('DRP-9A42');
                    if (selectedCategory === 'validation') setSearchParam('***.814.398-**');
                    if (selectedCategory === 'contracts') setSearchParam('04.189.771/0001-80');
                    if (selectedCategory === 'cnd_sanctions') setSearchParam('38.412.980/0001-72');
                  }}
                  className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Preencher Amostra Válida
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    required
                    placeholder={currentCategoryInfo.fields[0].placeholder}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                {currentCategoryInfo.fields[0].helperText && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    {currentCategoryInfo.fields[0].helperText}
                  </p>
                )}
              </div>

              {currentCategoryInfo.fields.length > 1 && (
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={auxiliaryParam}
                    onChange={(e) => setAuxiliaryParam(e.target.value)}
                    placeholder={currentCategoryInfo.fields[1].placeholder}
                    className="w-full px-3 py-2.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Mandatory LGPD Legal Purpose */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Declaração de Finalidade Legal (LGPD Obrigatória)</span>
              </label>
              <span className="text-[10px] text-slate-500">
                Registrado para fins de auditoria
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {LEGAL_PURPOSES.map((lp) => {
                const isSelected = selectedPurpose === lp.id;
                return (
                  <div
                    key={lp.id}
                    onClick={() => setSelectedPurpose(lp.id)}
                    className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-950 dark:text-blue-100'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="truncate">{lp.name}</span>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 shrink-0">
                        {lp.code.split(' ')[1] || lp.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {lp.legalBasis}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Cost and Execution Bar */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-500 dark:text-slate-400">Custo da Consulta:</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">
                  {currentCategoryInfo.creditCost} créditos
                </span>
              </div>
              <div className="text-slate-500">
                Saldo após consulta:{' '}
                <span className="font-mono font-semibold">
                  {(creditsBalance - currentCategoryInfo.creditCost).toLocaleString('pt-BR')} cr
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Conectando e Normalizando Resposta...</span>
                </>
              ) : (
                <>
                  <span>Executar Consulta Autorizada</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Query Engine Health Indicator Strip */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            Motor selecionado para esta categoria:{' '}
            <strong className="text-slate-800 dark:text-slate-200">
              {selectedCategory === 'cnpj' && 'Conector RFB + Sintegra Pro (Latência: 310ms)'}
              {selectedCategory === 'vehicle' && 'Conector Senatran + Renavam Live (Latência: 440ms)'}
              {selectedCategory === 'validation' && 'Validador Cadastral Unificado (Latência: 195ms)'}
              {selectedCategory === 'contracts' && 'Cartórios Integrados BR (Latência: 1250ms)'}
              {selectedCategory === 'cnd_sanctions' && 'Tribunais & CEIS/CNEP Hub (Latência: 580ms)'}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Conexão Criptografada TLS 1.3</span>
        </div>
      </div>
    </div>
  );
};
