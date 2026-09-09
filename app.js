import { icon } from './icons.js';

const $ = (query, root = document) => root.querySelector(query);
const dialog = $('#detail-dialog');
const dialogContent = $('#dialog-content');
const composer = $('#research-question');
let currentQuestion = '';
let activeGoal = '形成研究方案';
let toastTimer;

const demos = {
  evidence: {
    category: '循证检索', title: 'GLP-1RA 能降低心血管风险吗？',
    description: '从一个临床疑问开始，把问题、文献与证据判断联系起来。',
    steps: [
      ['明确问题边界', '先确认研究人群、干预与对照，以及关注的心血管结局，形成可检索的问题。'],
      ['建立证据对照', '按研究设计整理候选文献，将结论与原文、DOI / PMID 对应，保留核验入口。'],
      ['说明分歧与适用范围', '区分人群和研究条件，呈现一致与不一致的证据，避免超出原研究范围推断。']
    ], outputs: ['检索策略', '证据矩阵', '原文对照', '适用边界说明']
  },
  paper: {
    category: '文献精读', title: '帮我精读这篇 Nature Medicine 论文',
    description: '按问题、方法、结果和局限拆解论文，理解研究如何得出结论。',
    steps: [
      ['确定阅读对象', '正式使用时提供论文全文或可访问的链接，并说明希望重点理解的部分。'],
      ['沿着研究逻辑精读', '梳理研究问题、研究设计与关键图表，将解释对应到原文位置。'],
      ['连接自己的研究', '整理可以借鉴的方法、需要谨慎理解的结论，以及值得继续追问的问题。']
    ], outputs: ['论文结构笔记', '图表解读', '方法要点', '研究启发']
  },
  topic: {
    category: '选题探索', title: '糖尿病再入院风险值得研究吗？',
    description: '先判断选题价值与可行性，再决定如何投入时间和数据。',
    steps: [
      ['厘清临床问题', '确认患者范围、再入院的定义与时间窗口，以及目前可获得的数据。'],
      ['梳理已有研究', '比较已有研究的人群、变量与结局定义，定位潜在空白和重复研究风险。'],
      ['评估可实施方向', '围绕问题价值、数据可得性与方法可行性，形成可讨论的选题方案。']
    ], outputs: ['研究现状梳理', '候选研究问题', '可行性清单', '选题建议']
  },
  design: {
    category: '研究设计', title: '术前营养和术后并发症怎么研究？',
    description: '把一个研究想法，逐步转成能够执行和复核的研究方案。',
    steps: [
      ['定义研究对象与指标', '明确手术类型、营养评估方式、并发症定义和随访窗口。'],
      ['确认设计与偏倚控制', '结合数据来源选择研究设计，讨论混杂因素与可能的选择偏倚。'],
      ['形成可执行方案', '整理纳排标准、变量表和分析计划，在关键方案确认后继续推进。']
    ], outputs: ['研究方案', '变量字典', '分析计划', '关键决策记录']
  },
  analysis: {
    category: '数据分析', title: '600 例肝癌数据怎么做生存分析？',
    description: '先确认数据与结局定义，再选择方法，保留完整的复核依据。',
    steps: [
      ['检查数据结构', '核对时间起点、结局事件与删失定义，检查缺失和异常记录。'],
      ['确认分析计划', '结合研究目标讨论生存曲线和回归方法，并明确模型假设与验证策略。'],
      ['交付可复核的结果', '将图表、方法、参数与分析记录一起整理，标注解释边界。']
    ], outputs: ['数据质控报告', '统计分析计划', '生存图表', '分析记录']
  },
  grant: {
    category: '基金评审', title: '这份国自然申请书还有哪些问题？',
    description: '从科学问题与研究假设出发，系统检查论证和技术路线。',
    steps: [
      ['梳理申请书结构', '正式使用时提供申请书，明确申报方向、项目类型与重点关注问题。'],
      ['逐项检查核心论证', '审阅科学问题、研究假设、创新性与技术路线是否相互支撑。'],
      ['形成修改优先级', '区分需要补充依据、调整设计和改善表达的问题，整理逐条修改建议。']
    ], outputs: ['结构化评审意见', '问题优先级', '修改建议', '版本对照']
  }
};

