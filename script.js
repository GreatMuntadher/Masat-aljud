const CONFIG = {
  phone: "+9647880061999",
  email: "Hr@masataljud.com",
  apiUrl: "https://script.google.com/macros/s/AKfycby9AtST9vyJReK1DSAHwYD_7cLutUJMxt2xrqZdKWhIiSKQmmLHPSj4cj1KK-UaHx4U/exec",
  applyFormUrl: "https://example.com/forms/job-application",
  // روابط Google Forms العامة المعتمدة؛ تبقى الروابط المؤقتة أدناه مانع إطلاق حتى استبدالها.
  leaveFormUrl: "https://forms.gle/fswMxBEyPF1RLxrk9",
  employeeDataFormUrl: "https://forms.gle/qs2M6pEWGbXZS7h97",
  taskRequestFormUrl: "https://forms.gle/hNnP2819eiBD1ne88",
  overtimeFormUrl: "https://forms.gle/E9KKLAbfaYvVbwzCA",
  employeeArchiveFormUrl: "https://example.com/forms/employee-archive",
  custodyRequestFormUrl: "https://forms.gle/sM9hSDeuEuTEkBju7"
};

const ADMIN_SESSION_KEY = "mhr_admin_session_v2";

// fallback محلي مؤقت فقط إلى حين نشر Phase B؛ لا يُعد بديلاً عن المصادقة الخادمية.
const LOCAL_ADMIN_FALLBACK = Object.freeze({
  mode: "local-fallback-v1",
  verifierHash: "512d4311d605bdc0d0e7b27ce3d4d2fef59173e3ddce56f55923e8c157863878",
  sessionMaxAgeMs: 8 * 60 * 60 * 1000
});

const FALLBACK_ANNOUNCEMENTS = [
  {
    title: "مرحباً بكم في بوابة الموارد البشرية | شركة ماسة الجود",
    body: "سيتم عرض إعلانات قسم الموارد البشرية في شركة ماسة الجود هنا عند توفرها.",
    date: "",
    tag: "تنبيه",
    isActive: false,
    priority: 9999,
    linkUrl: "#",
    linkText: ""
  }
];

const FALLBACK_QUICK_CARDS = [
  { quickKey: "announcements", icon: "📢", title: "الإعلانات الداخلية", description: "آخر تحديثات وتنبيهات ماسة الجود", href: "#announcements", isActive: true, sortOrder: 1, badge: "", size: "" },
  { quickKey: "forms", icon: "🗂️", title: "نماذج الموارد البشرية", description: "نماذج الموارد البشرية في مكان واحد", href: "#forms", isActive: true, sortOrder: 2, badge: "", size: "" },
  { quickKey: "leave", icon: "🗓️", title: "الإجازات والزمنيات", description: "طلب إجازة أو تسجيل دوام", href: "#forms", isActive: true, sortOrder: 3, badge: "", size: "" },
  { quickKey: "employeeData", icon: "🪪", title: "بيانات الموظفين", description: "تحديث البيانات والمستمسكات", href: "#forms", isActive: true, sortOrder: 4, badge: "", size: "" },
  { quickKey: "info", icon: "💬", title: "التواصل مع الموارد البشرية", description: "Hr@masataljud.com", href: "#info", isActive: true, sortOrder: 5, badge: "", size: "" },
  { quickKey: "policies", icon: "📚", title: "السياسات الداخلية", description: "الاطلاع على سياسات ولوائح العمل المعتمدة.", href: "#policies", isActive: true, sortOrder: 6, badge: "", size: "" }
];

