const snippets = {
  colors: `:root {\n  --color-base: #F7F8FA;\n  --color-surface: #FFFFFF;\n  --color-tonal: #F2F4F7;\n  --color-hover: #ECEFF3;\n  --color-text: #000000;\n  --color-secondary: #666666;\n  --color-auxiliary: #999999;\n  --color-border: #E2E5E9;\n  --color-primary: #3478F6;\n  --color-primary-hover: #286CE0;\n  --color-processing: #FA8C16;\n  --color-success: #238636;\n  --color-error: #C93732;\n}`,
  typography: `:root {\n  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;\n  --type-hero: 600 40px/52px var(--font-sans);\n  --type-title: 600 20px/28px var(--font-sans);\n  --type-section: 600 18px/26px var(--font-sans);\n  --type-reading: 400 16px/26px var(--font-sans);\n  --type-body: 400 14px/22px var(--font-sans);\n  --type-meta: 400 12px/18px var(--font-sans);\n}`,
  geometry: `:root {\n  --space-1: 4px; --space-2: 8px; --space-3: 12px;\n  --space-4: 16px; --space-5: 20px; --space-6: 24px;\n  --space-7: 32px; --space-8: 40px; --space-9: 48px; --space-10: 64px;\n  --radius-compact: 6px;\n  --radius-card: 12px;\n  --radius-round: 999px;\n}`,
  layers: `.card { background: #FFF; border: 1px solid #E2E5E9; border-radius: 12px; }\n.mapping-table { width: 100%; border-collapse: collapse; table-layout: fixed; }\n.mapping-table th, .mapping-table td { padding: 16px 18px; border: 1px solid #E2E5E9; text-align: left; vertical-align: top; font: 400 14px/22px var(--font-sans); }\n.mapping-table thead th { background: #F2F4F7; font-weight: 500; }\n.mapping-table .pain-cell { background: #FFF7F6; }\n.mapping-table .value-cell { background: #F3FBF5; }\n.open-columns { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }\n.open-columns::before { content: ""; position: absolute; inset: 24px auto 24px 50%; width: 1px; background: #E2E5E9; }\n.readonly-example { color: #666; background: #FAFAFA; border: 1px solid #C9CDD4; border-radius: 6px; }\n.upload-zone { background: #FAFAFA; border: 1px dashed #C9CDD4; border-radius: 6px; }\n.tag-mode { color: #2468D7; background: #EDF4FF; border: 1px solid #C7DCFF; }\n.tag-language { color: #238636; background: #F3FBF5; border: 1px solid #B7EBC7; }\n.tag-style { color: #B85C00; background: #FFF7E8; border: 1px solid #FFD8A8; }\n.deliverable { background: #F3FBF5; border: 1px solid #B7EBC7; border-radius: 6px; }`,
  icons: `.icon-ui { width: 18px; height: 18px; color: currentColor; }\n.icon-nav { width: 20px; height: 20px; }\n.icon-capability { width: 24px; height: 24px; }\n.icon-with-label { min-height: 40px; display: inline-flex; align-items: center; gap: 8px; padding: 0; color: #666; background: transparent; border: 0; }\n.icon-send { width: 40px; height: 40px; display: grid; place-items: center; color: #FFF; background: #3478F6; border: 0; border-radius: 50%; }\n/* 轻量图标文字操作无背景；纯图标按钮必须提供 aria-label 与 Tooltip。 */`,
  buttons: `.button { height: 40px; padding: 0 18px; border-radius: 999px; font: 500 14px/22px var(--font-sans); }\n.button-primary { color: #FFF; background: #3478F6; border: 1px solid #3478F6; }\n.button-primary-outline { color: #3478F6; background: #FFF; border: 1px solid #3478F6; }\n.button-secondary { color: #000; background: #FFF; border: 1px solid #E2E5E9; }\n.create-entry { width: 236px; height: 48px; color: #FFF; background: #3478F6; border: 1px solid #3478F6; border-radius: 999px; }\n.create-entry + .create-entry { margin-top: 16px; }`,
  skeleton: `.app-shell { --sidebar: 260px; --header: 56px; --right-panel: 400px; --safe-inline: 38px; --track-dialog: 800px; --track-standard: 960px; min-height: 100vh; display: grid; grid-template-columns: var(--sidebar) minmax(0, 1fr); grid-template-rows: var(--header) minmax(0, 1fr); }\n.sidebar { grid-row: 1 / -1; width: var(--sidebar); }\n.top-navigation { grid-column: 2; height: var(--header); }\n.content-track { width: min(var(--track), calc(100% - 76px)); margin-inline: auto; }\n.dialog-page { --track: var(--track-dialog); }\n.standard-page, .empty-page { --track: var(--track-standard); }\n.right-panel { width: var(--right-panel); }\n.composer { width: 760px; min-height: 140px; margin: 0 auto 24px; border-radius: 16px; }`,
  freeChat: `.conversation { width: 800px; margin-inline: auto; }\n.assistant-message, .user-message { font: 400 16px/26px var(--font-sans); }\n.user-message { max-width: 78%; padding: 12px 16px; background: #F2F4F7; border-radius: 18px 18px 4px 18px; }\n.intent-confirmation { display: grid; justify-items: start; gap: 10px; }\n.intent-option { min-height: 52px; padding: 10px 44px 10px 16px; background: #F7F8FA; border: 1px solid #E2E5E9; border-radius: 12px; }\n.input-configuration { padding: 22px; background: #F7F8FA; border: 1px solid #E2E5E9; border-radius: 12px; }\n.input-configuration input, .input-configuration textarea { background: #FFF; }\n.capability-list { display: grid; grid-auto-flow: column; grid-auto-columns: 260px; gap: 16px; overflow-x: auto; }\n.capability-card { position: relative; width: 260px; height: 108px; padding: 16px; background: #F7F8FA; border: 1px solid #E2E5E9; border-radius: 12px; }\n.capability-card .icon { position: absolute; top: 16px; right: 16px; width: 30px; height: 30px; }\n.capability-card .content { padding-right: 48px; }\n.capability-card .description { margin-top: 8px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }\n.intent-option:hover, .capability-card:hover { background: #FFF; border-color: #3478F6; }\n.intent-option[aria-selected=\"true\"] { color: #000; background: #FFF; border-color: #3478F6; }\n.intent-option[aria-selected=\"true\"]::after { color: #3478F6; }\n.input-configuration :is(input, select, textarea):hover, .upload-zone:hover { border-color: #3478F6; }\n.delivery-grid { display: grid; grid-template-columns: repeat(2, 380px); gap: 16px; }\n.delivery-card { width: 380px; height: 76px; padding: 14px; background: #F7F8FA; border: 1px solid #E2E5E9; border-radius: 12px; }\n.delivery-card:hover { background: #FFF; border-color: #3478F6; }\n.delivery-card .download { color: #999; }\n.delivery-card .download:hover { color: #3478F6; background: #EEF5FF; }`,
  taskChat: `.task-track-card { width: 800px; height: 112px; background: #FFF; border: 1px solid #E2E5E9; border-radius: 16px; }\n.task-track span { font: 400 14px/22px sans-serif; }\n.task-track i { color: #1F2329; }\n.task-track .accent { stroke: #3478F6; }\n/* 仅保留图标、节点名称和状态，不设置卡片标题。 */`,
  workflows: `.capability-page { --sidebar: 260px; --track: 960px; --safe-inline: 38px; display: grid; grid-template-columns: var(--sidebar) minmax(0, 1fr); grid-template-rows: 56px minmax(0, 1fr); }\n.capability-sidebar { grid-column: 1; grid-row: 1 / -1; width: var(--sidebar); background: #F7F8FA; border-right: 1px solid #E2E5E9; }\n.capability-page-header { grid-column: 2; height: 56px; background: #FFF; border-bottom: 1px solid #E2E5E9; }\n.capability-page-body { grid-column: 2; display: block; overflow: auto; }\n.channel-main { width: min(var(--track), calc(100% - 76px)); margin-inline: auto; }\n/* 能力及管理类页面统一使用 960px 内容轨道。 */`,
  workflowDetail: `.workflow-detail { width: min(960px, calc(100% - 76px)); margin-inline: auto; }\n.workflow-namecard { padding-block: 40px 34px; }\n.detail-anchor { position: sticky; top: 56px; display: flex; gap: 28px; border-bottom: 1px solid #E2E5E9; background: #FFF; }\n.detail-section { padding-block: 46px; border-bottom: 1px solid #E2E5E9; }\n/* 详情内容保持开放，右侧助手默认隐藏。 */`
};

