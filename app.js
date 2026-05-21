const AGENTS = [
  { id: 'project-design-lead', name: '프로젝트 설계 리더', role: '아키텍처 설계 / 태스크 분배', status: 'idle', description: '요구사항 분석 및 시스템 아키텍처 설계' },
  { id: 'designer', name: '기깔나는 디자이너', role: '비주얼 설계', status: 'done', description: '대시보드 시각 방향 및 색상 팔레트 정의' },
  { id: 'frontend-dev', name: '프론트엔드 개발', role: 'UI 구현', status: 'running', description: '대시보드 화면 및 컴포넌트 구현' },
  { id: 'backend-python', name: '백엔드/Python', role: '서버 구현', status: 'running', description: '데이터 제공 API 및 비즈니스 로직' },
  { id: 'tdd-agent', name: 'TDD 에이전트', role: '테스트 작성', status: 'idle', description: '핵심 플로우 테스트 초안 작성' },
  { id: 'code-reviewer', name: '코드 리뷰어', role: '품질 검증', status: 'done', description: '구현 빈틈, 모호성, 위험 요소 점검' },
  { id: 'observer-diagnostic', name: '관찰/진단', role: '운영 가시성', status: 'idle', description: '로그, 지표, 에러 추적 및 상태 진단' },
  { id: 'task-coordinator', name: '작업 조정', role: '흐름 조율', status: 'error', description: '병렬/순차 작업 판단 및 의존성 관리' },
  { id: 'final-checker', name: '최종 점검', role: '릴리스 점검', status: 'idle', description: '누락, 회귀, 배포 전 확인사항 점검' },
];

const TASKS = [
  { id: 't1', title: '디자인 방향 결정', summary: '대시보드 색상/분위기 정의', status: 'done', agentId: 'designer' },
  { id: 't2', title: 'API 계약 작성', summary: '데이터 명세 및 엔드포인트', status: 'in-progress', agentId: 'backend-python' },
  { id: 't3', title: '화면 구현', summary: '패널 컴포넌트 구현', status: 'in-progress', agentId: 'frontend-dev' },
  { id: 't4', title: '테스트 초안', summary: '핵심 시나리오 테스트 작성', status: 'pending', agentId: 'tdd-agent' },
  { id: 't5', title: '코드 리뷰', summary: '빈틈 및 위험 요소 점검', status: 'done', agentId: 'code-reviewer' },
  { id: 't6', title: '로그 진단', summary: '실행 로그 수집 및 분석', status: 'pending', agentId: 'observer-diagnostic' },
  { id: 't7', title: '작업 조율', summary: '병렬 실행 순서 정의', status: 'blocked', agentId: 'task-coordinator' },
  { id: 't8', title: '최종 점검', summary: '배포 전 체크리스트 확인', status: 'pending', agentId: 'final-checker' },
];

const STRATEGIES = [
  { id: 'committee', name: '위원회형', emoji: '🗳', description: '다수 에이전트가 동일 태스크에 투표/합의로 결정. 편향 감소, 처리 시간 증가.' },
  { id: 'leader', name: '리더형', emoji: '👑', description: '강한 모델이 결정하고 약한 모델이 실행. 명확한 책임 분리, 리더 병목 발생 가능.' },
  { id: 'pipeline', name: '파이프라인형', emoji: '🔗', description: '에이전트가 순서대로 결과를 다음에 인계. 단계별 검증 가능, 순차 처리 특성.' },
  { id: 'expert', name: '전문가형', emoji: '🎯', description: '도메인별 특화 모델을 배치. 정확도 높음, 라우팅 로직 필요.' },
];

const LOG_KEY = 'dashboard-logs';
const MEMO_KEY = 'dashboard-memo';
const THEME_KEY = 'dashboard-theme';

function renderAgentCards(filter = 'all') {
  const container = document.getElementById('agentCards');
  if (!container) return;
  const list = filter === 'all' ? AGENTS : AGENTS.filter((agent) => agent.status === filter);
  container.innerHTML = list.map((agent) => `
    <article class="agent-card agent-card--${agent.status}" data-state="${agent.status}">
      <div class="agent-card__info">
        <div class="agent-card__name">${agent.name}</div>
        <div class="agent-card__role">${agent.role}</div>
      </div>
      <span class="agent-badge agent-badge--${agent.status}">${agent.status}</span>
    </article>
  `).join('');
}