const FALLBACK_FORMS = [
  { formKey: "leave", icon: "🗓️", badge: "نموذج", title: "الإجازات والزمنيات", subtitle: "تقديم طلب إجازة أو تسجيل زمنية دوام.", description: "نموذج موحد لطلبات الإجازة والزمنيات يُرسل مباشرة لقسم الموارد البشرية للمراجعة والاعتماد.", linkText: "فتح النموذج", linkUrl: CONFIG.leaveFormUrl, isActive: true, sortOrder: 1, size: "" },
  { formKey: "taskRequest", icon: "🧭", badge: "نموذج", title: "طلب مهمة العمل", subtitle: "تكليف رسمي أو مهمة عمل خارجية.", description: "نموذج لتسجيل طلبات المهام والتكليفات الرسمية الخاصة بالموظف ليتم اعتمادها من الإدارة المباشرة.", linkText: "فتح النموذج", linkUrl: CONFIG.taskRequestFormUrl, isActive: true, sortOrder: 2, size: "" },
  { formKey: "overtime", icon: "⏱️", badge: "نموذج", title: "الوقت الإضافي (أوفر تايم)", subtitle: "تقديم طلب عمل إضافي خارج ساعات الدوام.", description: "تقديم وتوثيق طلبات العمل الإضافي خارج ساعات الدوام الرسمية وفق الموافقات المعتمدة.", linkText: "فتح النموذج", linkUrl: CONFIG.overtimeFormUrl, isActive: true, sortOrder: 3, size: "" },
  { formKey: "employeeData", icon: "🪪", badge: "نموذج", title: "بيانات الموظفين", subtitle: "تحديث وتوثيق بيانات الموظفين.", description: "نموذج موحد لتحديث بيانات الموظفين ورفع المستمسكات المطلوبة لدى قسم الموارد البشرية.", linkText: "فتح النموذج", linkUrl: CONFIG.employeeDataFormUrl, isActive: true, sortOrder: 4, size: "" },
  { formKey: "custodyRequest", icon: "📦", badge: "نموذج", title: "تسليم واستلام عهدة الموظفين", subtitle: "توثيق تسليم عهدة الموظف أو استلامها.", description: "نموذج لتوثيق عمليات تسليم واستلام عهدة الموظفين بين الموظف والجهة المسؤولة.", linkText: "فتح النموذج", linkUrl: CONFIG.custodyRequestFormUrl, isActive: true, sortOrder: 5, size: "" },
  { formKey: "apply", icon: "🧾", badge: "نموذج", title: "التقديم للوظائف", subtitle: "الترشيحات والفرص المتاحة.", description: "نموذج استلام السير الذاتية والترشيحات لدى شركة ماسة الجود.", linkText: "فتح النموذج", linkUrl: CONFIG.applyFormUrl, isActive: true, sortOrder: 6, size: "" },
  { formKey: "employeeArchive", icon: "🗄️", badge: "نموذج", title: "أرشفة وتحديث بيانات الموظف", subtitle: "أرشفة المستمسكات وتحديث بيانات ملف الموظف.", description: "سجل محفوظ وغير نشط لتجنب تكرار نموذج بيانات الموظفين في الواجهة العامة.", linkText: "فتح النموذج", linkUrl: CONFIG.employeeArchiveFormUrl, isActive: false, sortOrder: 9, size: "" }
];

const FALLBACK_POLICIES = [
  { policyKey: "attendance", title: "سياسة الدوام", description: "توضيح أوقات الدوام الرسمية وضوابط الالتزام بساعات العمل المعتمدة.", fileUrl: "https://example.com/policies/attendance", icon: "🕘", version: "", updatedDate: "", order: 1, active: true, buttonText: "عرض السياسة" },
  { policyKey: "attendance-and-departure", title: "سياسة الحضور والانصراف", description: "تنظيم إجراءات تسجيل الحضور والانصراف ومعالجة الحالات والاستثناءات المعتمدة.", fileUrl: "https://example.com/policies/attendance-and-departure", icon: "🪪", version: "", updatedDate: "", order: 2, active: true, buttonText: "عرض السياسة" },
  { policyKey: "disciplinary-penalties", title: "لائحة الجزاءات والانضباط", description: "بيان قواعد الانضباط والمخالفات والجزاءات الإدارية وفق اللوائح المعتمدة.", fileUrl: "https://example.com/policies/disciplinary-penalties", icon: "⚖️", version: "", updatedDate: "", order: 3, active: true, buttonText: "عرض السياسة" },
  { policyKey: "leaves", title: "سياسة الإجازات والزمنيات", description: "توضيح أنواع الإجازات والزمنيات وإجراءات تقديمها واعتمادها.", fileUrl: "https://example.com/policies/leaves", icon: "🗓️", version: "", updatedDate: "", order: 4, active: true, buttonText: "عرض السياسة" },
  { policyKey: "training-development", title: "سياسة التدريب والتطوير", description: "تنظيم فرص التدريب والتطوير المهني وآليات الترشيح والموافقة.", fileUrl: "https://example.com/policies/training-development", icon: "🎓", version: "", updatedDate: "", order: 5, active: true, buttonText: "عرض السياسة" },
  { policyKey: "internal-rules", title: "لائحة القواعد الداخلية", description: "عرض القواعد الداخلية المنظمة لبيئة العمل وحقوق وواجبات الموظفين.", fileUrl: "https://example.com/policies/internal-rules", icon: "📘", version: "", updatedDate: "", order: 6, active: true, buttonText: "عرض السياسة" }
];

