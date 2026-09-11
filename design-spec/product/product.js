(() => {
  'use strict';
  const catalog = window.SHUYU_WORKFLOWS;
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);
  const workflow = catalog.find(item => item.id === params.get('workflow')) || (page === 'detail' || page === 'preview' ? window.SHUYU_PEER_REVIEW : catalog[0]);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storage = {
    read(key, fallback) { try { return JSON.parse(localStorage.getItem('shuyu-product-' + key)) ?? fallback; } catch { return fallback; } },
    write(key, value) { try { localStorage.setItem('shuyu-product-' + key, JSON.stringify(value)); return true; } catch { return false; } }
  };
  const initialFavorites = storage.read('favorites', []);
  const favorites = new Set(Array.isArray(initialFavorites) ? initialFavorites.filter(id => catalog.some(item => item.id === id)) : []);
  const icon = name => '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (window.SHUYU_ICONS[name] || window.SHUYU_ICONS.file) + '</svg>';

  $('[data-sidebar]').innerHTML =
    '<div class="sidebar-brand" aria-label="数愈科研"><img src="./assets/shuyu-logo.png" alt="数愈科研"></div>' +
    '<button class="sidebar-create" type="button">' + icon('plus') + '新建自由对话</button>' +
    '<button class="sidebar-create secondary" type="button" data-new-task>' + icon('project') + '新建科研任务</button>' +
    '<div class="sidebar-scroll"><nav class="sidebar-section" aria-label="探索"><button type="button" aria-current="page">' + icon('compass') + '能力频道</button></nav>' +
    '<nav class="sidebar-section" aria-label="最近的对话"><p class="section-label">最近的对话</p><button type="button">分析研究方向</button><button type="button">修改统计方法</button></nav>' +
    '<nav class="sidebar-section" aria-label="科研任务"><p class="section-label">科研任务</p><button type="button" data-saved-task>暂无已保存配置</button></nav></div>' +
    '<div class="sidebar-footer"><button type="button">' + icon('file') + '示例文件</button><span>本地演示</span></div>';
  $$('.back-link').forEach(link => {
    link.textContent = page === 'preview' ? '退出预览' : '返回';
    link.insertAdjacentHTML('afterbegin', '<span class="back-arrow">' + icon('arrowRight') + '</span>');
  });
  const searchIcon = $('[data-search-icon]');
  if (searchIcon) searchIcon.innerHTML = icon('tasks');
  const aiIcon = $('[data-ai-icon]');
  if (aiIcon) aiIcon.innerHTML = icon('enhance');
  const shareButton = $('[data-share]');
  if (shareButton) shareButton.innerHTML = icon('share') + '<span>分享</span>';

  const notice = document.createElement('div');
  notice.className = 'notice';
  notice.setAttribute('role', 'status');
  notice.hidden = true;
  document.body.append(notice);
  let noticeTimer;
  function notify(text) {
    clearTimeout(noticeTimer); notice.textContent = text; notice.hidden = false;
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 2600);
  }
  if (shareButton) shareButton.addEventListener('click', async () => {
    const data = {title: document.title, text: '数愈科研能力频道', url: location.href};
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); notify('页面链接已复制'); }
    } catch (error) {
      if (error?.name !== 'AbortError') notify('暂时无法分享，请复制浏览器地址');
    }
  });
  const modal = document.createElement('dialog');
  modal.className = 'dialog';
  modal.setAttribute('aria-labelledby', 'dialog-title');
  document.body.append(modal);
  const dialogHeader = title => '<header class="dialog-header"><h2 id="dialog-title">' + escape(title) + '</h2><button class="dialog-close" type="button" data-close aria-label="关闭">' + icon('close') + '</button></header>';
  function openDialog(content, file = false) {
    modal.classList.toggle('file-dialog', file); modal.innerHTML = content;
    if (!modal.open) modal.showModal();
    $('[data-close]', modal).addEventListener('click', () => modal.close());
  }
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
  });

  function updateTask() {
    const saved = storage.read('config', null);
    const button = $('[data-saved-task]');
    button.textContent = saved ? saved.title + ' · 待执行' : '暂无已保存配置';
    button.disabled = !saved;
  }
  function configure(target = workflow, existing = null) {
    openDialog(dialogHeader('配置科研任务') + '<form data-config-form>' +
      '<label>工作流<input value="' + escape(target.title) + '" readonly></label>' +
      '<label>任务名称<input name="title" required maxlength="80" value="' + escape(existing?.title || target.title) + '"></label>' +
      '<label>研究目标<textarea name="goal" required maxlength="2000" placeholder="描述你的研究目标、现有材料与希望获得的成果">' + escape(existing?.goal || '') + '</textarea></label>' +
      '<p class="dialog-help">保存后可继续修改。本地演示保存任务配置，实际执行尚未接入。</p>' +
      '<div class="dialog-actions"><button class="button secondary" type="button" data-cancel>取消</button><button class="button primary" type="submit">保存配置</button></div></form>');
    $('[data-cancel]', modal).addEventListener('click', () => modal.close());
    $('[data-config-form]', modal).addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const title = form.elements.title.value.trim(), goal = form.elements.goal.value.trim();
      if (!title || !goal) { notify('请填写任务名称和研究目标'); return; }
      const saved = storage.write('config', { workflow: target.id, title, goal });
      if (!saved) { notify('当前环境无法保存，输入已保留，请复制后再关闭'); return; }
      modal.close(); updateTask();
      notify('任务配置已保存，可从左侧继续编辑');
    });
  }
  $('[data-new-task]').addEventListener('click', () => configure(page === 'channel' ? catalog[0] : workflow));
  $('[data-saved-task]').addEventListener('click', () => {
    const saved = storage.read('config', null);
    if (saved) configure(catalog.find(item => item.id === saved.workflow) || catalog[0], saved);
  });
  updateTask();
  $$('[data-run]').forEach(button => button.addEventListener('click', () => {
    if (workflow.id === 'peer-review') location.href = 'https://kgcure.com/workspace/chats/new?task=research&workflowId=79d470ab439e4f80a540a61c09dae2fd';
    else configure();
  }));

  function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    storage.write('favorites', [...favorites]);
  }
  function keyTabs(container) {
    container.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      const options = $$('button', container);
      let index = options.indexOf(document.activeElement);
      if (index < 0) return;
      event.preventDefault();
      index = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
      options[index].focus(); options[index].click();
    });
  }

  if (page === 'channel') {
    const savedState = storage.read('channel', {});
    const state = {scope: 'all', category: 'recommended', tag: 'all', query: '', ...savedState};
    if (!['all', 'favorites'].includes(state.scope)) state.scope = 'all';
    if (!['recommended', ...catalog.map(item => item.category)].includes(state.category)) state.category = 'recommended';
    if (!['all', ...catalog.map(item => item.tag)].includes(state.tag)) state.tag = 'all';
    state.query = typeof state.query === 'string' ? state.query : '';
    const search = $('[data-search-form] textarea');
    search.value = state.query;
    $$('[data-example-query]').forEach(button => button.addEventListener('click', () => {
      search.value = button.dataset.exampleQuery;
      state.query = search.value;
      render();
      search.focus();
    }));
    const matchesQuery = item => [item.title, item.description, item.summary, item.category, item.tag, ...item.tags].join(' ').toLowerCase().includes(state.query.toLowerCase());
    const scopeMatches = (item, scope = state.scope) => scope === 'all' || scope === 'favorites' && favorites.has(item.id);
    const cardIcons = {clinical: 'chart', screening: 'bookOpen', trial: 'blueprint', regression: 'figure', writing: 'edit', grant: 'review'};
    const categoryIcons = {recommended: 'enhance', '医学研究': 'figure', '数据分析': 'chart', '科研写作': 'edit'};
    function render() {
      const queried = catalog.filter(matchesQuery);
      const scoped = queried.filter(item => scopeMatches(item));
      const categories = ['recommended', ...new Set(catalog.map(item => item.category))];
      const showFilters = state.scope === 'all';
      $('[data-primary-navigation]').innerHTML = categories.map(category => {
        const selected = showFilters && state.category === category;
        return '<button type="button" role="tab" data-category="' + escape(category) + '" aria-selected="' + selected + '" tabindex="' + (selected ? '0' : '-1') + '" aria-controls="workflow-results">' +
          icon(categoryIcons[category] || 'layers') + '<span>' + escape(category === 'recommended' ? '推荐' : category) + '（' + queried.filter(item => category === 'recommended' ? item.recommended : item.category === category).length + '）</span></button>';
      }).join('') + '<button class="favorite-tab" type="button" role="tab" data-scope="favorites" aria-selected="' + (state.scope === 'favorites') + '" tabindex="' + (state.scope === 'favorites' ? '0' : '-1') + '" aria-controls="workflow-results">' +
        icon('heart') + '<span>收藏（' + queried.filter(item => favorites.has(item.id)).length + '）</span></button>';
      $('[data-filters]').hidden = !showFilters;
      const categoryItems = scoped.filter(item => {
        if (!showFilters) return true;
        return state.category === 'recommended' ? item.recommended : item.category === state.category;
      });
      const tags = ['all', ...new Set(catalog.filter(item => state.category === 'recommended' ? item.recommended : item.category === state.category).map(item => item.tag))];
      if (!tags.includes(state.tag)) state.tag = 'all';
      $('[data-tags]').innerHTML = tags.map(tag => '<button type="button" data-tag="' + escape(tag) + '" aria-pressed="' + (state.tag === tag) + '">' +
        escape(tag === 'all' ? '全部' : tag) + '（' + categoryItems.filter(item => tag === 'all' || item.tag === tag).length + '）</button>').join('');
      const results = categoryItems.filter(item => !showFilters || state.tag === 'all' || item.tag === state.tag);
      $('[data-workflow-grid]').innerHTML = results.map(item => '<article class="workflow-card"><span class="card-kicker">' + escape(item.category) + ' · ' + escape(item.tag) + '</span><span class="workflow-card-icon">' + icon(cardIcons[item.id] || 'layers') + '</span>' +
        '<h2><a href="./workflow-detail.html?workflow=' + item.id + '">' + escape(item.title) + '</a></h2><p>' + escape(item.description) + '</p>' +
        '<div class="card-footer"><span class="card-taxonomy">' + item.tags.map(tag => '<span>' + escape(tag) + '</span>').join('') + '</span><button class="card-favorite" type="button" data-card-favorite="' + item.id + '" aria-pressed="' + favorites.has(item.id) + '" aria-label="' + (favorites.has(item.id) ? '取消收藏' : '收藏') + escape(item.title) + '">' + icon('heart') + '<span>' + (favorites.has(item.id) ? '已收藏' : '收藏') + '</span></button></div></article>').join('');
      $('[data-empty]').hidden = results.length > 0;
      storage.write('channel', state);
    }
    $('[data-search-form]').addEventListener('submit', event => { event.preventDefault(); state.query = search.value.trim(); render(); });
    search.addEventListener('input', () => { state.query = search.value.trim(); render(); });
    $('[data-primary-navigation]').addEventListener('click', event => {
      const categoryButton = event.target.closest('[data-category]');
      const favoriteButton = event.target.closest('[data-scope="favorites"]');
      if (categoryButton) {
        state.scope = 'all'; state.category = categoryButton.dataset.category; state.tag = 'all'; render();
        $$('[data-category]').find(item => item.dataset.category === state.category)?.focus();
      } else if (favoriteButton) {
        state.scope = 'favorites'; render();
        $('[data-scope="favorites"]')?.focus();
      }
    });
    $('[data-tags]').addEventListener('click', event => {
      const button = event.target.closest('[data-tag]'); if (!button) return;
      state.tag = button.dataset.tag; render();
      $$('[data-tag]').find(item => item.dataset.tag === state.tag)?.focus();
    });
    $('[data-workflow-grid]').addEventListener('click', event => {
      const button = event.target.closest('[data-card-favorite]'); if (!button) return;
      const id = button.dataset.cardFavorite; toggleFavorite(id); render();
      $$('[data-card-favorite]').find(item => item.dataset.cardFavorite === id)?.focus();
    });
    $$('[data-reset]').forEach(button => button.addEventListener('click', () => {
      Object.assign(state, {scope: 'all', category: 'recommended', tag: 'all', query: ''}); search.value = ''; render();
    }));
    keyTabs($('[data-primary-navigation]')); render();
    return;
  }

  document.title = (page === 'preview' ? '案例预览 · ' : '') + workflow.title + ' · 数愈科研';
  const fields = {title: workflow.title, summary: workflow.summary, category: workflow.category + ' · ' + workflow.tag, input: workflow.input, output: workflow.output};
  for (const [name, value] of Object.entries(fields)) $$('[data-workflow-' + name + ']').forEach(element => { element.textContent = value; });
  $$('[data-preview-link]').forEach(link => { link.href = './workflow-preview.html?workflow=' + workflow.id; });
  $$('[data-detail-link]').forEach(link => { link.href = './workflow-detail.html?workflow=' + workflow.id; });
  $$('[data-favorite]').forEach(button => {
    const update = () => { button.setAttribute('aria-pressed', favorites.has(workflow.id)); button.textContent = favorites.has(workflow.id) ? '已收藏' : '收藏'; };
    update(); button.addEventListener('click', () => { toggleFavorite(workflow.id); update(); });
  });
  const sequence = '<ol class="process-list">' + workflow.steps.map((step, index) =>
    '<li><span class="process-number">' + String(index + 1).padStart(2, '0') + '</span><div><h3>' + escape(step) + '</h3></div></li>').join('') + '</ol>';

  if (page === 'detail') {
    const peer = workflow.id === 'peer-review';
    const detailTags = peer ? ['同行评审','方法学审查','统计核验','报告规范'] : [workflow.category, workflow.tag].filter(Boolean);
    $('[data-detail-tags]').innerHTML = detailTags.map(tag => '<span>' + escape(tag) + '</span>').join('');
    $('[data-value-intro]').textContent = peer ? '评审的价值，是让作者知道哪里有问题、为什么重要、具体怎么改。这个工作流系统检查方法、统计、报告规范、伦理与写作质量，辅助形成严格且建设性的意见；学术创新与研究价值仍由人类专家判断。' : workflow.summary;
    $('[data-scenarios]').innerHTML = workflow.scenarios.map(text => '<span>' + escape(text) + '</span>').join('');
    const values = peer ? [
      ['意见零散，难以定位问题','按摘要、引言、方法、结果、讨论及参考文献组织意见，同时检查方法学、统计、透明度与伦理。'],
      ['重大问题和细节混在一起','区分总体评价、Major comments、Minor comments 和作者问题，帮助安排修改优先级。'],
      ['统计与报告细节容易漏查','检查统计假设、样本量、可重复性、数据共享、图表质量，以及 CONSORT、STROBE、PRISMA 等报告规范。'],
      ['评价笼统，不知道如何修改','重大意见说明问题、影响和具体修改建议，并解释其对发表或通过的影响。']
    ] : [['明确任务方向', workflow.goal], ['形成可用成果', workflow.output]];
    const problemDescriptions = peer ? [
      '评审记录分散在不同章节，方法、统计与表达问题缺少统一整理，回看时难以快速定位。',
      '研究设计缺陷和文字格式混在一起，作者难以判断修改重点，也容易遗漏需要优先回应的意见。',
      '统计假设、样本量依据和报告规范涉及多个维度，单靠逐段阅读容易漏掉关键核查项。',
      '意见只指出“不充分”或“不清楚”，没有解释问题的影响，作者仍不清楚如何补充和修改。'
    ] : values.map(row => row[0]);
    const solutionTitles = peer ? ['按章节整理，定位清楚','区分意见等级，明确优先级','系统核查，保留复核依据','解释问题影响，给出修改方向'] : values.map(row => row[0]);
    $('[data-value-table]').innerHTML = [
      ['problem-panel','你可能遇到的问题',values.map((row,i) => [row[0],problemDescriptions[i]])],
      ['solution-panel','工作流带来的价值',values.map((row,i) => [solutionTitles[i],row[1]])]
    ].map(panel => '<table class="value-panel ' + panel[0] + '"><thead><tr><th scope="col">' + panel[1] + '</th></tr></thead><tbody>' + panel[2].map(row => '<tr><td><strong>' + escape(row[0]) + '</strong><p>' + escape(row[1]) + '</p></td></tr>').join('') + '</tbody></table>').join('');
    const scope = peer ? [
      ['研究设计','研究问题、研究人群、干预或暴露、对照设置与结局指标是否清楚且彼此一致。'],
      ['方法与统计','样本量依据、偏倚控制、统计假设、模型选择、缺失值处理与敏感性分析是否合理。'],
      ['报告与透明度','检查 CONSORT、STROBE、PRISMA 等相应规范，以及注册、数据共享和可重复性说明。'],
      ['伦理与表达','核对伦理审批、知情同意、利益冲突、图表完整性、引用准确性与语言表达。']
    ] : [['任务目标','目标、边界与交付标准。'],['方法过程','关键步骤、依据与复核节点。'],['结果交付','输出结构、使用方式与限制。']];
    $('[data-scope-table]').innerHTML = '<div class="table-head"><span>检查维度</span><span>具体关注内容</span></div>' + scope.map(row => '<div><strong>' + escape(row[0]) + '</strong><p>' + escape(row[1]) + '</p></div>').join('');
    const notes = peer ? ['理解稿件与评审目标','核对方法、统计、伦理与报告要求','区分重大意见与细节问题','说明影响与具体改法','汇总评价及待澄清问题'] : workflow.steps.map(() => '根据输入材料推进并保留复核依据');
    $('[data-flow]').innerHTML = workflow.steps.map((step,i) => '<li><span class="flow-icon">' + icon(['file','review','search','edit','document'][i] || 'document') + '</span><h3>' + escape(step) + '</h3><p>' + escape(notes[i]) + '</p></li>').join('');
    const checkpoints = peer ? [
      ['研究问题与设计','识别研究类型，核对问题、设计、变量和结局之间是否一致。','确认研究意图，以及哪些设计选择属于既定前提。'],
      ['证据与统计判断','检查方法可重复性、统计假设、效应解释和报告规范。','对专业争议、临床意义和不可替代的领域判断作最终决定。'],
      ['意见分级与表达','将问题归入重大意见、次要意见或待澄清问题，并提供修改路径。','确认语气、优先级和最终提交给作者或编辑的意见。']
    ] : [['目标确认','核对任务目标、材料和边界。','确认预期成果。'],['过程复核','按步骤生成并保留依据。','确认关键判断。'],['结果交付','组织结果与使用说明。','确认后续使用方式。']];
    $('[data-checkpoints]').innerHTML = '<div class="table-head"><span>关键节点</span><span>系统检查</span><span>需要用户确认</span></div>' + checkpoints.map(row => '<div><strong>' + escape(row[0]) + '</strong><p>' + escape(row[1]) + '</p><p>' + escape(row[2]) + '</p></div>').join('');
    const outputs = peer ? [
      ['正式同行评审报告','Markdown / 文档','总体评价、研究优势、核心风险与整体建议。','提交前由评审者复核并调整措辞。'],
      ['Major comments','结构化意见','影响有效性、解释性或研究意义的问题，并说明影响与修改方向。','用于确定必须优先回应的修改项。'],
      ['Minor comments','结构化意见','表达、图表、格式、引用及补充说明等细节问题。','用于完善稿件质量和报告一致性。'],
      ['作者问题与补充说明','问题清单','需要作者进一步澄清的方法、结果、数据或解释。','用于组织回复信或下一轮评审。']
    ] : [['主要交付','文档',workflow.output,'复核后用于后续科研任务。']];
    $('[data-outputs]').innerHTML = '<p class="delivery-intro">' + (peer ? '以评审报告为核心交付，重大意见、次要意见与作者问题组成报告的不同部分，帮助你从整体判断逐步落实到修改事项。' : '围绕研究目标组织交付内容，说明成果包含什么，以及如何用于下一步工作。') + '</p><div class="delivery-grid">' + outputs.map((row,i) => '<article class="deliverable-card"><header><span class="deliverable-icon">' + icon('document') + '</span><div><span class="deliverable-type">' + escape(peer && i > 0 ? '报告内容 · ' + row[1] : row[1]) + '</span><h4>' + escape(row[0]) + '</h4></div></header><p>' + escape(row[2]) + '</p><footer><span>如何使用</span><p>' + escape(row[3]) + '</p></footer></article>').join('') + '</div>';
    const supplements = peer ? [
      ['逐行／逐段意见','定位需要修改的具体段落，说明表达或论证问题，帮助作者逐项对照修改。','适用材料：带行号稿件或需要精修的段落。'],
      ['报告规范核查','根据研究类型核对相应报告要素，整理缺失信息与需要进一步说明的内容。','适用材料：研究类型明确的论文及相关附件。'],
      ['图表与汇报审查','检查图表表达、图像完整性和汇报逻辑，指出影响理解的问题及改进方向。','适用材料：可读取的图像、图表或幻灯片。']
    ] : [['补充交付','根据任务材料与确认方案确定补充内容。','以实际任务要求为准。']];
    $('[data-conditional]').innerHTML = supplements.map((row,i) => '<article class="supplement-item"><header><span class="supplement-icon">' + icon(['edit','review','chart'][i] || 'document') + '</span><h4>' + escape(row[0]) + '</h4></header><div class="supplement-body"><p>' + escape(row[1]) + '</p><footer><span>适用材料</span><p>' + escape(row[2].replace(/^适用材料：/,'')) + '</p></footer></div></article>').join('');
    $$('.input-requirements > div > span').forEach(element => element.remove());
    $$('.input-requirements h3').forEach((heading,index) => {
      heading.insertAdjacentHTML('afterbegin', '<span class="input-heading-icon" aria-hidden="true">' + icon(index === 0 ? 'edit' : 'upload') + '</span>');
      heading.insertAdjacentHTML('beforeend', '<span class="input-status">' + (index === 0 ? '可选说明' : '必需材料') + '</span>');
    });
    $('[data-input-description]').textContent = peer ? '说明本轮希望重点核查的方法、统计、写作或报告规范；未填写时按完整评审运行。' : workflow.goal;
    $('[data-upload-description]').textContent = peer ? '上传待评审论文或基金申请材料，支持 DOCX 与可检索 PDF；建议提供干净版本和行号。' : workflow.input;
    const materials = peer ? [
      ['待评审稿件','必需','DOCX 或可检索 PDF；建议提供干净版本和行号。','上传前删除患者身份信息及其他敏感内容。'],
      ['评审重点','可选','方法、统计、写作、图表或报告规范等关注方向。','说明期刊角色、评审轮次和本次最希望解决的问题。'],
      ['期刊与报告规范','可选','期刊作者指南、审稿要求，以及 CONSORT、STROBE、PRISMA 等适用规范。','尽量提供期刊名称、研究类型与规范版本。'],
      ['补充材料','可选','研究方案、注册信息、统计分析计划、附录、图表或既往回复信。','仅上传与本轮判断有关的材料，并标明文件用途。']
    ] : [['核心材料','必需',workflow.input,'确保内容完整且已完成隐私保护。'],['任务说明','建议','研究目标、限制与期望交付。','说明最需要系统处理的问题。']];
    $('[data-material-table]').innerHTML = '<div class="table-head"><span>材料</span><span>要求</span><span>示例</span><span>准备说明</span></div>' + materials.map(row => '<div><strong>' + escape(row[0]) + '</strong><span class="material-status ' + (row[1] === '必需' ? 'is-required' : 'is-optional') + '">' + escape(row[1]) + '</span><p>' + escape(row[2]) + '</p><p>' + escape(row[3]) + '</p></div>').join('');
    $('[data-case-title]').textContent = peer ? '同行评审案例' : workflow.title + '案例';
    $('[data-case-input]').textContent = peer ? 'EAR-25-0804.R4 Clean version.docx · 4.0 MB' : workflow.input;
    $('[data-case-output]').textContent = peer ? 'EAR-25-0804.R4_专项深度评审报告.md' : workflow.output;
    $('[data-case-config]').textContent = peer ? '深度模式 · 中文输出 · 正式风格' : '示例材料与配置';
    const caseInput = $('[data-case-input]'), caseOutput = $('[data-case-output]');
    [caseInput,caseOutput].forEach((element,i) => {
      const fileCard = document.createElement('div');
      fileCard.className = 'case-file';
      element.before(fileCard);
      fileCard.innerHTML = '<span class="deliverable-icon">' + icon('document') + '</span>';
      const info = document.createElement('div');
      fileCard.append(info); info.append(element);
      const format = document.createElement('small');
      format.textContent = i === 0 ? '输入材料 · ' + (peer ? 'DOCX' : '研究材料') : '交付文件 · ' + (peer ? 'Markdown' : '成果文档');
      info.append(format);
    });
    $('.case-io > div:last-child > p').textContent = peer ? '围绕上传稿件形成专项评审意见，结合问题影响与修改建议组织报告。可进入案例查看完整内容及文件。' : '查看这一案例的成果内容、输入材料和具体配置。';
    const caseDescription = document.createElement('p');
    caseDescription.className = 'case-description';
    caseDescription.textContent = peer ? '从一份待评审论文出发，查看工作流如何将稿件内容转化为有重点、可执行的专项深度评审报告。' : '通过实际输入与成果示例，了解工作流的处理方式和交付结构。';
    $('.case-io').before(caseDescription);
    if (peer) {
      $$('[data-preview-link]').forEach(a => { a.href = 'https://kgcure.com/workspace/workflows/template/79d470ab439e4f80a540a61c09dae2fd/cases/34b2609a-cc8f-4b5e-b7e8-48716676d61d'; });
    } else {
      $('.detail-meta').innerHTML = '<span>更新于 2026-09-09</span><span>维护团队：数愈科研</span>';
      $('.configuration-options').hidden = true;
    }
    const related = peer ? [
      ['科研写作 · 表达优化','AI 腔去除与自然表达优化','在保留研究事实和专业术语的前提下，改善机械表达、段落衔接与论证节奏。','论文润色','自然表达','59405ee32866425ab3ed47b790e2579e','edit'],
      ['证据研究 · 综述写作','撰写综述论文','围绕明确主题综合相关文献，梳理证据脉络、研究空白和具有依据的未来方向。','文献综合','综述写作','1002','bookOpen'],
      ['科研写作 · 论文初稿','完整论文初稿生成','根据研究设计、数据结果和目标期刊要求，组织结构完整、便于继续修改的论文初稿。','论文写作','初稿生成','1001','document']
    ] : catalog.filter(x => x.id !== workflow.id).slice(0,3).map(x => [x.category + ' · ' + x.tag,x.title,x.description,x.category,x.tag,x.id,x.icon || 'document']);
    $('[data-related]').innerHTML = related.map(row => '<article class="workflow-card related-workflow-card"><span class="card-kicker">' + escape(row[0]) + '</span><span class="workflow-card-icon">' + icon(row[6]) + '</span><h2><a href="' + (peer ? 'https://kgcure.com/workspace/workflows/template/' : './workflow-detail.html?workflow=') + row[5] + '">' + escape(row[1]) + '</a></h2><p>' + escape(row[2]) + '</p><footer class="card-footer"><span class="card-taxonomy"><span>' + escape(row[3]) + '</span><span>' + escape(row[4]) + '</span></span><span class="related-link">查看详情 →</span></footer></article>').join('');
    $$('[data-favorite]').forEach(button => { const update = () => { button.innerHTML = icon('heart') + (favorites.has(workflow.id) ? '已收藏' : '收藏'); }; update(); button.addEventListener('click', update); });
    const scrollRoot = $('.product-scroll'), anchorNav = $('.detail-anchors'), hero = $('.workflow-hero');
    const anchors = $$('.detail-anchors > a[href^="#"]'), sections = anchors.map(anchor => $(anchor.hash));
    function updateAnchor() {
      const scrollTop = scrollRoot.getBoundingClientRect().top;
      const boundary = scrollTop + 100;
      let current = sections[0];
      sections.forEach(section => { if (section.getBoundingClientRect().top <= boundary) current = section; });
      anchors.forEach(anchor => { const active = anchor.hash === '#' + current.id; anchor.classList.toggle('active', active); if (active) anchor.setAttribute('aria-current', 'location'); else anchor.removeAttribute('aria-current'); });
      anchorNav.classList.toggle('is-stuck', anchorNav.getBoundingClientRect().top <= scrollTop + 1 && scrollRoot.scrollTop > 0);
      anchorNav.classList.toggle('show-actions', hero.getBoundingClientRect().bottom <= scrollTop + anchorNav.offsetHeight);
    }
    anchors.forEach(anchor => anchor.addEventListener('click', event => {
      event.preventDefault();
      const section = $(anchor.hash), offset = section.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top;
      scrollRoot.scrollTo({top: scrollRoot.scrollTop + offset - 70, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      history.replaceState(null, '', location.pathname + location.search + anchor.hash);
    }));
    scrollRoot.addEventListener('scroll', updateAnchor, {passive: true}); updateAnchor();
    return;
  }

  if (page === 'preview') return;

  const documents = {
    report: {name: '研究报告示例', filename: 'research_report.md', text: '# ' + workflow.title + ' · 研究报告示例\n\n> 示例材料，不包含真实研究数据或实际执行结果。\n\n## 研究目标\n\n' + workflow.goal + '\n\n## 输入准备\n\n' + workflow.input + '\n\n## 工作方法\n\n' + workflow.steps.map((step, i) => (i + 1) + '. ' + step).join('\n') + '\n\n## 预期交付\n\n' + workflow.output + '\n\n## 当前状态\n\n本文件展示交付结构。真实任务需补齐材料、确认配置并完成执行后再记录研究结果。\n'},
    plan: {name: '研究分析计划', filename: 'analysis_plan.md', text: '# ' + workflow.title + ' · 研究分析计划\n\n> 演示方案，尚未实际执行。\n\n## 目标\n\n' + workflow.goal + '\n\n## 步骤\n\n' + workflow.steps.map((step, i) => (i + 1) + '. ' + step + '：确认输入与输出要求，保留处理记录。').join('\n') + '\n\n## 待确认\n\n- 输入材料与研究目标是否匹配\n- 需要人工复核的事项\n- 交付内容及文件格式\n'},
    dictionary: {name: '输入材料说明', filename: 'input_notes.md', text: '# ' + workflow.title + ' · 输入材料说明\n\n> 示例模板，不包含真实个人或研究数据。\n\n## 所需材料\n\n' + workflow.input + '\n\n## 整理要求\n\n- 说明每份材料的来源、用途与版本\n- 为变量或关键术语补充定义、类型与单位\n- 明确缺失信息及需要确认的内容\n- 提交前核对敏感信息与使用范围\n'}
  };
  $('[data-sample-goal]').textContent = workflow.goal;
  $('.sample-note').textContent = '演示案例 · 以下为示例输入与交付材料，未运行真实任务，不包含真实患者数据或研究结果。';
  const previewFacts = $$('.preview-inputs .fact-grid strong');
  [workflow.category, '方案准备', '研究目标与材料说明'].forEach((value, index) => { previewFacts[index].textContent = value; });
  $('.preview-process .section-heading span').textContent = workflow.steps.length + ' 个环节 · 待执行';
  $('.preview-process .process-list').outerHTML = '<ol class="process-list compact">' + workflow.steps.map((step, index) =>
    '<li><span class="process-number">' + String(index + 1).padStart(2, '0') + '</span><details><summary>' + escape(step) + '</summary><p>确认本环节所需输入与输出，记录处理方式，完成后整理对应的交付材料。</p></details></li>').join('') + '</ol>';
  $('.report-preview').innerHTML = '<div class="report-meta"><span>RESEARCH REPORT</span><span>示例 · 方案准备阶段</span></div>' +
    '<h3>' + escape(workflow.title) + ' · 方案摘要</h3><p>' + escape(workflow.goal) + '</p>' +
    '<h4>输入准备</h4><p>' + escape(workflow.input) + '</p><h4>工作方法</h4><p>' + escape(workflow.steps.join('，') + '。') + '</p>' +
    '<h4>交付形式</h4><p>' + escape(workflow.output) + '</p><h4>当前状态</h4><p>本示例展示交付结构。真实任务需补齐材料、确认配置并完成执行后，再记录研究结果。</p>';
  $$('[data-download]').forEach(button => {
    button.innerHTML = icon('download');
    const key = button.dataset.download, file = documents[key];
    button.setAttribute('aria-label', '下载' + file.name); button.title = '下载' + file.name;
    const card = button.closest('.file-card');
    $('.file-copy strong', card).textContent = file.name;
    $('.file-copy span', card).textContent = file.filename + ' · ' + (new Blob([file.text]).size / 1024).toFixed(1) + ' KB';
    $('.file-type', card).innerHTML = '<img src="./assets/markdown.svg" alt="Markdown">';
    button.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([file.text], {type: 'text/markdown;charset=utf-8'}));
      const link = document.createElement('a'); link.href = url; link.download = file.filename;
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  });
  $$('[data-file]').forEach(button => button.addEventListener('click', () => {
    const file = documents[button.dataset.file];
    openDialog(dialogHeader(file.name) + '<pre class="file-text">' + escape(file.text) + '</pre>', true);
  }));
  if (location.hash === '#sample-files') {
    requestAnimationFrame(() => { const root = $('.product-scroll'); root.scrollTop += $('#sample-files').getBoundingClientRect().top - root.getBoundingClientRect().top; });
  }
})();
