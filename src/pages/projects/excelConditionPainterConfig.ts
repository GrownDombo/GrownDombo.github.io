import { excelConditionPainterPath } from '../../routes/paths';
import type { DownloadDescription, ProjectDetailConfig } from '../../types/navigation';

export const excelConditionPainterConfig: ProjectDetailConfig = {
  title: 'ExcelConditionPainter',
  path: excelConditionPainterPath,
  assetPath: '/assets/excel-condition-painter',
  fallbackTech: ['C#', 'WinForms', 'ClosedXML'],
};

export const downloadDescriptions: Record<string, DownloadDescription> = {
    'Sample Data': {
      title: 'Sample Data',
      description: '조건 설정과 Export 흐름 검증에 사용하는 주문 데이터 샘플 파일',
    },
    'Release Download': {
      title: 'Setup',
      description: 'Windows 실행 파일 또는 설치 패키지 확인용 GitHub Releases 페이지',
    },
  };