const CACHE_KEY = "mhr_cache_v1";
const CACHE_TTL_MS = 4 * 60 * 60 * 1000;

let QUICK_CARDS = [];
let FORMS = [];
let SERVICES = [];
let ANNOUNCEMENTS = [];
let POLICIES = [];

/* =========================
   Helpers
========================= */

function esc(str) {
  return (str || "").toString().replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

function toBool(v) {
  if (typeof v === "boolean") return v;

  const s = String(v ?? "").trim().toLowerCase();

  return (
    s === "true" ||
    s === "1" ||
    s === "yes" ||
    s === "y" ||
    s === "نعم"
  );
}

function toNum(v, fallback = 9999) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function formatDisplayDate(dateValue) {
  if (!dateValue) return "-";

  const raw = String(dateValue).trim();

  if (!raw) return "-";

  if (raw.includes("T")) {
    const d = new Date(raw);

    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("ar-IQ", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }

  const parts = raw.split("-");

  if (parts.length === 3) {
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    const d = new Date(year, month, day);

    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("ar-IQ", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }

  return raw;
}

function buildUrlWithParam(url, key, value) {
  const separator = url.includes("?") ? "&" : "?";
  return url + separator + encodeURIComponent(key) + "=" + encodeURIComponent(value);
}

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonpCallback_" + Date.now() + "_" + Math.floor(Math.random() * 100000);

    let script;

    window[callbackName] = function(data) {
      resolve(data);

      delete window[callbackName];

      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    script = document.createElement("script");
    script.src = buildUrlWithParam(url, "callback", callbackName);
    script.async = true;

    script.onerror = function() {
      delete window[callbackName];

      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      reject(new Error("JSONP load failed"));
    };

    document.body.appendChild(script);
  });
}

/* =========================
   Local Cache (localStorage)
========================= */

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed;
  } catch (err) {
    console.warn("تعذرت قراءة الكاش المحلي:", err);
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      quickCards: data.quickCards || [],
      forms: data.forms || [],
      services: data.services || [],
      announcements: data.announcements || [],
      policies: data.policies || [],
      fetchedAt: Date.now()
    }));
  } catch (err) {
    console.warn("تعذر حفظ الكاش المحلي:", err);
  }
}

function isCacheStale(cache) {
  if (!cache || !cache.fetchedAt) return true;
  return (Date.now() - cache.fetchedAt) > CACHE_TTL_MS;
}

/* =========================
   Pending Sync Overrides (shared with admin.js via mhr_pending_v1)
========================= */

const PENDING_KEY = "mhr_pending_v1";

function readPendingQueue() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function applyPendingOverrides(items, section, keyField) {
  const pending = readPendingQueue().filter(p => p.section === section);
  if (pending.length === 0) return items;

  let result = items.slice();

  pending.forEach(p => {
    const idx = result.findIndex(x => String(x[keyField]) === String(p.keyValue));

    if (p.action === "delete") {
      if (idx >= 0) result.splice(idx, 1);
      return;
    }

    if (idx >= 0) {
      result[idx] = { ...result[idx], ...p.row };
    } else {
      result.push(p.row);
    }
  });

  return result;
}

/* =========================
   Data Normalization
========================= */

function slugifyKey(text, index) {
  const base = String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return (base || "item") + "-" + index;
}

function ensureUniqueKeys(items, keyField, titleField) {
  const seen = new Set();

  items.forEach((item, index) => {
    let key = String(item[keyField] || "").trim();

    if (!key || seen.has(key)) {
      key = slugifyKey(item[titleField], index);
    }

    seen.add(key);
    item[keyField] = key;
  });

  return items;
}

