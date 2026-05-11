import { Navigate, Route, Routes } from 'react-router';
import { useAnchorScroll } from './hooks/useAnchorScroll';
import { useInternalNavigation } from './hooks/useInternalNavigation';
import { usePageAnalytics } from './hooks/usePageAnalytics';
import { useThemeMode } from './hooks/useThemeMode';
import { useTrackedLinkClicks } from './hooks/useTrackedLinkClicks';
import { PortfolioHome } from './pages/PortfolioHome';
import { ResumePage } from './pages/ResumePage';
import { CPUMemoryStressTestProjectPage } from './pages/projects/CPUMemoryStressTestProjectPage';
import { ExcelConditionPainterProjectPage } from './pages/projects/ExcelConditionPainterProjectPage';
import { IndustrialAOIPlatformProjectPage } from './pages/projects/IndustrialAOIPlatformProjectPage';
import { RFIDCollisionSearchSimulatorProjectPage } from './pages/projects/RFIDCollisionSearchSimulatorProjectPage';
import {
  cpuMemoryStressTestPath,
  excelConditionPainterPath,
  industrialAoiRouteAreaIds,
  legacyIndustrialAoiPlatformPath,
  resumePath,
  rfidCollisionSearchSimulatorPath,
  workCaseRootPath,
} from './routes/paths';
import type { ThemedPageProps } from './types/navigation';

function App() {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const onNavigate = useInternalNavigation();
  const themedPageProps: ThemedPageProps = {
    onNavigate,
    themeMode,
    onThemeToggle: toggleThemeMode,
  };

  usePageAnalytics();
  useTrackedLinkClicks();
  useAnchorScroll();

  return (
    <Routes>
      <Route index element={<PortfolioHome {...themedPageProps} />} />
      <Route path={resumePath} element={<ResumePage onNavigate={onNavigate} />} />
      <Route path={excelConditionPainterPath} element={<ExcelConditionPainterProjectPage {...themedPageProps} />} />
      <Route path={cpuMemoryStressTestPath} element={<CPUMemoryStressTestProjectPage {...themedPageProps} />} />
      <Route path={rfidCollisionSearchSimulatorPath} element={<RFIDCollisionSearchSimulatorProjectPage {...themedPageProps} />} />
      <Route path={workCaseRootPath} element={<Navigate to="/#work-cases" replace />} />
      <Route path={legacyIndustrialAoiPlatformPath} element={<Navigate to="/#work-cases" replace />} />
      {Object.entries(industrialAoiRouteAreaIds).map(([path, selectedAreaId]) => (
        <Route
          key={path}
          path={path}
          element={<IndustrialAOIPlatformProjectPage {...themedPageProps} selectedAreaId={selectedAreaId} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
