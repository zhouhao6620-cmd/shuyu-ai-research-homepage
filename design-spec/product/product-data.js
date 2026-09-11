/* Local prototype catalog. Counts are always derived from these six entries. */
window.SHUYU_WORKFLOWS = [
  {
    id: 'clinical', title: '临床预测模型构建', category: '医学研究', tag: '医学 AI 与智能建模',
    description: '从变量定义到模型验证，形成可复现的临床预测研究方案。',
    summary: '根据临床研究目标和数据结构，完成变量定义、数据检查、候选模型构建与验证，整理分析方案、模型报告和结果解释。',
    input: '研究目标、脱敏临床数据及变量说明。支持 CSV 和 Excel 文件。',
    output: '分析计划、变量字典、模型报告与图表清单。',
    goal: '研究临床结局风险，明确候选预测因素与验证方案。',
    tags: ['临床数据', '统计建模'], recommended: true,
    scenarios: ['已明确研究人群与预测结局的队列研究', '需要整理候选预测因素和模型验证方案的研究'],
    steps: ['确认研究目标与结局', '检查并准备研究数据', '构建候选模型', '验证模型与解释结果', '整理报告与交付材料']
  },
  {
    id: 'screening', title: '系统综述文献初筛', category: '医学研究', tag: '文献检索与循证研究',
    description: '依据纳入标准筛选文献题录，保留判断依据与复核记录。',
    summary: '将研究问题转为可执行的纳入与排除标准，辅助完成文献题录初筛，整理筛选结果、待复核条目和判断依据。',
    input: '研究问题、纳入与排除标准，以及导出的文献题录。',
    output: '题录筛选清单、排除理由和待复核条目。',
    goal: '根据预先定义的标准，整理候选文献并开展题录初筛。',
    tags: ['系统综述', '文献筛选'], recommended: true,
    scenarios: ['已完成初步文献检索的系统综述', '需要保留筛选依据并安排人工复核的证据研究'],
    steps: ['明确研究问题', '定义纳入与排除标准', '检查文献题录', '进行题录初筛', '整理筛选结果与复核清单']
  },
  {
    id: 'trial', title: '临床试验设计', category: '医学研究', tag: '科研选题与方案设计',
    description: '梳理研究目标、评价指标与实施步骤，形成方案初稿。',
    summary: '围绕具体研究问题梳理研究人群、干预与比较方式、主要评价指标和实施步骤，形成供研究团队讨论的试验方案初稿。',
    input: '研究方向、目标人群、干预措施与现有研究条件。',
    output: '研究方案初稿、设计要点及实施计划。',
    goal: '将研究问题整理为清晰的临床试验设计框架。',
    tags: ['研究方案', '临床试验'], recommended: false,
    scenarios: ['需要将临床问题整理为试验方案的研究团队', '已有初步方向，希望明确研究设计与实施步骤的项目'],
    steps: ['确认研究问题', '定义目标人群与干预', '确定评价指标', '整理实施与数据采集计划', '生成方案初稿']
  },
  {
    id: 'regression', title: '回归分析', category: '数据分析', tag: '统计建模',
    description: '结合变量与结局类型，组织回归建模、检查和结果解释。',
    summary: '根据因变量与自变量的类型整理建模方案，进行数据检查、回归分析和结果解释，保留分析假设与后续复核事项。',
    input: '脱敏研究数据、因变量、自变量及研究问题。',
    output: '回归分析方案、结果表格和解释报告。',
    goal: '围绕研究结局，整理变量关系的回归分析方案。',
    tags: ['回归建模', '结果解释'], recommended: true,
    scenarios: ['希望探索变量关联的研究', '需要规范整理回归结果与分析记录的数据任务'],
    steps: ['确认变量与分析目标', '检查数据与分布', '选择回归方法', '建模并检查假设', '整理结果与解释']
  },
  {
    id: 'writing', title: 'AI 腔去除与自然表达优化', category: '科研写作', tag: '论文写作与投稿',
    description: '保留原文观点与事实，改善机械表达和段落衔接。',
    summary: '识别机械、重复或模板化的表达，在保留观点、事实和专业术语的基础上优化句子与段落，提供便于审阅的修改说明。',
    input: '待优化文本、目标读者与表达风格要求。',
    output: '优化后文本、修改说明与待确认事项。',
    goal: '保留研究事实与原文含义，让文字表达清晰自然。',
    tags: ['润色', '论文写作'], recommended: false,
    scenarios: ['论文和研究报告的表达优化', '希望减少重复与模板化语句的学术材料'],
    steps: ['理解原文与目标读者', '定位重复和机械表达', '优化句子与段落衔接', '核对事实与术语', '输出修订稿与说明']
  },
  {
    id: 'grant', title: '基金申报书审核', category: '科研写作', tag: '科研评审与质量评价',
    description: '检查研究逻辑与材料完整性，提供可执行的修改建议。',
    summary: '围绕申报要求审阅研究背景、科学问题、技术路线与实施计划，整理逻辑问题、缺失信息和修改优先级，供团队进一步完善申报书。',
    input: '申报书草稿、申报要求及重点关注的问题。',
    output: '审核意见、问题清单与修改计划。',
    goal: '检查申报材料的研究逻辑与完整性，明确修改顺序。',
    tags: ['基金申请', '质量评价'], recommended: false,
    scenarios: ['提交前的申报书自查', '需要组织团队讨论和修改计划的科研项目'],
    steps: ['确认申报要求', '检查材料完整性', '审阅科学问题与技术路线', '整理问题与建议', '输出修改计划']
  }
];