function normalizeQuickCards(arr) {
  const items = (Array.isArray(arr) ? arr : []).map(x => ({
    quickKey: x.quickKey ?? x.QuickKey ?? "",
    icon: x.icon ?? x.Icon ?? "",
    title: x.title ?? x.Title ?? "",
    description: x.description ?? x.Description ?? "",
    href: x.href ?? x.Href ?? "#",
    isActive: x.isActive ?? x.active ?? x.IsActive ?? true,
    sortOrder: x.sortOrder ?? x.SortOrder ?? 9999,
    badge: x.badge ?? x.Badge ?? "",
    size: x.size ?? x.Size ?? ""
  }));

  return ensureUniqueKeys(items, "quickKey", "title");
}

function normalizeForms(arr) {
  const items = (Array.isArray(arr) ? arr : []).map(x => ({
    formKey: x.formKey ?? x.FormKey ?? "",
    icon: x.icon ?? x.Icon ?? "",
    badge: x.badge ?? x.Badge ?? "",
    title: x.title ?? x.Title ?? "",
    subtitle: x.subtitle ?? x.Subtitle ?? "",
    description: x.description ?? x.Description ?? "",
    linkText: x.linkText ?? x.LinkText ?? "فتح النموذج",
    linkUrl: x.linkUrl ?? x.LinkUrl ?? "#",
    isActive: x.isActive ?? x.active ?? x.IsActive ?? true,
    sortOrder: x.sortOrder ?? x.SortOrder ?? 9999,
    size: x.size ?? x.Size ?? ""
  }));

  return ensureUniqueKeys(items, "formKey", "title");
}

function normalizeAnnouncementsData(arr) {
  const items = (Array.isArray(arr) ? arr : []).map(x => ({
    id: x.id ?? x.ID ?? "",
    title: x.title ?? x.Title ?? "",
    body: x.body ?? x.Body ?? "",
    tag: x.tag ?? x.Tag ?? "",
    date: x.date ?? x.Date ?? "",
    endDate: x.endDate ?? x.EndDate ?? "",
    linkText: x.linkText ?? x.link_text ?? x.LinkText ?? "",
    linkUrl: x.linkUrl ?? x.link_url ?? x.LinkUrl ?? "#",
    isActive: x.isActive ?? x.active ?? x.IsActive ?? true,
    priority: x.priority ?? x.Priority ?? 9999
  }));

  return ensureUniqueKeys(items, "id", "title");
}

function normalizePolicies(arr) {
  const items = (Array.isArray(arr) ? arr : []).map(x => ({
    policyKey: x.policyKey ?? x.PolicyKey ?? "",
    title: x.title ?? x.Title ?? "",
    description: x.description ?? x.Description ?? "",
    fileUrl: x.fileUrl ?? x.FileUrl ?? "",
    icon: x.icon ?? x.Icon ?? "📄",
    version: x.version ?? x.Version ?? "",
    updatedDate: x.updatedDate ?? x.UpdatedDate ?? "",
    order: x.order ?? x.Order ?? 9999,
    active: x.active ?? x.Active ?? true,
    buttonText: x.buttonText ?? x.ButtonText ?? "عرض السياسة"
  }));

  return ensureUniqueKeys(items, "policyKey", "title");
}