const cases = {
  grant: {
    category: '国自然基金申报', title: '肠道菌群失衡与结直肠癌术后复发机制研究',
    description: '案例方向：围绕术后复发这一临床问题，组织证据、研究假设与技术路线。',
    steps: [['证据与科学问题', '梳理前沿证据，凝练科学问题，讨论研究假设。'], ['方案与技术路线', '细化研究内容、技术路线与可行性论证。'], ['申请书评审与修改', '按评审意见调整方案，并形成修改记录。']],
    outputs: ['证据梳理', '研究方案', '申请书修改稿']
  },
  model: {
    category: '临床预测模型', title: '肝癌术后复发风险预测模型构建与验证',
    description: '案例方向：从临床队列整理出发，推进风险模型构建与验证。',
    steps: [['整理临床队列', '清洗数据、定义结局，整理候选变量与缺失数据处理方案。'], ['模型构建与内部验证', '根据分析计划进行建模、验证，并说明模型表现与局限。'], ['图表与论文材料', '组织 ROC、校准曲线、决策曲线及方法描述。']],
    outputs: ['模型方案', '验证图表', '方法记录', '论文材料']
  },
  dataset: {
    category: '专病科研数据集', title: '2 型糖尿病并发症专病科研数据集建设',
    description: '案例方向：将诊疗、用药与随访记录整理为可用于后续研究的数据基础。',
    steps: [['明确研究所需数据', '梳理诊疗记录、检验指标、用药与随访信息。'], ['结构化与质量核查', '统一字段定义与编码规则，记录数据问题及处理过程。'], ['形成研究数据资产', '整理标准化数据集、数据字典与质量报告，支持后续队列研究。']],
    outputs: ['标准化数据集', '数据字典', '质量核查报告']
  }
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon, 20); });
}

function openDialog(content) {
  dialogContent.innerHTML = content;
  hydrateIcons(dialogContent);
  if (!dialog.open) dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
}

function closeDialog() { dialog.close(); }
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
});

function toast(text) {
  clearTimeout(toastTimer);
  $('#toast').textContent = text;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}

function showDemo(key, type = 'demo') {
  const item = (type === 'case' ? cases : demos)[key];
  if (!item) return;
  const disclaimer = type === 'case'
    ? '这是基于 PRD 的案例结构预览。具体服务机构与真实成果文件尚待确认，此处不作为已核实的客户成果展示。'
    : '这是只读流程演示。未调用模型、未接收论文或临床数据，也未生成或核验医学结论。';
  openDialog(`<p class="dialog-eyebrow"><span data-icon="document"></span>${escapeHTML(item.category)} · ${type === 'case' ? '案例结构预览' : '只读流程演示'}</p>
    <h2 id="dialog-title">${escapeHTML(item.title)}</h2><p class="dialog-description">${escapeHTML(item.description)}</p>
    <ol class="demo-steps">${item.steps.map(([title, description], index) => `<li><span class="step-number">0${index + 1}</span><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></div></li>`).join('')}</ol>
    <div class="deliverables"><h3>可交付成果</h3><ul>${item.outputs.map(output => `<li>${escapeHTML(output)}</li>`).join('')}</ul></div>
    <p class="demo-disclosure">${disclaimer}</p>
    <div class="dialog-actions"><button class="secondary-button" data-action="close">继续浏览</button><button class="primary-button" data-use-question="${escapeHTML(item.title)}">用数愈解决我的问题 <span data-icon="arrowRight"></span></button></div>`);
}

function focusComposer(question = '') { showLogin(question || currentQuestion); }

function showQuestionEditor() {
  openDialog(`<p class="dialog-eyebrow">科研工作台 · 交互演示</p><h2 id="dialog-title">修改我的科研问题</h2>
    <label class="sr-only" for="workspace-question">科研问题</label><textarea class="workspace-question" id="workspace-question" maxlength="2000" rows="4">${escapeHTML(currentQuestion)}</textarea>
    <div class="dialog-actions"><button class="secondary-button" data-action="preview-workspace">返回</button><button class="primary-button" data-action="save-question">保存问题</button></div>`);
}