function renderTasks() {
  const list = document.getElementById('taskList');
  if (!list) return;
  list.innerHTML = TASKS.map((task) => {
    const agent = AGENTS.find((item) => item.id === task.agentId);
    return `
      <li class="task-item">
        <span class="task-badge task-badge--${task.status}">${task.status}</span>
        <span class="task-item__title">${task.title}</span>
        <span class="task-item__agent">${agent ? agent.name : ''}</span>
      </li>
    `;
  }).join('');
}

function renderLogs(logs) {
  const logList = document.getElementById('logList');
  if (!logList) return;
  logList.innerHTML = logs.map((log) => `
    <div class="log-item">
      <span class="log-item__time">${new Date(log.ts).toLocaleTimeString()}</span>
      <span class="log-item__msg">${log.msg}</span>
    </div>
  `).join('');
  logList.scrollTop = logList.scrollHeight;
}

function addLog(msg) {
  let logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  logs.push({ ts: Date.now(), msg });
  logs = logs.slice(-50);
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
  renderLogs(logs);
}

function loadLogsAndMemo() {
  const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  renderLogs(logs);

  const memo = localStorage.getItem(MEMO_KEY) || '';
  const memoDisplay = document.getElementById('memoDisplay');
  if (memoDisplay && memo) memoDisplay.textContent = memo;

  const memoInput = document.getElementById('memoInput');
  if (memoInput && memo) memoInput.value = memo;
}

function renderStrategies() {
  const list = document.getElementById('strategyList');
  if (!list) return;
  list.innerHTML = STRATEGIES.map((strategy) => `
    <li class="strategy-item">
      <label>
        <input type="checkbox" data-strategy="${strategy.id}">
        <span class="strategy-item__emoji">${strategy.emoji}</span>
        <span class="strategy-item__name">${strategy.name}</span>
      </label>
    </li>
  `).join('');
  list.addEventListener('change', updateStrategyDesc);
}

function updateStrategyDesc() {
  const desc = document.getElementById('strategyDesc');
  if (!desc) return;
  const checked = [...document.querySelectorAll('#strategyList input[type="checkbox"]:checked')]
    .map((checkbox) => STRATEGIES.find((strategy) => strategy.id === checkbox.dataset.strategy))
    .filter(Boolean);

  if (checked.length === 0) {
    desc.innerHTML = '<span class="strategy-desc__empty">전략을 선택하면 설명이 표시됩니다.</span>';
    return;
  }

  desc.innerHTML = checked.map((strategy) => `
    <div class="strategy-desc-item">
      <div class="strategy-desc-item__title">${strategy.emoji} ${strategy.name}</div>
      <div class="strategy-desc-item__body">${strategy.description}</div>
    </div>
  `).join('');
}

function initFilterButtons() {
  const filterBar = document.querySelector('.agent-filter');
  if (!filterBar) return;
  filterBar.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-filter]');
    if (!btn) return;
    filterBar.querySelectorAll('.agent-filter__btn').forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
    renderAgentCards(btn.dataset.filter);
  });
}

function initDarkMode() {
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    btn.textContent = '☀️ 라이트';
  }

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    if (isDark) {
      delete document.documentElement.dataset.theme;
      btn.textContent = '🌙 다크';
      localStorage.setItem(THEME_KEY, 'light');
      return;
    }

    document.documentElement.dataset.theme = 'dark';
    btn.textContent = '☀️ 라이트';
    localStorage.setItem(THEME_KEY, 'dark');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAgentCards();
  renderTasks();
  loadLogsAndMemo();
  renderStrategies();
  initFilterButtons();
  initDarkMode();

  const addLogBtn = document.getElementById('addLogBtn');
  if (addLogBtn) {
    addLogBtn.addEventListener('click', () => {
      addLog('에이전트 실행 시뮬레이션 #' + Date.now());
    });
  }

  const saveMemoBtn = document.getElementById('saveMemoBtn');
  if (saveMemoBtn) {
    saveMemoBtn.addEventListener('click', () => {
      const input = document.getElementById('memoInput');
      const display = document.getElementById('memoDisplay');
      if (!input || !display) return;
      localStorage.setItem(MEMO_KEY, input.value);
      display.textContent = input.value;
    });
  }
});