function isSafePolicyFileUrl(value) {
  const raw = String(value || "").trim();
  if (!raw || /^(?:javascript|data):/i.test(raw)) return false;

  try {
    const parsed = new URL(raw, window.location.href);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch (err) {
    return false;
  }
}

/* =========================
   Header Scroll
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   Inject Config
========================= */

function injectConfig() {
  const hrPhoneEl = document.getElementById("hrPhone");

  if (hrPhoneEl) {
    hrPhoneEl.textContent = CONFIG.phone;
  }

  const hrEmail = document.getElementById("hrEmail");

  if (hrEmail) {
    hrEmail.textContent = CONFIG.email;
    hrEmail.href = "mailto:" + CONFIG.email;
  }

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const applyBtn = document.getElementById("applyFormBtn");

  if (applyBtn) {
    applyBtn.href = CONFIG.applyFormUrl || "#";
  }

  const applyQuickBtn = document.getElementById("applyFormQuick");

  if (applyQuickBtn) {
    applyQuickBtn.href = CONFIG.applyFormUrl || "#";
  }

  const applyBtn2 = document.getElementById("applyFormBtn2");

  if (applyBtn2) {
    applyBtn2.href = CONFIG.applyFormUrl || "#";
  }

  const formLinks = {
    leaveFormBtn: CONFIG.leaveFormUrl,
    employeeDataFormBtn: CONFIG.employeeDataFormUrl,
    taskRequestFormBtn: CONFIG.taskRequestFormUrl,
    employeeArchiveFormBtn: CONFIG.employeeArchiveFormUrl,
    custodyRequestFormBtn: CONFIG.custodyRequestFormUrl
  };

  Object.keys(formLinks).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = formLinks[id] || "#";
  });
}

/* =========================
   Reveal Observer (shared)
========================= */

let revealObserver = null;

function observeReveals() {
  if (!revealObserver) return;

  document.querySelectorAll(".reveal:not(.revealed)").forEach(item => {
    revealObserver.observe(item);
  });
}

/* =========================
   Card Size / Badge Helpers
========================= */

function sizeClass(size) {
  const s = String(size || "").trim().toLowerCase();
  return s === "wide" ? " card-size-wide" : (s === "large" ? " card-size-large" : (s === "small" ? " card-size-small" : ""));
}

function quickBadgeChip(badge) {
  const b = String(badge || "").trim();
  if (!b) return "";

  const variant = b === "جديد" ? "badge-new" : (b === "مهم" ? "badge-important" : (b === "محدث" ? "badge-updated" : "badge-new"));
  return `<span class="card-badge-chip ${variant}">${esc(b)}</span>`;
}

/* =========================
   Quick Cards
========================= */

const quickGrid = document.querySelector("#quickAccess .quick-grid");

function renderQuickCards() {
  if (!quickGrid) return;

  const active = (QUICK_CARDS || [])
    .filter(c => toBool(c.isActive ?? true))
    .sort((a, b) => toNum(a.sortOrder, 9999) - toNum(b.sortOrder, 9999));

  quickGrid.innerHTML = active.map(c => `
    <a class="quick-card reveal${sizeClass(c.size)}" href="${esc(c.href || "#")}">
      ${quickBadgeChip(c.badge)}
      <span class="quick-icon">${esc(c.icon || "")}</span>
      <strong>${esc(c.title || "")}</strong>
      <small>${esc(c.description || "")}</small>
    </a>
  `).join("");

  observeReveals();
}

/* =========================
   Forms Grid
========================= */

const formsGrid = document.querySelector("#forms .forms-grid");

function renderForms() {
  if (!formsGrid) return;

  const active = (FORMS || [])
    .filter(f => toBool(f.isActive ?? true))
    .sort((a, b) => toNum(a.sortOrder, 9999) - toNum(b.sortOrder, 9999));

  formsGrid.innerHTML = active.map(f => `
    <div class="card form-card reveal${sizeClass(f.size)}">
      <div class="card-head">
        <div>
          <h3>${esc(f.title || "")}</h3>
          <p>${esc(f.subtitle || "")}</p>
        </div>
        <span class="badge blue">${esc(f.badge || "نموذج")}</span>
      </div>
      <div class="card-body">
        <div class="icon-box">${esc(f.icon || "")}</div>
        <p class="apply-text">${esc(f.description || "")}</p>
        <a class="btn btn-primary btn-sm" href="${esc(f.linkUrl || "#")}" target="_blank" rel="noopener">${esc(f.linkText || "فتح النموذج")}</a>
      </div>
    </div>
  `).join("");

  observeReveals();
}

/* =========================
   Policies Grid
========================= */

const policiesGrid = document.getElementById("policiesGrid");

