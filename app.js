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

const TASK_STATUS_LABEL = {
  pending: '대기',
  'in-progress': '진행중',
  done: '완료',
  blocked: '차단',
};

const TASK_VIEW_STATE = {
  search: '',
  status: 'all',
  selectedTaskId: null,
};

const LOG_VIEW_STATE = {
  level: 'all',
};

const STRATEGY_STATE = {
  selected: new Set(),
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[ch]);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function getAllLogs() {
  let raw;
  try {
    raw = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  } catch (err) {
    raw = [];
  }
  if (!Array.isArray(raw)) raw = [];
  return raw.map((log) => ({
    ts: typeof log.ts === 'number' ? log.ts : Date.now(),
    msg: typeof log.msg === 'string' ? log.msg : '',
    level: log.level === 'warn' || log.level === 'error' ? log.level : 'info',
  }));
}

function getVisibleLogs() {
  const logs = getAllLogs();
  if (LOG_VIEW_STATE.level === 'all') return logs;
  return logs.filter((log) => log.level === LOG_VIEW_STATE.level);
}

function getVisibleTasks() {
  const query = TASK_VIEW_STATE.search.trim().toLowerCase();
  return TASKS.filter((task) => {
    if (TASK_VIEW_STATE.status !== 'all' && task.status !== TASK_VIEW_STATE.status) return false;
    if (!query) return true;
    const agent = AGENTS.find((item) => item.id === task.agentId);
    const haystack = [task.title, task.summary, agent ? agent.name : '']
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
}

function renderAgentCards(filter = 'all') {
  const container = document.getElementById('agentCards');
  if (!container) return;
  const list = filter === 'all' ? AGENTS : AGENTS.filter((agent) => agent.status === filter);
  container.innerHTML = list.map((agent) => `
    <article class="agent-card agent-card--${agent.status}" data-state="${agent.status}">
      <div class="agent-card__info">
        <div class="agent-card__name">${escapeHtml(agent.name)}</div>
        <div class="agent-card__role">${escapeHtml(agent.role)}</div>
      </div>
      <span class="agent-badge agent-badge--${agent.status}">${agent.status}</span>
    </article>
  `).join('');
}

function renderTasks() {
  const list = document.getElementById('taskList');
  if (!list) return;
  const visible = getVisibleTasks();

  if (visible.length === 0) {
    const isFiltering =
      TASK_VIEW_STATE.search.trim() !== '' || TASK_VIEW_STATE.status !== 'all';
    list.innerHTML = `
      <li class="empty-state" role="status">
        <span class="empty-state__icon" aria-hidden="true">${isFiltering ? '🔍' : '📭'}</span>
        <span>${isFiltering ? '조건에 맞는 작업이 없습니다.' : '작업이 없습니다.'}</span>
        ${isFiltering ? '<span class="empty-state__hint">검색어나 필터를 변경해 보세요.</span>' : ''}
      </li>
    `;
  } else {
    list.innerHTML = visible.map((task) => {
      const agent = AGENTS.find((item) => item.id === task.agentId);
      const isSelected = task.id === TASK_VIEW_STATE.selectedTaskId;
      return `
        <li
          class="task-item${isSelected ? ' selected' : ''}"
          data-task-id="${task.id}"
          role="button"
          tabindex="0"
          aria-pressed="${isSelected}"
        >
          <span class="task-badge task-badge--${task.status}">${task.status}</span>
          <span class="task-item__title">${escapeHtml(task.title)}</span>
          <span class="task-item__agent">${agent ? escapeHtml(agent.name) : ''}</span>
        </li>
      `;
    }).join('');
  }

  const selectedTask = TASK_VIEW_STATE.selectedTaskId
    ? TASKS.find((task) => task.id === TASK_VIEW_STATE.selectedTaskId)
    : null;
  renderTaskDetail(selectedTask);
}

function renderTaskDetail(task) {
  const detail = document.getElementById('taskDetail');
  if (!detail) return;
  if (!task) {
    detail.innerHTML = '<span class="task-detail__empty">작업을 선택하면 상세 정보가 표시됩니다.</span>';
    return;
  }
  const agent = AGENTS.find((item) => item.id === task.agentId);
  const statusLabel = TASK_STATUS_LABEL[task.status] || task.status;
  detail.innerHTML = `
    <div class="task-detail__title">${escapeHtml(task.title)}</div>
    <div class="task-detail__summary">${escapeHtml(task.summary)}</div>
    <div class="task-detail__meta">
      <span class="task-detail__meta-item">
        상태: <strong><span class="task-badge task-badge--${task.status}">${escapeHtml(statusLabel)}</span></strong>
      </span>
      <span class="task-detail__meta-item">
        담당: <strong>${agent ? escapeHtml(agent.name) : '미지정'}</strong>
      </span>
    </div>
  `;
}

function renderLogs(logs) {
  const logList = document.getElementById('logList');
  if (!logList) return;

  if (!logs || logs.length === 0) {
    const isFiltering = LOG_VIEW_STATE.level !== 'all';
    const allLogs = getAllLogs();
    const hasAny = allLogs.length > 0;
    let message;
    let hint;
    let icon;
    if (isFiltering && hasAny) {
      icon = '🔍';
      message = `${LOG_VIEW_STATE.level} 레벨 로그가 없습니다.`;
      hint = '다른 레벨을 선택해 보세요.';
    } else {
      icon = '📋';
      message = '로그가 없습니다.';
      hint = '+ info / + warn 버튼으로 로그를 추가해 보세요.';
    }
    logList.innerHTML = `
      <div class="empty-state" role="status">
        <span class="empty-state__icon" aria-hidden="true">${icon}</span>
        <span>${message}</span>
        <span class="empty-state__hint">${hint}</span>
      </div>
    `;
    return;
  }

  logList.innerHTML = logs.map((log) => {
    const level = log.level || 'info';
    const time = new Date(log.ts).toLocaleTimeString();
    return `
      <div class="log-item log-item--${level}">
        <span class="log-item__level">${level}</span>
        <span class="log-item__time">${escapeHtml(time)}</span>
        <span class="log-item__msg">${escapeHtml(log.msg)}</span>
      </div>
    `;
  }).join('');
  logList.scrollTop = logList.scrollHeight;
}

function addLog(msg, level = 'info') {
  let logs = getAllLogs();
  logs.push({ ts: Date.now(), msg, level });
  logs = logs.slice(-50);
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
  renderLogs(getVisibleLogs());
  renderSummary();
}

function loadLogsAndMemo() {
  renderLogs(getVisibleLogs());

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
        <span class="strategy-item__name">${escapeHtml(strategy.name)}</span>
      </label>
    </li>
  `).join('');
  list.addEventListener('change', updateStrategyDesc);
}

function updateStrategyDesc() {
  const desc = document.getElementById('strategyDesc');
  if (!desc) return;
  STRATEGY_STATE.selected = new Set(
    [...document.querySelectorAll('#strategyList input[type="checkbox"]:checked')]
      .map((checkbox) => checkbox.dataset.strategy)
  );
  const checked = STRATEGIES.filter((strategy) => STRATEGY_STATE.selected.has(strategy.id));

  if (checked.length === 0) {
    desc.innerHTML = '<span class="strategy-desc__empty">전략을 선택하면 설명이 표시됩니다.</span>';
  } else {
    desc.innerHTML = checked.map((strategy) => `
      <div class="strategy-desc-item">
        <div class="strategy-desc-item__title">${strategy.emoji} ${escapeHtml(strategy.name)}</div>
        <div class="strategy-desc-item__body">${escapeHtml(strategy.description)}</div>
      </div>
    `).join('');
  }
  renderSummary();
}

function renderSummary() {
  const agentsRunning = AGENTS.filter((agent) => agent.status === 'running').length;
  const agentsDone = AGENTS.filter((agent) => agent.status === 'done').length;
  const tasksInProgress = TASKS.filter((task) => task.status === 'in-progress').length;
  const tasksPending = TASKS.filter((task) => task.status === 'pending').length;
  const logsCount = getAllLogs().length;
  const strategiesSelected = STRATEGY_STATE.selected.size;

  setText('summaryAgents', String(AGENTS.length));
  setText('summaryAgentsMeta', `실행중 ${agentsRunning} · 완료 ${agentsDone}`);
  setText('summaryTasks', String(TASKS.length));
  setText('summaryTasksMeta', `진행중 ${tasksInProgress} · 대기 ${tasksPending}`);
  setText('summaryLogs', String(logsCount));
  setText('summaryLogsMeta', logsCount > 0 ? '최근 활동' : '활동 없음');
  setText('summaryStrategies', String(STRATEGIES.length));
  setText('summaryStrategiesMeta', `선택됨 ${strategiesSelected}`);
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

function initTaskInteractions() {
  const search = document.getElementById('taskSearch');
  if (search) {
    search.addEventListener('input', (event) => {
      TASK_VIEW_STATE.search = event.target.value;
      renderTasks();
    });
  }

  const filterBar = document.querySelector('.task-filter');
  if (filterBar) {
    filterBar.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-task-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('.task-filter__btn').forEach((button) => button.classList.remove('active'));
      btn.classList.add('active');
      TASK_VIEW_STATE.status = btn.dataset.taskFilter;
      renderTasks();
    });
  }

  const taskList = document.getElementById('taskList');
  if (taskList) {
    taskList.addEventListener('click', (event) => {
      const item = event.target.closest('.task-item[data-task-id]');
      if (!item) return;
      TASK_VIEW_STATE.selectedTaskId = item.dataset.taskId;
      renderTasks();
    });
    taskList.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const item = event.target.closest('.task-item[data-task-id]');
      if (!item) return;
      event.preventDefault();
      TASK_VIEW_STATE.selectedTaskId = item.dataset.taskId;
      renderTasks();
    });
  }
}

function initLogInteractions() {
  const filterBar = document.querySelector('.log-filter');
  if (!filterBar) return;
  filterBar.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-log-filter]');
    if (!btn) return;
    filterBar.querySelectorAll('.log-filter__btn').forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
    LOG_VIEW_STATE.level = btn.dataset.logFilter;
    renderLogs(getVisibleLogs());
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
  initTaskInteractions();
  initLogInteractions();
  initDarkMode();
  renderSummary();

  const addLogBtn = document.getElementById('addLogBtn');
  if (addLogBtn) {
    addLogBtn.addEventListener('click', () => {
      addLog('에이전트 실행 시뮬레이션 #' + Date.now(), 'info');
    });
  }

  const addWarnLogBtn = document.getElementById('addWarnLogBtn');
  if (addWarnLogBtn) {
    addWarnLogBtn.addEventListener('click', () => {
      addLog('경고 시뮬레이션 #' + Date.now(), 'warn');
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