function showLogin(question = '') {
  currentQuestion = question.trim();
  openDialog(`<div class="login-mark"><img src="./assets/shuyu-logo.png" alt="数愈科研"></div>
    <p class="dialog-eyebrow">你的科研，从这里继续</p><h2 id="dialog-title">${currentQuestion ? '登录后，继续你的科研问题' : '欢迎来到数愈科研'}</h2>
    <p class="dialog-description">${currentQuestion ? '问题已保留在当前页面，你可以先体验科研工作台的交互。' : '从一个问题开始，了解数愈如何陪你推进科研。'}</p>
    ${currentQuestion ? `<div class="saved-question">${escapeHTML(currentQuestion)}</div>` : ''}
    <button class="primary-button full-button" data-action="preview-workspace">以访客身份体验 <span data-icon="arrowRight"></span></button>
    <p class="dialog-note">本地演示，无需手机号或验证码。<br>正式登录服务尚未接入。</p>`);
}

function showWorkspace() {
  if (!currentQuestion) currentQuestion = '我想从一个医学科研问题开始';
  activeGoal = '形成研究方案';
  openDialog(`<p class="dialog-eyebrow"><span data-icon="project"></span>科研工作台 · 交互演示</p><h2 id="dialog-title">先把研究目标说清楚。</h2>
    <div class="saved-question">${escapeHTML(currentQuestion)}</div>
    <div class="workspace-banner"><span data-icon="check"></span>你的问题已接续，现在选择希望获得的成果。</div>
    <div class="workspace-options" aria-label="选择目标成果">${['形成研究方案','梳理核心证据','规划数据分析','完善论文或标书'].map((goal, i) => `<button class="workspace-option" data-goal="${goal}" aria-pressed="${i === 0}">${goal}</button>`).join('')}</div>
    <div class="next-stage"><h3>重要的方案，由你确认。</h3><p>接下来会先整理需要确认的问题与材料，再推进具体研究。你可以随时调整目标。</p></div>
    <div class="dialog-actions"><button class="secondary-button" data-action="edit-question">修改我的问题</button><button class="primary-button" data-action="plan">查看下一步 <span data-icon="arrowRight"></span></button></div>
    <p class="demo-disclosure">此处演示任务接续与方案确认流程，不进行实际科研计算或生成。</p>`);
}