function renderPolicies() {
  if (!policiesGrid) return;

  const active = (POLICIES || [])
    .filter(policy => toBool(policy.active ?? true) && isSafePolicyFileUrl(policy.fileUrl))
    .sort((a, b) => toNum(a.order, 9999) - toNum(b.order, 9999));

  if (active.length === 0) {
    policiesGrid.innerHTML = `
      <div class="empty-state policies-empty">
        <h3>لا توجد سياسات منشورة حالياً</h3>
        <p>سيتم نشر السياسات واللوائح الداخلية المعتمدة في هذا القسم عند توفرها.</p>
      </div>
    `;
    return;
  }

  policiesGrid.innerHTML = active.map(policy => {
    const version = String(policy.version || "").trim();
    const updatedDate = String(policy.updatedDate || "").trim();
    const metadata = [
      version ? `<span>الإصدار: ${esc(version)}</span>` : "",
      updatedDate ? `<span>آخر تحديث: ${esc(formatDisplayDate(updatedDate))}</span>` : ""
    ].filter(Boolean).join("");

    return `
      <article class="card policy-card reveal">
        <div class="policy-card-top">
          <div class="policy-icon" aria-hidden="true">${esc(policy.icon || "📄")}</div>
          <span class="policy-type">وثيقة داخلية</span>
        </div>
        <div class="policy-card-content">
          <h3>${esc(policy.title || "سياسة داخلية")}</h3>
          <p>${esc(policy.description || "")}</p>
          ${metadata ? `<div class="policy-meta">${metadata}</div>` : ""}
        </div>
        <a class="btn policy-btn btn-sm" href="${esc(policy.fileUrl)}" target="_blank" rel="noopener noreferrer">
          ${esc(policy.buttonText || "عرض السياسة")}
        </a>
      </article>
    `;
  }).join("");

  observeReveals();
}

/* =========================
   Announcements
========================= */

const annList = document.getElementById("annList");

function renderAnnouncements() {
  if (!annList) return;

  annList.innerHTML = "";

  const active = (ANNOUNCEMENTS || []).filter(a => toBool(a.isActive ?? true));

  const sorted = [...active].sort((a, b) => {
    const pa = toNum(a.priority, 9999);
    const pb = toNum(b.priority, 9999);

    if (pa !== pb) return pa - pb;

    return String(b.date || "").localeCompare(String(a.date || ""));
  });

  if (sorted.length === 0) {
    annList.innerHTML = `
      <div class="empty-state">
        <h3>لا توجد إعلانات حالياً</h3>
        <p>يرجى متابعة هذه الصفحة للاطلاع على تحديثات قسم الموارد البشرية عند نشرها.</p>
      </div>
    `;
    return;
  }

  sorted.forEach(a => {
    const hasLink = a.linkUrl && a.linkUrl !== "#";
    const displayDate = formatDisplayDate(a.date);

    const wrap = document.createElement("article");
    wrap.className = "card ann-item";

    wrap.innerHTML = `
      <div class="card-body announcement-card-body">

        <div class="announcement-top">
          <span class="announcement-tag">
            🏷️ ${esc(a.tag || "إعلان")}
          </span>

          <span class="announcement-date">
            📅 ${esc(displayDate)}
          </span>
        </div>

        <h3 class="ann-title">
          ${esc(a.title || "بدون عنوان")}
        </h3>

        <p class="ann-text">
          ${esc(a.body || "")}
        </p>

        ${hasLink ? `
          <div class="ann-actions">
            <a class="btn btn-primary btn-sm" href="${esc(a.linkUrl)}" target="_blank" rel="noopener">
              ${esc(a.linkText || "عرض التفاصيل")}
            </a>
          </div>
        ` : ``}

      </div>
    `;

    annList.appendChild(wrap);
  });
}