// Keep the copyable specification snippets aligned with the rendered radius system.
snippets.geometry = snippets.geometry.replace("--radius-card: 12px", "--radius-card: 8px");
snippets.layers = snippets.layers
  .replace("border-radius: 12px;", "border-radius: 8px;")
  .replace(".deliverable { background: #F3FBF5; border: 1px solid #B7EBC7; border-radius: 6px; }", ".deliverable { background: #F3FBF5; border: 1px solid #B7EBC7; border-radius: 8px; }");
snippets.freeChat = snippets.freeChat
  .replaceAll("border-radius: 12px;", "border-radius: 8px;")
  .replace(".input-configuration input, .input-configuration textarea { background: #FFF; }", ".input-configuration input, .input-configuration select, .input-configuration textarea, .upload-zone { background: #FFF; border-radius: 6px; }")
  .replaceAll("background: #F7F8FA; border: 1px solid #E2E5E9; border-radius: 8px;", "background: #FFF; border: 1px solid #E2E5E9; border-radius: 8px;")
  .replace(".input-configuration { padding: 22px; background: #FFF;", ".input-configuration { width: min(760px, 100%); margin-inline: auto; padding: 22px; background: #F7F8FA;")
  .replace(".intent-option:hover, .capability-card:hover { background: #FFF; border-color: #3478F6; }", ".intent-option:hover, .capability-card:hover { background: #F7F8FA; border-color: #E2E5E9; }")
  .replace(".delivery-card:hover { background: #FFF; border-color: #3478F6; }", ".delivery-card:hover { background: #F7F8FA; border-color: #E2E5E9; }");