// Icons reused from src/components/icons.js.
window.SHUYU_ICONS = {"chatPlus": "<path d=\"M7 18.5 3.5 21v-5A8 8 0 1 1 7 18.5Z\"/><path d=\"M12 7v6M9 10h6\"/>", "search": "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m15.5 15.5 4 4\"/>", "bookOpen": "<path d=\"M4 5.5c3.2-.8 5.7-.2 8 1.8v11c-2.3-2-4.8-2.6-8-1.8v-11ZM20 5.5c-3.2-.8-5.7-.2-8 1.8v11c2.3-2 4.8-2.6 8-1.8v-11Z\"/>", "edit": "<path d=\"m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z\"/><path d=\"m13.8 7.4 3 3M5.2 15.8l3 3\"/>", "project": "<path d=\"M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-12Z\"/><path d=\"M3.5 10.5h17\"/>", "tasks": "<path d=\"M4 12h3l2.2-5 4.2 10 2.1-5H20\"/>", "history": "<path d=\"M4 5v5h5\"/><path d=\"M5 10a8 8 0 1 1 2.2 7.5\"/><path d=\"M12 8v4l3 2\"/>", "user": "<circle cx=\"12\" cy=\"8\" r=\"3.5\"/><path d=\"M5 20a7 7 0 0 1 14 0\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "upload": "<path d=\"M12 16V4M7.5 8.5 12 4l4.5 4.5\"/><path d=\"M5 14v5h14v-5\"/>", "download": "<path d=\"M12 4v12M7.5 11.5 12 16l4.5-4.5\"/><path d=\"M5 15v4h14v-4\"/>", "enhance": "<path d=\"M4 7h9M17 7h3M4 17h3M11 17h9\"/><circle cx=\"15\" cy=\"7\" r=\"2\"/><circle cx=\"9\" cy=\"17\" r=\"2\"/>", "layers": "<path d=\"m12 3 9 5-9 5-9-5 9-5Z\"/><path d=\"m3 12 9 5 9-5M3 16l9 5 9-5\"/>", "send": "<path d=\"M12 19V5M6.5 10.5 12 5l5.5 5.5\"/>", "chevronDown": "<path d=\"m7 9 5 5 5-5\"/>", "chevronRight": "<path d=\"m9 6 6 6-6 6\"/>", "close": "<path d=\"m6 6 12 12M18 6 6 18\"/>", "file": "<path d=\"M6 3.5h7l5 5v12H6v-17Z\"/><path d=\"M13 3.5v5h5M9 13h6M9 17h6\"/>", "check": "<path d=\"m5 12.5 4.2 4.2L19 7\"/>", "undo": "<path d=\"M8 7H4v-4\"/><path d=\"M4.5 7A8 8 0 1 1 5 16.8\"/>", "compass": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"m15.5 8.5-2 5-5 2 2-5 5-2Z\"/>", "blueprint": "<path d=\"M4 5h16v14H4z\"/><path d=\"M8 5v4H4M16 19v-4h4M8 13h8M12 9v8\"/>", "chart": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"/>", "figure": "<circle cx=\"6\" cy=\"12\" r=\"2.5\"/><circle cx=\"18\" cy=\"6\" r=\"2.5\"/><circle cx=\"18\" cy=\"18\" r=\"2.5\"/><path d=\"m8.4 11 7.2-4M8.4 13l7.2 4\"/>", "review": "<path d=\"M12 3 5 6v5c0 4.5 2.6 7.8 7 10 4.4-2.2 7-5.5 7-10V6l-7-3Z\"/><path d=\"m8.5 12 2.2 2.2 4.8-5\"/>", "settings": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4\"/>", "more": "<circle cx=\"5\" cy=\"12\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"12\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"19\" cy=\"12\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/>", "arrowRight": "<path d=\"M5 12h14M14 7l5 5-5 5\"/>", "external": "<path d=\"M14 4h6v6M20 4l-9 9\"/><path d=\"M18 13v7H4V6h7\"/>", "info": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 10v6M12 7h.01\"/>", "document": "<path d=\"M6 3.5h8l4 4v13H6z\"/><path d=\"M14 3.5v4h4M9 12h6M9 16h6\"/>"};
Object.assign(window.SHUYU_ICONS, {
  share: '<path d="M12 16V4M7.5 8.5 12 4l4.5 4.5"/><path d="M5 13v6h14v-6"/>',
  heart: '<path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.8 1.9Z"/>'
});