function applySiteData(data, opts) {
  const shouldRenderAll = !opts || opts.renderAll !== false;

  let nextQuickCards = normalizeQuickCards(data.quickCards);
  if (!nextQuickCards.some(card => card.quickKey === "policies")) {
    nextQuickCards.push({ ...FALLBACK_QUICK_CARDS.find(card => card.quickKey === "policies") });
  }
  let nextForms = normalizeForms(data.forms);
  const nextServices = Array.isArray(data.services) ? data.services : [];
  let nextAnnouncements = normalizeAnnouncementsData(
    Array.isArray(data) ? data : (data.announcements || [])
  );
  const hasPoliciesData = Array.isArray(data && data.policies) || Array.isArray(data && data.Policies);
  let nextPolicies = normalizePolicies(
    hasPoliciesData ? (data.policies || data.Policies) : FALLBACK_POLICIES
  );

  nextQuickCards = applyPendingOverrides(nextQuickCards, "quickCards", "quickKey");
  nextForms = applyPendingOverrides(nextForms, "forms", "formKey");
  nextAnnouncements = applyPendingOverrides(nextAnnouncements, "announcements", "id");
  nextPolicies = applyPendingOverrides(nextPolicies, "policies", "policyKey");

  const changed = JSON.stringify({ q: nextQuickCards, f: nextForms, a: nextAnnouncements, p: nextPolicies }) !==
    JSON.stringify({ q: QUICK_CARDS, f: FORMS, a: ANNOUNCEMENTS, p: POLICIES });

  QUICK_CARDS = nextQuickCards;
  FORMS = nextForms;
  SERVICES = nextServices;
  ANNOUNCEMENTS = nextAnnouncements;
  POLICIES = nextPolicies;

  if (shouldRenderAll && changed) {
    renderQuickCards();
    renderForms();
    renderAnnouncements();
    renderPolicies();
  }

  writeCache({
    quickCards: QUICK_CARDS,
    forms: FORMS,
    services: SERVICES,
    announcements: ANNOUNCEMENTS,
    policies: POLICIES
  });
}

async function fetchSiteDataFromApi() {
  let data;

  try {
    const res = await fetch(CONFIG.apiUrl, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("API HTTP " + res.status);
    }

    data = await res.json();
  } catch (fetchError) {
    console.warn("Fetch failed, trying JSONP fallback:", fetchError);
    data = await loadJsonp(CONFIG.apiUrl);
  }

  applySiteData(data);
}

/* =========================
   Admin Login Modal
========================= */

const adminLoginModal = document.getElementById("adminLoginModal");
const adminPasswordInput = document.getElementById("adminPassword");
const adminLoginError = document.getElementById("adminLoginError");
const AUDIT_LOG_KEY = "mhr_admin_audit_log_v1";
const AUDIT_LOG_LIMIT = 1000;

function recordAdminAuditEvent(entry) {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    const errorMessage = String(entry.errorMessage ?? "").trim();
    next.push({
      id: String(entry.id || `audit-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`),
      timestamp: Number.isFinite(Number(entry.timestamp)) ? Number(entry.timestamp) : Date.now(),
      action: String(entry.action || "error").trim() || "error",
      section: String(entry.section || "auth").trim() || "auth",
      itemName: String(entry.itemName || "").trim(),
      status: String(entry.status || "success").trim() === "failed" ? "failed" : "success",
      description: String(entry.description || "").trim(),
      ...(errorMessage ? { errorMessage } : {})
    });
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(next.slice(-AUDIT_LOG_LIMIT)));
  } catch (_err) {
  }
}

function openAdminLogin() {
  if (adminLoginModal) {
    adminLoginModal.classList.add("show");
    adminLoginModal.setAttribute("aria-hidden", "false");
  }

  if (adminPasswordInput) {
    adminPasswordInput.value = "";
    setTimeout(() => adminPasswordInput.focus(), 100);
  }

  if (adminLoginError) {
    adminLoginError.textContent = sessionStorage.getItem("mhr_admin_login_notice") || "";
    sessionStorage.removeItem("mhr_admin_login_notice");
  }
}

function closeAdminLogin() {
  if (adminLoginModal) {
    adminLoginModal.classList.remove("show");
    adminLoginModal.setAttribute("aria-hidden", "true");
  }

  if (adminPasswordInput) {
    adminPasswordInput.value = "";
  }

  if (adminLoginError) {
    adminLoginError.textContent = "";
  }
}