snippets.taskChat = snippets.taskChat.replace("border-radius: 16px;", "border-radius: 8px;");
snippets.navigation = `.anchor-navigation { position: sticky; top: 60px; height: 64px; display: flex; align-items: flex-end; gap: 28px; background: #FFF; border-bottom: 1px solid #E2E5E9; }\n.anchor-navigation a { height: 48px; display: flex; align-items: center; color: #666; font: 400 14px/22px var(--font-sans); }\n.anchor-navigation a[aria-current="true"] { color: #3478F6; font-weight: 500; border-bottom: 2px solid #3478F6; }\n.channel-switch { width: 292px; height: 48px; display: inline-flex; align-items: center; background: #FFF; border: 1px solid #E2E5E9; border-radius: 999px; }\n.channel-switch a { width: 146px; height: 48px; border: 1px solid transparent; border-radius: 999px; font-size: 14px; }\n.channel-switch a[aria-selected="true"] { height: 52px; color: #3478F6; background: #E3EDFF; border-color: #3478F6; box-shadow: 0 5px 14px rgba(52,120,246,.16); }`;
snippets.filters = `.primary-filter { display: flex; gap: 26px; border-bottom: 1px solid #E2E5E9; }\n.primary-filter [aria-selected="true"] { color: #3478F6; border-bottom: 2px solid #3478F6; }\n.secondary-filter { display: flex; flex-wrap: wrap; gap: 10px; }\n.secondary-filter button { height: 36px; padding: 0 12px; color: #666; background: #F7F8FA; border: 1px solid transparent; border-radius: 6px; }\n.secondary-filter button:hover { color: #000; background: #FFF; border-color: #E2E5E9; }\n.secondary-filter button[aria-selected="true"] { color: #3478F6; background: #FFF; border-color: #3478F6; }`;