function showPlan() {
  const stepsByGoal = {
    '形成研究方案': [['明确研究问题','确认研究对象、研究因素与关注结局。'],['盘点研究条件','说明现有数据、样本来源、时间安排和材料准备情况。'],['讨论设计与方法','明确设计类型、变量定义与分析思路，再确认下一步。']],
    '梳理核心证据': [['确定检索问题','明确人群、干预或暴露、对照与结局。'],['确定检索范围','确认文献类型、时间范围及需要优先关注的研究。'],['对照证据与原文','形成证据整理框架，并记录来源与适用边界。']],
    '规划数据分析': [['确认研究目标','先说明要解释、比较或预测的问题。'],['了解数据结构','确认变量、时间信息、结局与缺失数据情况。'],['确认分析计划','讨论方法、验证策略和交付图表，再进入分析。']],
    '完善论文或标书': [['明确材料与目标','说明材料类型、写作阶段和希望解决的问题。'],['检查研究论证','检查研究问题、证据与方法是否互相支持。'],['整理修改顺序','先处理关键论证，再细化结构与文字。']]
  };
  openDialog(`<p class="dialog-eyebrow"><span data-icon="blueprint"></span>下一步 · ${activeGoal}</p><h2 id="dialog-title">让问题有一个清晰的起点。</h2><div class="saved-question">${escapeHTML(currentQuestion)}</div>
    <ol class="demo-steps">${stepsByGoal[activeGoal].map(([title, description], i) => `<li><span class="step-number">0${i+1}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join('')}</ol>
    <p class="demo-disclosure">以上为通用流程示例。正式研究方案需结合具体材料与专业判断确定。</p>
    <div class="dialog-actions"><button class="secondary-button" data-action="preview-workspace">返回选择目标</button><button class="primary-button" data-action="finish">确认并返回首页 <span data-icon="check"></span></button></div>`);
}

const infos = {
  about: ['关于数愈','一站式医学科研与成果转化平台。'],
  serviceTerms: ['服务条款','正式服务条款尚待补充。'],
  disclaimer: ['免责声明','本地页面用于设计与交互演示，科研案例演示不构成已核验的医学结论。正式免责声明尚待补充。'],
  legal: ['法律公告','公司主体与正式法律公告尚待补充。'],
  pricing: ['会员与定价','会员权益与正式价格尚未在此预览中发布。此页面不进行付费或开通操作。'],
  download: ['客户端下载','Windows、macOS、App 与可信数据空间插件的可下载状态仍待确认。正式发布后将在这里提供入口。'],
  updates: ['首页预览 · 本次更新','本页采用 V1.2 冻结文案及确认的视觉调整：四排滚动 Logo、下方案例卡、三种角色能力卡与黑色页脚。'],
  contact: ['联系数愈','商务与客服联系方式尚待补充。正式联系方式确认后，将在这里统一展示。'],
  social: ['关注数愈 AI','这里将提供品牌内容渠道，分享医学 AI 科研案例与实战。当前二维码为可扫码的演示信息，正式渠道尚待确认。'],
  privacy: ['隐私政策','此预览没有接入账号、分析统计或模型服务。输入的科研问题只保留在当前页面内存中，刷新页面后清除。正式产品隐私政策将在上线前补充。'],
  terms: ['用户协议','正式用户协议与服务条款尚待补充。本页面用于设计和交互预览，不创建账号或订立服务合同。'],
  data: ['关于首页规模数据','3000+ 一线三甲医生验证、5800+ 科研成果交付、258+ 医学专业 Skill、190+ 科研工作流均沿用用户提供的 PRD。当前尚未提供统计时间、范围与原始依据，正式发布前需逐项核验。']
};
const services = {
  cooperation: ['机构科研合作','面向医院、科室与药械企业，围绕科研方向、课题推进和成果交付讨论合作。'],
  data: ['医疗数据与 RWD','围绕专病数据与真实世界数据，开展结构化整理、标准化与研究数据建设。'],
  transfer: ['知识产权与成果转化','围绕科研成果的确权、登记与转化，梳理成果材料和后续服务需求。']
};

function showInfo(key, service = false) {
  const content = (service ? services : infos)[key];
  if (!content) return;
  openDialog(`<p class="dialog-eyebrow">数愈科研</p><h2 id="dialog-title">${content[0]}</h2><p class="dialog-description">${content[1]}</p>${service ? '<p class="demo-disclosure">商务联系方式尚待确认，当前预览不提交合作申请。</p>' : ''}<div class="dialog-actions"><button class="primary-button" data-action="close">知道了</button></div>`);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.demo) return showDemo(button.dataset.demo);
  if (button.dataset.case) return showDemo(button.dataset.case, 'case');
  if (button.dataset.info) return showInfo(button.dataset.info);
  if (button.dataset.service) return showInfo(button.dataset.service, true);
  if (button.dataset.useQuestion) return focusComposer(button.dataset.useQuestion);
  if (button.dataset.role) {
    const prompts = { student: '我正在准备自己的课题，想先梳理研究方向与开题方案。', doctor: '我在临床中观察到一个问题，想评估它的研究价值与可行性。', director: '我想梳理科室的科研方向，规划基金申报与课题推进。' };
    focusComposer(prompts[button.dataset.role]); return;
  }
  if (button.dataset.goal) {
    activeGoal = button.dataset.goal;
    document.querySelectorAll('[data-goal]').forEach(option => option.setAttribute('aria-pressed', String(option.dataset.goal === activeGoal)));
    return;
  }
  const actions = {
    close: closeDialog,
    login: () => showLogin(currentQuestion),
    workspace: () => showLogin(currentQuestion),
    data: () => showInfo('data'),
    'preview-workspace': showWorkspace,
    'edit-question': showQuestionEditor,
    'save-question': () => { const value = $('#workspace-question').value.trim(); if (!value) { $('#workspace-question').focus(); return; } currentQuestion = value; showWorkspace(); },
    plan: showPlan,
    finish: () => { closeDialog(); toast('已完成流程体验，你可以继续探索其他科研问题。'); }
  };
  actions[button.dataset.action]?.();
});

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    document.querySelectorAll('.main-nav a').forEach(link => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
  }
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
hydrateIcons();
