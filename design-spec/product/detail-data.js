window.SHUYU_PEER_REVIEW = {
 id: 'peer-review', title: '同行评审', category: '科研写作', tag: '论文写作与投稿',
 summary: '帮你找出论文或基金申请中的关键问题，区分重大意见与细节问题，形成带有具体修改建议的评审报告，让下一步修改更有重点。',
 input: '论文或基金申请材料，支持 DOCX、PDF。', output: '正式评审报告、重大意见、小问题及作者问题清单。', goal: '检查研究方法、统计、报告规范、伦理与写作质量，形成可执行的评审意见。',
 steps: ['读取评审材料','检查方法与规范','梳理重大问题','整理修改建议','形成评审报告'],
 scenarios: ['投稿前预审','导师审阅学生论文','期刊同行评审','基金申请内部评审','研究团队质量把关'], tags: ['同行评审','论文修改']
};
if (document.body.dataset.page === 'detail') window.SHUYU_WORKFLOWS.push(window.SHUYU_PEER_REVIEW);