const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".copy-css").forEach((button) => {
  button.addEventListener("click", async () => {
    const content = snippets[button.dataset.copy];
    try {
      await navigator.clipboard.writeText(content);
      const original = button.textContent;
      button.textContent = "✓ 已复制";
      button.disabled = true;
      showToast("CSS 样式已复制");
      window.setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1500);
    } catch {
      showToast("复制失败，请重试");
    }
  });
});

const topbarHeight = 60;
document.querySelectorAll(".toc a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - topbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", link.getAttribute("href"));
  });
});

document.querySelectorAll("[data-upcoming]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(`${link.dataset.upcoming}频道将在样板确认后同步制作`);
  });
});

const tocLinks = [...document.querySelectorAll(".toc a")];
const sections = [...document.querySelectorAll(".doc-section")];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  tocLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-20% 0px -68% 0px", threshold: [0, .1, .4] });
sections.forEach((section) => observer.observe(section));

document.querySelectorAll(".intent-list").forEach((list) => {
  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      list.querySelectorAll("button").forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-selected", "false");
      });
      button.classList.add("selected");
      button.setAttribute("aria-selected", "true");
    });
  });
});

document.querySelectorAll(".channel-switch").forEach((switcher) => {
  switcher.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      switcher.querySelectorAll('[role="tab"]').forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
    });
  });
});

document.querySelectorAll(".channel-tabs, .primary-filter-row > div, .secondary-filter-row > div").forEach((tablist) => {
  const tabs = tablist.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
    });
  });
});

document.querySelectorAll(".page-tabs").forEach((tablist) => {
  tablist.querySelectorAll("a").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      tablist.querySelectorAll("a").forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("active", selected);
        if (selected) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
    });
  });
});

document.querySelectorAll(".anchor-navigation-demo").forEach((navigation) => {
  navigation.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      navigation.querySelectorAll("a").forEach((item) => {
        const selected = item === anchor;
        item.classList.toggle("active", selected);
        if (selected) item.setAttribute("aria-current", "true");
        else item.removeAttribute("aria-current");
      });
    });
  });
});

