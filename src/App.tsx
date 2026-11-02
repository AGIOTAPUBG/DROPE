import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/Toast';
import { LandingPage } from './views/LandingPage';
import { LoginView } from './views/LoginView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { SearchCentralView } from './views/SearchCentralView';
import { QueryResultView } from './views/QueryResultView';
import { HistoryView } from './views/HistoryView';
import { ReportsView } from './views/ReportsView';
import { CreditsPlansView } from './views/CreditsPlansView';
import { IntegrationsView } from './views/IntegrationsView';
import { OrganizationView } from './views/OrganizationView';
import { SettingsView } from './views/SettingsView';
import { AdminPanelView } from './views/AdminPanelView';

const MainLayout: React.FC = () => {
  const { currentView, isAuthenticated } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If in public views (Landing, Login, Onboarding) and not authenticated
  const isPublicView =
    !isAuthenticated &&
    (currentView === 'landing' || currentView === 'login' || currentView === 'onboarding');

  if (isPublicView) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          {currentView === 'landing' && <LandingPage />}
          {currentView === 'login' && <LoginView />}
          {currentView === 'onboarding' && <OnboardingView />}
        </main>
      </div>
    );
  }

  // Logged-in SaaS App Layout (Sidebar + Top Header + Main Content)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors font-sans">
      {/* Permanent Navigation Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <Header
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          mobileSidebarOpen={mobileSidebarOpen}
        />

        {/* Viewport Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'search' && <SearchCentralView />}
          {currentView === 'result' && <QueryResultView />}
          {currentView === 'history' && <HistoryView />}
          {currentView === 'reports' && <ReportsView />}
          {currentView === 'credits' && <CreditsPlansView />}
          {currentView === 'integrations' && <IntegrationsView />}
          {currentView === 'organization' && <OrganizationView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'admin' && <AdminPanelView />}
          {/* Fallback if user navigates to public route while logged in */}
          {currentView === 'landing' && <LandingPage />}
          {currentView === 'login' && <DashboardView />}
          {currentView === 'onboarding' && <OrganizationView />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
      <ToastContainer />
    </AppProvider>
  );
}