// مسار Phase B الخادمي محفوظ وجاهز لإعادة الاستخدام بعد نشر doPost.
async function postAdminApi(payload) {
  const res = await fetch(CONFIG.apiUrl, {
    method: "POST",
    cache: "no-store",
    credentials: "omit",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("HTTP " + res.status);
  }

  const result = await res.json();

  if (!result || result.success !== true) {
    const err = new Error((result && result.error) || "تعذر تسجيل الدخول.");
    err.code = result && result.code;
    throw err;
  }

  return result;
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function submitAdminLogin() {
  const entered = (adminPasswordInput?.value || "").trim();
  const submitBtn = document.getElementById("adminLoginSubmit");

  if (!entered) {
    if (adminLoginError) adminLoginError.textContent = "أدخل كلمة المرور.";
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (adminLoginError) adminLoginError.textContent = "جاري التحقق...";

  try {
    const enteredHash = await sha256Hex(entered);

    if (enteredHash !== LOCAL_ADMIN_FALLBACK.verifierHash) {
      if (adminLoginError) adminLoginError.textContent = "كلمة المرور غير صحيحة.";
      recordAdminAuditEvent({
        action: "login",
        section: "auth",
        itemName: "الأدمن",
        status: "failed",
        description: "محاولة تسجيل دخول فاشلة.",
        errorMessage: "كلمة المرور غير صحيحة."
      });
      return;
    }

    const now = Date.now();
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      mode: LOCAL_ADMIN_FALLBACK.mode,
      proof: enteredHash,
      issuedAt: now,
      expiresAt: now + LOCAL_ADMIN_FALLBACK.sessionMaxAgeMs
    }));
    recordAdminAuditEvent({
      action: "login",
      section: "auth",
      itemName: "الأدمن",
      status: "success",
      description: "تم تسجيل الدخول إلى لوحة الأدمن."
    });

    window.location.href = "admin.html";
  } catch (err) {
    console.error("تعذر إنشاء جلسة الأدمن المحلية:", err);
    if (adminLoginError) adminLoginError.textContent = "تعذر إكمال تسجيل الدخول محلياً.";
    recordAdminAuditEvent({
      action: "login",
      section: "auth",
      itemName: "الأدمن",
      status: "failed",
      description: "تعذر إكمال تسجيل الدخول محلياً.",
      errorMessage: err && err.message ? err.message : ""
    });
  } finally {
    if (adminPasswordInput) adminPasswordInput.value = "";
    if (submitBtn) submitBtn.disabled = false;
  }
}

if (adminPasswordInput) {
  adminPasswordInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      submitAdminLogin();
    }
  });
}

if (adminLoginModal) {
  adminLoginModal.addEventListener("click", e => {
    if (e.target === adminLoginModal) {
      closeAdminLogin();
    }
  });
}

/* =========================
   Reveal Animation
========================= */

function initRevealAnimation() {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  observeReveals();
}

/* =========================
   Keyboard Shortcuts
========================= */

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAdminLogin();
  }
});

/* =========================
   Init
========================= */

function loadFromCacheOrFallback() {
  const cache = readCache();

  if (cache) {
    QUICK_CARDS = normalizeQuickCards(cache.quickCards);
    if (!QUICK_CARDS.some(card => card.quickKey === "policies")) {
      QUICK_CARDS.push({ ...FALLBACK_QUICK_CARDS.find(card => card.quickKey === "policies") });
    }
    FORMS = normalizeForms(cache.forms);
    SERVICES = Array.isArray(cache.services) ? cache.services : [];
    ANNOUNCEMENTS = normalizeAnnouncementsData(cache.announcements);
    POLICIES = normalizePolicies(Array.isArray(cache.policies) ? cache.policies : FALLBACK_POLICIES);
  } else {
    QUICK_CARDS = FALLBACK_QUICK_CARDS;
    FORMS = FALLBACK_FORMS;
    SERVICES = [];
    ANNOUNCEMENTS = FALLBACK_ANNOUNCEMENTS;
    POLICIES = FALLBACK_POLICIES;
  }

  renderQuickCards();
  renderForms();
  renderAnnouncements();
  renderPolicies();

  return cache;
}

async function syncSiteDataInBackground() {
  try {
    await fetchSiteDataFromApi();
  } catch (err) {
    console.warn("تعذر تحديث البيانات من Google Sheet، سيتم الاعتماد على آخر نسخة محفوظة:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectConfig();

  loadFromCacheOrFallback();

  initRevealAnimation();

  syncSiteDataInBackground();

  setInterval(() => {
    const current = readCache();
    if (isCacheStale(current)) {
      syncSiteDataInBackground();
    }
  }, CACHE_TTL_MS);
});
