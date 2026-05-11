import { cpuMemoryStressTestPath } from '../../routes/paths';
import type { DownloadDescription, ProjectDetailConfig } from '../../types/navigation';

export const cpuMemoryStressTestConfig: ProjectDetailConfig = {
  title: 'CPUMemoryStressTest',
  path: cpuMemoryStressTestPath,
  assetPath: '/assets/cpu-memory-stress-test',
  fallbackTech: ['C++20', 'WinAPI', 'STL', 'JSON CLI'],
};

export const downloadDescriptions: Record<string, DownloadDescription> = {
    'Release Download': {
      title: 'Release v1.0.0',
      description: '배포 버전 및 변경 이력 확인',
      buttonText: 'Release',
    },
    'Windows x64 ZIP': {
      title: 'Windows x64 ZIP',
      description: 'Windows x64 실행 파일 압축본',
      buttonText: 'ZIP Download',
    },
  };
export const runModes = [
    {
      title: 'User 대화형',
      command: 'CPUMemoryStressTestCpp.exe',
      image: 'interactive-mode.png',
      description: '질문 기반 입력으로 전체 테스트 순차 실행',
    },
    {
      title: 'Shell',
      command: 'CPUMemoryStressTestCpp.exe shell',
      image: 'shell-mode.png',
      description: '전용 프롬프트에서 여러 테스트 명령 반복 실행',
    },
    {
      title: 'CLI',
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      image: 'cli-mode.png',
      description: '단일 명령으로 실행하고 JSON 결과와 exit code 반환',
    },
  ];
export const commandExamples = [
    {
      command: 'CPUMemoryStressTestCpp.exe list',
      purpose: '테스트 목록 확인',
      image: 'cli-list.gif?v=full-list-1',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      purpose: '메모리 테스트 quick 실행',
      image: 'cli-memory.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.prime.parallel --preset quick',
      purpose: 'CPU 병렬 테스트 quick 실행',
      image: 'cli-prime.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick --save-csv --csv-dir C:\\Csv',
      purpose: 'JSON 출력과 CSV 저장',
      image: 'cli-csv.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.foo --preset quick',
      purpose: '잘못된 ID의 오류 응답 확인',
      image: 'cli-invalid.png',
    },
  ];
export const commandReferenceRows = [
    {
      name: 'Shell',
      command: 'list / run memory --preset quick / exit',
      description: '전용 프롬프트에서 실행 파일명 없이 명령 입력',
    },
    {
      name: 'CLI',
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      description: '실행 파일 뒤에 명령을 전달해 JSON 결과와 exit code 수집',
    },
    {
      name: 'list',
      command: 'CPUMemoryStressTestCpp.exe list',
      description: '등록된 테스트 ID 확인',
    },
    {
      name: '--preset',
      command: '--preset quick | normal | heavy | extreme',
      description: '테스트 부하 수준 선택',
    },
    {
      name: '--repeat',
      command: '--repeat 3',
      description: '동일 테스트 반복 실행 횟수 지정',
    },
    {
      name: '--save-csv',
      command: '--save-csv [--csv-dir C:\\Csv]',
      description: 'CSV 저장 활성화 및 저장 경로 지정',
    },
  ];
export const savedResultExamples = [
    {
      fileName: 'SingleArrayMath.txt',
      testName: '단일 배열 수학 계산',
      image: 'txt-single-array-math.png',
    },
    {
      fileName: 'ParallelArrayMath.txt',
      testName: '병렬 배열 수학 계산',
      image: 'txt-parallel-array-math.png',
    },
    {
      fileName: 'SingleRecursive.txt',
      testName: '단일 재귀 피보나치',
      image: 'txt-single-recursive.png',
    },
    {
      fileName: 'ParallelRecursive.txt',
      testName: '병렬 재귀 피보나치',
      image: 'txt-parallel-recursive.png',
    },
    {
      fileName: 'SinglePrime.txt',
      testName: '단일 소수 찾기',
      image: 'txt-single-prime.png',
    },
    {
      fileName: 'ParallelPrime.txt',
      testName: '병렬 소수 찾기',
      image: 'txt-parallel-prime.png',
    },
    {
      fileName: 'SingleSort.txt',
      testName: '단일 배열 정렬',
      image: 'txt-single-sort.png',
    },
    {
      fileName: 'ParallelSort.txt',
      testName: '병렬 배열 정렬 및 병합',
      image: 'txt-parallel-sort.png',
    },
    {
      fileName: 'SingleMandelbrot.txt',
      testName: '단일 Mandelbrot 계산',
      image: 'txt-single-mandelbrot.png',
    },
    {
      fileName: 'ParallelMandelbrot.txt',
      testName: '병렬 Mandelbrot 계산',
      image: 'txt-parallel-mandelbrot.png',
    },
    {
      fileName: 'Memory.txt',
      testName: '메모리 테스트',
      image: 'txt-memory.png',
    },
  ];
export const savedResultCaptureVersion = 'txt-window-uniform-2';