document.querySelectorAll(".primary-filter > div, .secondary-filter > div").forEach((group) => {
  const options = group.querySelectorAll("button");
  options.forEach((option) => {
    option.setAttribute("aria-selected", String(option.classList.contains("active")));
    option.addEventListener("click", () => {
      options.forEach((item) => {
        const selected = item === option;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
    });
  });
});

if (location.pathname.endsWith("/free-chat.html")) {
  const updateSpec = (sectionId, label, value) => {
    const rows = document.querySelectorAll(`${sectionId} .style-description dl > div`);
    const row = [...rows].find((item) => item.querySelector("dt")?.textContent.trim() === label);
    if (row) row.querySelector("dd").textContent = value;
  };
  updateSpec("#chat-guidance", "外观", "白色背景，#E2E5E9 边框，圆角 8px");
updateSpec("#chat-config", "模块容器", "最大宽度 760px，内边距 22px，#F7F8FA 背景，#E2E5E9 边框，圆角 8px");
  updateSpec("#chat-config", "输入控件", "白色背景，#C9CDD4 边框，圆角 6px，文字 14px / 22px");
  updateSpec("#chat-capability", "文字与交互", "默认白底、灰色边框、圆角 8px；悬停切换为 #F7F8FA，边框保持灰色");
  updateSpec("#chat-delivery", "外观", "默认白色背景，#E2E5E9 边框，圆角 8px；悬停切换为 #F7F8FA");
  updateSpec("#chat-delivery", "内容网格", "内边距 14px，图标与文字间距 12px；文件图标 30px × 36px，复用 Ant Design X FileCard 的实色折角风格");
  updateSpec("#chat-delivery", "交互", "整卡点击预览；下载按钮 28px，下载图标 20px、线宽 2px；默认灰色，悬停切换品牌蓝");

  const fileIcons = {
    "file-md": '<svg class="file-letter" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 14V4h2.7L9 9.4 12.3 4H15v10h-2.5V8.1L9 13.5 5.5 8.1V14z"/></svg>',
    "file-image": '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="6" cy="6" r="1.3" fill="#fff" stroke="none"/><path d="M3.5 13l3.2-3 2.2 2 2.3-3 3.3 4"/></svg>',
    "file-ppt": '<svg class="file-letter" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.2 15V3h5.1c3 0 4.7 1.6 4.7 4.2 0 2.7-1.8 4.3-4.9 4.3H7V15zm2.8-6h2c1.4 0 2.2-.6 2.2-1.8 0-1.1-.8-1.7-2.2-1.7H7z"/></svg>',
    "file-doc": '<svg class="file-letter" viewBox="0 0 18 18" aria-hidden="true"><path d="M1.8 3h2.8l1.7 7.7L8 3h2.2l1.7 7.7L13.6 3h2.7l-3 12h-2.6L9 8.2 7.3 15H4.7z"/></svg>',
    "file-pdf": '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M8.8 2.2c-.7 3.2.2 6.5 2.4 9.2 1.3 1.6 2.7 2.7 3.8 2.9.8.1 1.1-.6.6-1.2-.8-1-3.6-1.1-6.4-.5-2.8.6-5.5 1.8-6.5 2.8-.6.6-.1 1.3.7 1 1.8-.8 3.6-3.5 4.8-6.1 1.3-2.8 2-5.7 1.5-7.8-.2-.8-.8-.9-.9-.3z"/></svg>'
  };
  document.querySelectorAll(".delivery-file-icon").forEach((icon) => {
    const type = [...icon.classList].find((name) => fileIcons[name]);
    if (type) icon.innerHTML = fileIcons[type];
  });

  const deliveryHeading = document.querySelector("#chat-delivery .style-description h3");
  if (deliveryHeading && !document.querySelector("#chat-delivery .component-reference")) {
    const reference = document.createElement("p");
    reference.className = "component-reference";
    reference.innerHTML = '组件参考：<a href="https://ant-design-x.antgroup.com/components/file-card-cn" target="_blank" rel="noreferrer">Ant Design X · FileCard</a><span>文件类型图标优先复用 PresetIcons</span>';
    deliveryHeading.insertAdjacentElement("afterend", reference);
  }
}

if (location.pathname.endsWith("/task-chat.html")) {
  const componentReferences = [
    ["#think", "Think", "https://ant-design-x.antgroup.com/components/think-cn"],
    ["#chain", "ThoughtChain", "https://ant-design-x.antgroup.com/components/thought-chain-cn"]
  ];
  componentReferences.forEach(([sectionId, name, href]) => {
    const heading = document.querySelector(`${sectionId} .section-heading`);
    if (!heading || document.querySelector(`${sectionId} .component-reference`)) return;
    const reference = document.createElement("p");
    reference.className = "component-reference task-component-reference";
    reference.innerHTML = `<a href="${href}" target="_blank" rel="noreferrer">复用 Ant Design X · ${name}<span>点击查看 →</span></a>`;
    heading.insertAdjacentElement("afterend", reference);
  });
}

if (location.hash) {
  const section = document.querySelector(location.hash);
  if (section) window.setTimeout(() => window.scrollTo({ top: section.offsetTop - topbarHeight }), 0);
}
