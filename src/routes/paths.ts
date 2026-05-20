export const resumePath = '/resume';
export const careerPath = '/career';
export const excelConditionPainterPath = '/projects/excel-condition-painter';
export const cpuMemoryStressTestPath = '/projects/cpu-memory-stress-test';
export const rfidCollisionSearchSimulatorPath = '/projects/rfid-collision-search-simulator';
export const workCaseRootPath = '/work';
export const legacyIndustrialAoiPlatformPath = '/projects/industrial-aoi-platform';
export const industrialAoiInspectionAutomationPath = '/work/gerber-part-roi-matching-optimization';
export const industrialAoiHotKeyOptimizationPath = '/work/hotkey-ux-ui-response-optimization';
export const industrialAoiProductionIntegrationPath = '/work/mes-secs-gem-data-flow';
export const industrialAoiOperationFlowPath = '/work/remote-shared-folder-io-bottleneck';
export const industrialAoiBridgePolygonVisualizationPath = '/work/defect-polygon-visualization-standardization';
export const industrialAoiDefectHistoryDataLayerPath = '/work/defect-history-data-layer';
export const legacyIndustrialAoiBridgePolygonVisualizationPath = '/work/bridge-defect-polygon-visualization';
export const legacyIndustrialAoiBridgePolygonVisualizationProjectPath =
  '/projects/industrial-aoi-platform/bridge-defect-polygon-visualization';
export const legacyIndustrialAoiBridgePolygonAreaProjectPath =
  '/projects/industrial-aoi-platform/bridge-polygon-visualization';
export const legacyIndustrialAoiOperationFlowPath = '/work/repair-ng-buffer-operations';
export const legacyIndustrialAoiOperationFlowProjectPath =
  '/projects/industrial-aoi-platform/repair-ng-buffer-operations';

export type IndustrialAoiAreaId =
  | 'inspection-automation'
  | 'hotkey-optimization'
  | 'production-integration'
  | 'operation-flow'
  | 'bridge-polygon-visualization'
  | 'defect-history-data-layer';

export const industrialAoiAreaRoutes: Record<IndustrialAoiAreaId, string> = {
  'inspection-automation': industrialAoiInspectionAutomationPath,
  'hotkey-optimization': industrialAoiHotKeyOptimizationPath,
  'production-integration': industrialAoiProductionIntegrationPath,
  'operation-flow': industrialAoiOperationFlowPath,
  'bridge-polygon-visualization': industrialAoiBridgePolygonVisualizationPath,
  'defect-history-data-layer': industrialAoiDefectHistoryDataLayerPath,
};

export const industrialAoiRouteAreaIds: Record<string, IndustrialAoiAreaId> = {
  [industrialAoiInspectionAutomationPath]: 'inspection-automation',
  [industrialAoiHotKeyOptimizationPath]: 'hotkey-optimization',
  [industrialAoiProductionIntegrationPath]: 'production-integration',
  [industrialAoiOperationFlowPath]: 'operation-flow',
  [industrialAoiBridgePolygonVisualizationPath]: 'bridge-polygon-visualization',
  [industrialAoiDefectHistoryDataLayerPath]: 'defect-history-data-layer',
  '/projects/industrial-aoi-platform/gerber-part-roi-matching-optimization': 'inspection-automation',
  '/projects/industrial-aoi-platform/hotkey-ux-ui-response-optimization': 'hotkey-optimization',
  '/projects/industrial-aoi-platform/mes-secs-gem-data-flow': 'production-integration',
  '/projects/industrial-aoi-platform/defect-polygon-visualization-standardization': 'bridge-polygon-visualization',
  '/projects/industrial-aoi-platform/defect-history-data-layer': 'defect-history-data-layer',
  '/projects/industrial-aoi-platform/inspection-automation': 'inspection-automation',
  '/projects/industrial-aoi-platform/hotkey-optimization': 'hotkey-optimization',
  '/projects/industrial-aoi-platform/production-integration': 'production-integration',
  '/projects/industrial-aoi-platform/operation-flow': 'operation-flow',
};
