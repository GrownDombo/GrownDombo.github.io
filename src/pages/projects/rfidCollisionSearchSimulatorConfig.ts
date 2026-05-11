import { rfidCollisionSearchSimulatorPath } from '../../routes/paths';
import type { DownloadDescription, ProjectDetailConfig } from '../../types/navigation';

export const rfidCollisionSearchSimulatorConfig: ProjectDetailConfig = {
  title: 'RFID Collision Search Simulator',
  path: rfidCollisionSearchSimulatorPath,
  assetPath: '/assets/rfid-collision-search-simulator',
  fallbackTech: ['C++', 'STL', 'Visual Studio 2022'],
};

export const downloadDescriptions: Record<string, DownloadDescription> = {

    'Windows x64 EXE': {
      title: 'Windows x64 EXE',
      description: 'RFID 충돌 탐색 시뮬레이션 실행 파일',
      buttonText: 'Download',
    },
  };
export const searchStates = [
    {
      state: 'Empty',
      description: '현재 Prefix와 일치하는 TAG가 없는 종료 상태',
    },
    {
      state: 'Success',
      description: '단일 TAG 응답으로 식별에 성공한 상태',
    },
    {
      state: 'Collision',
      description: '복수 TAG 응답으로 하위 Prefix 탐색이 필요한 상태',
    },
  ];
export const comparisonRows = [
    { label: '발견 Tag 동일 여부', recursive: '동일', iterative: '동일' },
    { label: '질의 횟수', recursive: '11', iterative: '11' },
    { label: '충돌 횟수', recursive: '5', iterative: '5' },
    { label: '실행 시간', recursive: '11.100 us', iterative: '9.000 us' },
    { label: '탐색 방식', recursive: '함수 호출로 하위 Prefix 탐색', iterative: 'Stack으로 탐색 대상 Prefix 관리' },
  ];
