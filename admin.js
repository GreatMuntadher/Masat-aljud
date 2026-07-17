const ADMIN_SESSION_KEY = "mhr_admin_session_v2";
const CACHE_KEY = "mhr_cache_v1";
const PENDING_KEY = "mhr_pending_v1";
const PENDING_CACHE_KEY = "mhr_cache_before_pending_v1";
const ADMIN_LAST_TAB_KEY = "mhr_admin_last_tab_v1";
const AUDIT_LOG_KEY = "mhr_admin_audit_log_v1";
const AUDIT_LOG_LIMIT = 1000;
const AUDIT_CLEAR_PASSWORD_HASH = "cc7ae77420f6bf46a0fc93df7b301d2225b5d0cd4ab978a44e63ee0ccb51bfb7";

const LOCAL_ADMIN_FALLBACK = Object.freeze({
  mode: "local-fallback-v1",
  verifierHash: "512d4311d605bdc0d0e7b27ce3d4d2fef59173e3ddce56f55923e8c157863878"
});

const ADMIN_CONFIG = {
  apiUrl: "https://script.google.com/macros/s/AKfycby9AtST9vyJReK1DSAHwYD_7cLutUJMxt2xrqZdKWhIiSKQmmLHPSj4cj1KK-UaHx4U/exec"
};

const FALLBACK_POLICIES = [
  { policyKey: "attendance", title: "سياسة الدوام", description: "توضيح أوقات الدوام الرسمية وضوابط الالتزام بساعات العمل المعتمدة.", fileUrl: "https://example.com/policies/attendance", icon: "🕘", version: "", updatedDate: "", order: 1, active: true, buttonText: "عرض السياسة" },
  { policyKey: "attendance-and-departure", title: "سياسة الحضور والانصراف", description: "تنظيم إجراءات تسجيل الحضور والانصراف ومعالجة الحالات والاستثناءات المعتمدة.", fileUrl: "https://example.com/policies/attendance-and-departure", icon: "🚪", version: "", updatedDate: "", order: 2, active: true, buttonText: "عرض السياسة" },
  { policyKey: "disciplinary-penalties", title: "لائحة الجزاءات والانضباط", description: "بيان قواعد الانضباط والمخالفات والجزاءات الإدارية وفق اللوائح المعتمدة.", fileUrl: "https://example.com/policies/disciplinary-penalties", icon: "⚖️", version: "", updatedDate: "", order: 3, active: true, buttonText: "عرض السياسة" },
  { policyKey: "leaves", title: "سياسة الإجازات والزمنيات", description: "توضيح أنواع الإجازات والزمنيات وإجراءات تقديمها واعتمادها.", fileUrl: "https://example.com/policies/leaves", icon: "📅", version: "", updatedDate: "", order: 4, active: true, buttonText: "عرض السياسة" },
  { policyKey: "training-development", title: "سياسة التدريب والتطوير", description: "تنظيم فرص التدريب والتطوير المهني وآليات الترشيح والموافقة.", fileUrl: "https://example.com/policies/training-development", icon: "🎓", version: "", updatedDate: "", order: 5, active: true, buttonText: "عرض السياسة" },
  { policyKey: "internal-rules", title: "لائحة القواعد الداخلية", description: "عرض القواعد الداخلية المنظمة لبيئة العمل وحقوق وواجبات الموظفين.", fileUrl: "https://example.com/policies/internal-rules", icon: "📘", version: "", updatedDate: "", order: 6, active: true, buttonText: "عرض السياسة" }
];

const FALLBACK_ADMIN_CARDS = [
  { adminKey: "admin-card-sample", title: "سجل تجريبي غير نشط", description: "بطاقة تجريبية محفوظة للتوافق والاختبار فقط.", icon: "🧪", category: "تجريبي", buttonText: "عرض الملف", tag: "تجريبي", linkText: "عرض الملف", linkUrl: "https://example.com/admin/sample", isActive: false, sortOrder: 999, size: "" },
  { adminKey: "employee-records", title: "ملفات الموظفين", description: "الوصول إلى السجلات الأساسية والملفات المعتمدة الخاصة ببيانات الموظفين.", icon: "🗂️", category: "الموظفون", buttonText: "فتح الملف", tag: "الموظفون", linkText: "فتح الملف", linkUrl: "https://example.com/admin/employee-records", isActive: true, sortOrder: 1, size: "" },
  { adminKey: "attendance-register", title: "سجل الحضور والانصراف", description: "متابعة حضور الموظفين والانصراف وسجلات الدوام المعتمدة.", icon: "🕘", category: "الدوام", buttonText: "فتح الملف", tag: "الدوام", linkText: "فتح الملف", linkUrl: "https://example.com/admin/attendance", isActive: true, sortOrder: 2, size: "" },
  { adminKey: "leaves-register", title: "سجل الإجازات والزمنيات", description: "سجل طلبات الإجازات والزمنيات والاعتمادات المرتبطة بها.", icon: "📅", category: "الطلبات", buttonText: "فتح الملف", tag: "الطلبات", linkText: "فتح الملف", linkUrl: "https://example.com/admin/leaves", isActive: true, sortOrder: 3, size: "" },
  { adminKey: "overtime-register", title: "سجل الوقت الإضافي", description: "متابعة ساعات الوقت الإضافي والاعتمادات الخاصة بها.", icon: "⏱️", category: "الدوام", buttonText: "فتح الملف", tag: "الدوام", linkText: "فتح الملف", linkUrl: "https://example.com/admin/overtime", isActive: true, sortOrder: 4, size: "" },
  { adminKey: "assets-register", title: "سجل عهد الموظفين", description: "متابعة العهد والأصول المسلمة للموظفين وحالات الاستلام والتسليم.", icon: "📦", category: "الموظفون", buttonText: "فتح الملف", tag: "الموظفون", linkText: "فتح الملف", linkUrl: "https://example.com/admin/assets", isActive: true, sortOrder: 5, size: "" },
  { adminKey: "evaluations-followups", title: "ملفات التقييم والمتابعة", description: "ملفات التقييم الدوري وخطط المتابعة والإجراءات المرتبطة بها.", icon: "📈", category: "المتابعات", buttonText: "فتح الملف", tag: "المتابعات", linkText: "فتح الملف", linkUrl: "https://example.com/admin/evaluations", isActive: true, sortOrder: 6, size: "" },
  { adminKey: "contracts-files", title: "ملفات العقود", description: "الوصول السريع إلى ملفات العقود والتجديدات والنماذج المرتبطة بها.", icon: "📄", category: "العقود", buttonText: "فتح الملف", tag: "العقود", linkText: "فتح الملف", linkUrl: "https://example.com/admin/contracts", isActive: true, sortOrder: 7, size: "" },
  { adminKey: "talent-pool", title: "ملف التوظيف والمرشحين", description: "إدارة قاعدة المرشحين وملفات التقديم والمتابعة الخاصة بالتوظيف.", icon: "🎯", category: "التوظيف", buttonText: "فتح الملف", tag: "التوظيف", linkText: "فتح الملف", linkUrl: "https://example.com/admin/talent-pool", isActive: true, sortOrder: 8, size: "" },
  { adminKey: "hr-calendar", title: "تقويم الموارد البشرية", description: "الوصول إلى تقويم الموارد البشرية والمتابعات والمواعيد الداخلية.", icon: "🗓️", category: "المتابعات", buttonText: "فتح الملف", tag: "المتابعات", linkText: "فتح الملف", linkUrl: "https://example.com/admin/hr-calendar", isActive: true, sortOrder: 9, size: "" },
  { adminKey: "payroll-dues", title: "سجل الرواتب والاستحقاقات", description: "ملفات الرواتب والاستحقاقات والبيانات المالية المرتبطة بها.", icon: "💼", category: "المالية", buttonText: "فتح الملف", tag: "المالية", linkText: "فتح الملف", linkUrl: "https://example.com/admin/payroll", isActive: true, sortOrder: 10, size: "" }
];

const cardsContainer = document.getElementById("adminCardsList");

let DATA = {
  quickCards: [],
  forms: [],
  services: [],
  announcements: [],
  adminCards: [],
  policies: []
};

let LAST_ADMIN_CARDS = [];
let currentEditSection = null;
let currentEditKeyValue = null;
let mutationBusy = false;

const SECTION_META = {
  adminCards: {
    title: "ملف إداري",
    emptyTitle: "الملفات الإدارية",
    keyField: "adminKey",
    titleField: "title",
    listId: "adminCardsManageList",
    orderField: "sortOrder",
    activeField: "isActive",
    fields: [
      { key: "adminKey", label: "المفتاح الثابت", type: "text", required: true },
      { key: "title", label: "اسم الملف", type: "text", required: true },
      { key: "description", label: "الوصف", type: "textarea" },
      { key: "icon", label: "الأيقونة", type: "text" },
      { key: "category", label: "التصنيف", type: "text" },
      { key: "buttonText", label: "نص الزر", type: "text", default: "فتح الملف" },
      { key: "linkUrl", label: "الرابط", type: "text", isLink: true },
      { key: "size", label: "الحجم", type: "select", options: ["", "small", "medium", "large", "wide"] },
      { key: "sortOrder", label: "ترتيب الظهور", type: "number" },
      { key: "isActive", label: "نشط", type: "status", default: true }
    ]
  },
  quickCards: {
    title: "كرت سريع",
    keyField: "quickKey",
    titleField: "title",
    listId: "quickCardsManageList",
    orderField: "sortOrder",
    activeField: "isActive",
    fields: [
      { key: "quickKey", label: "المفتاح الفريد", type: "text", required: true },
      { key: "title", label: "العنوان", type: "text", required: true },
      { key: "description", label: "الوصف", type: "text" },
      { key: "icon", label: "الأيقونة", type: "text" },
      { key: "href", label: "الرابط", type: "text", required: true, isLink: true },
      { key: "badge", label: "الشارة", type: "select", options: ["", "جديد", "مهم", "محدث"] },
      { key: "size", label: "الحجم", type: "select", options: ["", "small", "medium", "large", "wide"] },
      { key: "sortOrder", label: "ترتيب الظهور", type: "number" },
      { key: "isActive", label: "نشط", type: "status", default: true }
    ]
  },
  forms: {
    title: "نموذج",
    keyField: "formKey",
    titleField: "title",
    listId: "formsManageList",
    orderField: "sortOrder",
    activeField: "isActive",
    fields: [
      { key: "formKey", label: "المفتاح الفريد", type: "text", required: true },
      { key: "title", label: "اسم النموذج", type: "text", required: true },
      { key: "subtitle", label: "وصف مختصر", type: "text" },
      { key: "description", label: "الوصف الكامل", type: "textarea" },
      { key: "icon", label: "الأيقونة", type: "text" },
      { key: "badge", label: "الشارة", type: "text" },
      { key: "linkText", label: "نص الزر", type: "text", default: "فتح النموذج" },
      { key: "linkUrl", label: "الرابط", type: "text", required: true, isLink: true },
      { key: "size", label: "الحجم", type: "select", options: ["", "small", "medium", "large", "wide"] },
      { key: "sortOrder", label: "ترتيب الظهور", type: "number" },
      { key: "isActive", label: "نشط", type: "status", default: true }
    ]
  },
  services: {
    title: "خدمة",
    keyField: "serviceKey",
    titleField: "title",
    listId: "servicesManageList",
    orderField: "sortOrder",
    activeField: "isActive",
    fields: [
      { key: "serviceKey", label: "المفتاح الفريد", type: "text", required: true },
      { key: "title", label: "اسم الخدمة", type: "text", required: true },
      { key: "subtitle", label: "وصف مختصر", type: "text" },
      { key: "description", label: "الوصف الكامل", type: "textarea" },
      { key: "tag", label: "التصنيف", type: "text" },
      { key: "linkText", label: "نص الزر", type: "text", default: "فتح الخدمة" },
      { key: "linkUrl", label: "الرابط", type: "text", required: true, isLink: true },
      { key: "size", label: "الحجم", type: "select", options: ["", "small", "medium", "large", "wide"] },
      { key: "sortOrder", label: "ترتيب الظهور", type: "number" },
      { key: "isActive", label: "نشط", type: "status", default: true }
    ]
  },
  announcements: {
    title: "إعلان",
    keyField: "id",
    titleField: "title",
    listId: "announcementsManageList",
    orderField: "priority",
    activeField: "isActive",
    fields: [
      { key: "id", label: "المعرف", type: "text", required: true },
      { key: "title", label: "العنوان", type: "text", required: true },
      { key: "body", label: "النص", type: "textarea" },
      { key: "tag", label: "الوسم", type: "text" },
      { key: "date", label: "تاريخ البداية", type: "date" },
      { key: "endDate", label: "تاريخ النهاية", type: "date" },
      { key: "linkText", label: "نص الرابط", type: "text" },
      { key: "linkUrl", label: "الرابط", type: "text", isLink: true },
      { key: "priority", label: "الأولوية", type: "number" },
      { key: "isActive", label: "نشط", type: "status", default: true }
    ]
  },
  policies: {
    title: "سياسة",
    keyField: "policyKey",
    titleField: "title",
    listId: "policiesManageList",
    orderField: "order",
    activeField: "active",
    fields: [
      { key: "policyKey", label: "المفتاح الفريد", type: "text", required: true },
      { key: "title", label: "اسم السياسة", type: "text", required: true },
      { key: "description", label: "الوصف", type: "textarea" },
      { key: "fileUrl", label: "رابط الملف", type: "text", required: true, isLink: true },
      { key: "icon", label: "الأيقونة", type: "text" },
      { key: "version", label: "الإصدار", type: "text" },
      { key: "updatedDate", label: "آخر تحديث", type: "date" },
      { key: "order", label: "ترتيب الظهور", type: "number" },
      { key: "active", label: "نشط", type: "status", default: true },
      { key: "buttonText", label: "نص الزر", type: "text", default: "عرض السياسة" }
    ]
  }
};

let listFilters = {
  adminCards: { q: "", status: "all", category: "all" },
  quickCards: { q: "", status: "all" },
  forms: { q: "", status: "all" },
  services: { q: "", status: "all" },
  announcements: { q: "", status: "all" },
  policies: { q: "", status: "all" }
};

let auditFilters = {
  section: "all",
  action: "all",
  status: "all"
};

const AUDIT_SECTION_LABELS = {
  auth: "المصادقة",
  adminCards: "الملفات الإدارية",
  quickCards: "الكروت السريعة",
  forms: "النماذج",
  services: "الخدمات",
  announcements: "الإعلانات",
  policies: "السياسات واللوائح",
  sync: "المزامنة",
  system: "النظام"
};

const AUDIT_ACTION_LABELS = {
  login: "تسجيل الدخول",
  logout: "تسجيل الخروج",
  create: "إضافة عنصر",
  update: "تعديل عنصر",
  delete: "حذف عنصر",
  activate: "تفعيل",
  deactivate: "تعطيل",
  reorder: "تغيير الترتيب",
  "clear-pending": "مسح العمليات المعلقة",
  "clear-audit": "مسح سجل النشاط",
  error: "خطأ إداري"
};

function normalizeAuditEntry(entry) {
  if (!entry || typeof entry !== "object") return null;

  const timestamp = Number(entry.timestamp);
  const errorMessage = String(entry.errorMessage ?? "").trim();

  return {
    id: String(entry.id || `audit-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`),
    timestamp: Number.isFinite(timestamp) ? timestamp : Date.now(),
    action: String(entry.action || "error").trim() || "error",
    section: String(entry.section || "system").trim() || "system",
    itemName: String(entry.itemName || "").trim(),
    status: String(entry.status || "success").trim() === "failed" ? "failed" : "success",
    description: String(entry.description || "").trim(),
    ...(errorMessage ? { errorMessage } : {})
  };
}

function readAuditLog() {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeAuditEntry).filter(Boolean);
  } catch (_err) {
    return [];
  }
}

function writeAuditLog(items) {
  try {
    const next = (Array.isArray(items) ? items : []).map(normalizeAuditEntry).filter(Boolean).slice(-AUDIT_LOG_LIMIT);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(next));
  } catch (_err) {
  }
}

function logAuditEvent(entry) {
  const next = readAuditLog();
  next.push(normalizeAuditEntry(entry));
  writeAuditLog(next);
}

function clearAuditLogStorage() {
  localStorage.removeItem(AUDIT_LOG_KEY);
}

function getAuditSectionLabel(section) {
  return AUDIT_SECTION_LABELS[section] || (section ? String(section) : "النظام");
}

function getAuditActionLabel(action) {
  return AUDIT_ACTION_LABELS[action] || (action ? String(action) : "خطأ إداري");
}

function getAuditStatusLabel(status) {
  return status === "failed" ? "فاشلة" : "ناجحة";
}

function formatAuditTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ar-IQ");
}

function filterAuditEntries(entries) {
  return (entries || []).filter(entry => {
    if (auditFilters.section !== "all" && entry.section !== auditFilters.section) return false;
    if (auditFilters.action !== "all" && entry.action !== auditFilters.action) return false;
    if (auditFilters.status !== "all" && entry.status !== auditFilters.status) return false;
    return true;
  });
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function readAdminSession() {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.expiresAt || Date.now() >= Number(parsed.expiresAt)) return null;

    if (parsed.mode === LOCAL_ADMIN_FALLBACK.mode) {
      if (parsed.proof !== LOCAL_ADMIN_FALLBACK.verifierHash) return null;
      return parsed;
    }

    if (!parsed.token) return null;
    return parsed;
  } catch (_err) {
    return null;
  }
}

if (!readAdminSession()) {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "index.html";
}

function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

function toBool(value) {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "y" || normalized === "نعم";
}

function toNum(value, fallback = 9999) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || ("item-" + Date.now());
}

function buildUrlWithParam(url, key, value) {
  return url + (url.includes("?") ? "&" : "?") + encodeURIComponent(key) + "=" + encodeURIComponent(value);
}

function buildStableString(value) {
  if (Array.isArray(value)) {
    return "[" + value.map(buildStableString).join(",") + "]";
  }
  if (value && typeof value === "object") {
    return "{" + Object.keys(value).sort().map(key => JSON.stringify(key) + ":" + buildStableString(value[key])).join(",") + "}";
  }
  return JSON.stringify(value);
}

function createRequestId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return "request-" + Date.now() + "-" + Math.random().toString(16).slice(2, 10);
}

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonpCallback_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    let script = null;

    window[callbackName] = data => {
      resolve(data);
      delete window[callbackName];
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };

    script = document.createElement("script");
    script.src = buildUrlWithParam(url, "callback", callbackName);
    script.async = true;
    script.onerror = () => {
      delete window[callbackName];
      if (script && script.parentNode) script.parentNode.removeChild(script);
      reject(new Error("JSONP load failed"));
    };
    document.body.appendChild(script);
  });
}

async function adminApiPost(payload, options = {}) {
  const session = readAdminSession();
  const body = { ...payload };

  if (options.requireToken !== false) {
    if (!session) {
      throw Object.assign(new Error("انتهت جلسة الأدمن."), { code: "TOKEN_EXPIRED" });
    }
    body.token = session.token;
  }

  const response = await fetch(ADMIN_CONFIG.apiUrl, {
    method: "POST",
    cache: "no-store",
    credentials: "omit",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const result = await response.json();
  if (!result || result.success !== true) {
    const err = new Error((result && result.error) || "رفض الخادم العملية.");
    err.code = result && result.code;
    throw err;
  }

  return result;
}

function isAuthError(err) {
  return err && (
    err.code === "TOKEN_MISSING_OR_INVALID" ||
    err.code === "TOKEN_EXPIRED"
  );
}

function expireAdminSession(message) {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  logAuditEvent({
    action: "error",
    section: "auth",
    itemName: "الأدمن",
    status: "failed",
    description: "انتهت جلسة الأدمن أو تعذّر التحقق منها.",
    errorMessage: message || ""
  });
  if (message) sessionStorage.setItem("mhr_admin_login_notice", message);
  window.location.href = "index.html";
}

function normalizeAdminCard(item, fallback = {}) {
  const category = String(item.category ?? item.tag ?? fallback.category ?? fallback.tag ?? "").trim();
  const buttonText = String(item.buttonText ?? item.linkText ?? fallback.buttonText ?? fallback.linkText ?? "فتح الملف").trim() || "فتح الملف";

  return {
    ...fallback,
    ...item,
    adminKey: String(item.adminKey ?? fallback.adminKey ?? "").trim(),
    title: String(item.title ?? fallback.title ?? "").trim(),
    description: String(item.description ?? fallback.description ?? "").trim(),
    icon: String(item.icon ?? fallback.icon ?? "").trim(),
    category,
    buttonText,
    tag: category,
    linkText: buttonText,
    linkUrl: String(item.linkUrl ?? fallback.linkUrl ?? "").trim(),
    isActive: Object.prototype.hasOwnProperty.call(item, "isActive") ? item.isActive : (Object.prototype.hasOwnProperty.call(fallback, "isActive") ? fallback.isActive : true),
    sortOrder: Object.prototype.hasOwnProperty.call(item, "sortOrder") ? item.sortOrder : (Object.prototype.hasOwnProperty.call(fallback, "sortOrder") ? fallback.sortOrder : 9999),
    size: String(item.size ?? fallback.size ?? "").trim()
  };
}

function ensureUniqueKeys(items, keyField, titleField) {
  const seen = new Set();
  (items || []).forEach((item, index) => {
    let key = String(item[keyField] || "").trim();
    if (!key || seen.has(key)) {
      key = slugify(item[titleField]) + "-" + index;
    }
    item[keyField] = key;
    seen.add(key);
  });
  return items || [];
}

function mergeAdminCards(items) {
  const fallbackMap = new Map(FALLBACK_ADMIN_CARDS.map(card => [card.adminKey, normalizeAdminCard(card)]));
  const merged = [];

  (items || []).forEach(item => {
    const key = String(item.adminKey || "").trim();
    if (!key) return;
    const fallback = fallbackMap.get(key) || {};
    merged.push(normalizeAdminCard(item, fallback));
    fallbackMap.delete(key);
  });

  fallbackMap.forEach(card => merged.push(card));
  return ensureUniqueKeys(merged, "adminKey", "title");
}

function getAdminCardsCategories(items = DATA.adminCards || []) {
  return Array.from(new Set(
    (items || [])
      .map(item => String(item.category ?? item.tag ?? "").trim())
      .filter(Boolean)
  )).sort((a, b) => a.localeCompare(b, "ar"));
}

function isInternalAppLink(url) {
  const value = String(url || "").trim();
  return /^#/.test(value) || /^(?:index|admin|offline)\.html(?:#.*)?$/i.test(value);
}

function isValidLinkValue(value) {
  const link = String(value || "").trim();
  if (!link) return true;
  if (/^(?:javascript|data|vbscript):/i.test(link)) return false;
  if (/^(?:https?:\/\/|mailto:)/i.test(link)) return true;
  if (["#home", "#announcements", "#forms", "#quickAccess", "#policies", "#info", "#employeeGuide"].includes(link)) return true;
  return ["offline.html", "admin.html", "index.html", "index.html#announcements", "index.html#forms", "index.html#policies", "index.html#info"].includes(link);
}

function hasRequiredActiveLink(section, row) {
  if (section !== "adminCards") return true;
  if (!toBool(row.isActive ?? true)) return true;
  const link = String(row.linkUrl || "").trim();
  return Boolean(link && link !== "#" && isValidLinkValue(link));
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_err) {
    return null;
  }
}

function writeCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    quickCards: data.quickCards || [],
    forms: data.forms || [],
    services: data.services || [],
    announcements: data.announcements || [],
    adminCards: data.adminCards || [],
    policies: data.policies || []
  }));
}

function readPendingCache() {
  try {
    const raw = localStorage.getItem(PENDING_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_err) {
    return null;
  }
}

function writePendingCache(data) {
  if (!data) {
    localStorage.removeItem(PENDING_CACHE_KEY);
    return;
  }
  localStorage.setItem(PENDING_CACHE_KEY, JSON.stringify({
    quickCards: data.quickCards || [],
    forms: data.forms || [],
    services: data.services || [],
    announcements: data.announcements || [],
    adminCards: data.adminCards || [],
    policies: data.policies || []
  }));
}

function readPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
}

function writePending(items) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(Array.isArray(items) ? items : []));
  if (!Array.isArray(items) || items.length === 0) {
    writePendingCache(null);
  }
  updatePendingBadge();
}

function queuePending(section, keyField, row, action) {
  const keyValue = String(row[keyField] || "").trim();
  const fingerprint = buildStableString({ section, action, keyField, row });
  const pending = readPending();
  const existing = pending.find(item => item.section === section && item.action === action && item.keyField === keyField && item.keyValue === keyValue && item.fingerprint === fingerprint);
  if (existing) return existing;

  const operation = {
    requestId: createRequestId(),
    fingerprint,
    section,
    action,
    keyField,
    keyValue,
    row: JSON.parse(JSON.stringify(row)),
    ts: Date.now(),
    attempts: 0,
    state: "queued",
    lastError: ""
  };
  pending.push(operation);
  writePending(pending);
  return operation;
}

function updatePendingOperation(operation, patch) {
  const next = readPending().map(item => item.requestId === operation.requestId ? { ...item, ...patch } : item);
  writePending(next);
}

function removePendingOperation(requestId) {
  writePending(readPending().filter(item => item.requestId !== requestId));
}

function applyPendingOverrides(items, section, keyField) {
  const pending = readPending().filter(item => item.section === section);
  if (!pending.length) return items;

  const result = items.slice();
  pending.forEach(item => {
    const idx = result.findIndex(entry => String(entry[keyField]) === String(item.keyValue));
    if (item.action === "delete") {
      if (idx >= 0) result.splice(idx, 1);
      return;
    }
    if (idx >= 0) {
      result[idx] = { ...result[idx], ...item.row };
    } else {
      result.push({ ...item.row });
    }
  });
  return result;
}

function normalizeIncomingData(data) {
  const quickCards = ensureUniqueKeys(Array.isArray(data.quickCards) ? data.quickCards.map(item => ({ ...item })) : [], "quickKey", "title");
  if (!quickCards.some(card => card.quickKey === "policies")) {
    quickCards.push({
      quickKey: "policies",
      icon: "📚",
      title: "السياسات الداخلية",
      description: "الاطلاع على سياسات ولوائح العمل المعتمدة.",
      href: "#policies",
      isActive: true,
      sortOrder: 7,
      badge: "",
      size: ""
    });
  }

  const forms = ensureUniqueKeys(Array.isArray(data.forms) ? data.forms.map(item => ({ ...item })) : [], "formKey", "title");
  const services = ensureUniqueKeys(Array.isArray(data.services) ? data.services.map(item => ({ ...item })) : [], "serviceKey", "title");
  const announcements = ensureUniqueKeys(Array.isArray(data.announcements) ? data.announcements.map(item => ({ ...item })) : [], "id", "title");
  const policiesSource = Array.isArray(data.policies) ? data.policies : (Array.isArray(data.Policies) ? data.Policies : FALLBACK_POLICIES);
  const policies = ensureUniqueKeys(policiesSource.map(item => ({ ...item })), "policyKey", "title");
  const adminCardsSource = Array.isArray(data.adminCards) ? data.adminCards : (Array.isArray(data.AdminCards) ? data.AdminCards : []);
  const adminCards = mergeAdminCards(adminCardsSource);

  return {
    adminCards: applyPendingOverrides(adminCards, "adminCards", "adminKey"),
    quickCards: applyPendingOverrides(quickCards, "quickCards", "quickKey"),
    forms: applyPendingOverrides(forms, "forms", "formKey"),
    services: applyPendingOverrides(services, "services", "serviceKey"),
    announcements: applyPendingOverrides(announcements, "announcements", "id"),
    policies: applyPendingOverrides(policies, "policies", "policyKey")
  };
}

function updatePendingBadge() {
  const count = readPending().length;
  const badge = document.getElementById("pendingCount");
  if (badge) {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  }
}

function showStatus(message, type = "success") {
  const banner = document.getElementById("cmsStatusBanner");
  if (!banner) return;
  banner.textContent = message;
  banner.className = "cms-status-banner " + type;
  banner.hidden = false;
  clearTimeout(showStatus._timer);
  showStatus._timer = setTimeout(() => {
    banner.hidden = true;
  }, 6000);
}

function setStat(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
}

function renderAdminCardsCategoryFilter() {
  const select = document.getElementById("adminCardsCategoryFilter");
  if (!select) return;
  const categories = getAdminCardsCategories();
  const selected = listFilters.adminCards.category || "all";
  select.innerHTML = ['<option value="all">كل التصنيفات</option>']
    .concat(categories.map(category => `<option value="${esc(category)}" ${selected === category ? "selected" : ""}>${esc(category)}</option>`))
    .join("");
}

function renderAdminFilesStats() {
  const cards = (DATA.adminCards || []).slice();
  const total = cards.length;
  const active = cards.filter(item => toBool(item.isActive ?? true)).length;
  const hidden = total - active;
  const categories = getAdminCardsCategories(cards).length;

  setStat("adminFilesTotalStat", total);
  setStat("adminFilesActiveStat", active);
  setStat("adminFilesHiddenStat", hidden);
  setStat("adminFilesCategoriesStat", categories);
  setStat("statAdminFiles", total);
  setStat("statAdminFilesActive", active);
  setStat("statAdminFilesCategories", categories);
}

function renderCards(cards) {
  if (!cardsContainer) return;
  if (cards) LAST_ADMIN_CARDS = cards;

  cardsContainer.innerHTML = "";

  const filter = listFilters.adminCards || { q: "", status: "all", category: "all" };
  const pendingMap = new Set(readPending().filter(item => item.section === "adminCards").map(item => item.keyValue));
  let visibleCards = (LAST_ADMIN_CARDS || []).slice();

  const q = filter.q.trim().toLowerCase();
  if (q) {
    visibleCards = visibleCards.filter(card => [card.title, card.description, card.category, card.tag].join(" ").toLowerCase().includes(q));
  }

  if (filter.category && filter.category !== "all") {
    visibleCards = visibleCards.filter(card => String(card.category ?? card.tag ?? "").trim() === filter.category);
  }

  if (filter.status === "active") {
    visibleCards = visibleCards.filter(card => toBool(card.isActive ?? true));
  } else if (filter.status === "hidden") {
    visibleCards = visibleCards.filter(card => !toBool(card.isActive ?? true));
  } else if (filter.status === "pending") {
    visibleCards = visibleCards.filter(card => pendingMap.has(card.adminKey));
  }

  visibleCards.sort((a, b) => toNum(a.sortOrder, 9999) - toNum(b.sortOrder, 9999));

  if (!visibleCards.length) {
    cardsContainer.innerHTML = `
      <div class="empty-state">
        <h3>لا توجد ملفات إدارية مطابقة</h3>
        <p>يمكنك تعديل البحث أو التصنيف، أو إضافة ملف إداري جديد من لوحة الإدارة.</p>
      </div>
    `;
    return;
  }

  visibleCards.forEach(card => {
    const item = document.createElement("div");
    item.className = "admin-card";
    const linkText = card.buttonText || card.linkText || "فتح الملف";
    const category = card.category || card.tag || "عام";
    const linkUrl = card.linkUrl || "#";
    const isInternal = isInternalAppLink(linkUrl);

    item.innerHTML = `
      <div class="admin-card-head">
        <span class="admin-card-icon" aria-hidden="true">${esc(card.icon || "📁")}</span>
        <span class="admin-card-tag">${esc(category)}</span>
      </div>
      <h3 class="admin-card-title">${esc(card.title || "بدون عنوان")}</h3>
      <p class="admin-card-desc">${esc(card.description || "")}</p>
      <div class="admin-card-actions">
        <a class="admin-card-btn" href="${esc(linkUrl)}" ${isInternal ? "" : 'target="_blank" rel="noopener noreferrer"'}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          ${esc(linkText)}
        </a>
        <button class="btn btn-outline btn-sm" type="button" data-action="edit" data-section="adminCards" data-key="${esc(card.adminKey)}">تعديل</button>
        <button class="btn btn-dark btn-sm" type="button" data-action="toggle" data-section="adminCards" data-key="${esc(card.adminKey)}">إخفاء</button>
      </div>
    `;
    cardsContainer.appendChild(item);
  });
}

function renderManageList(section) {
  const meta = SECTION_META[section];
  if (!meta) return;

  const container = document.getElementById(meta.listId);
  if (!container) return;

  const filter = listFilters[section] || { q: "", status: "all" };
  const pendingMap = new Set(readPending().filter(item => item.section === section).map(item => item.keyValue));
  const totalCount = (DATA[section] || []).length;

  let items = (DATA[section] || []).slice().sort((a, b) => {
    return toNum(a[meta.orderField] ?? a.priority, 9999) - toNum(b[meta.orderField] ?? b.priority, 9999);
  });

  const q = String(filter.q || "").trim().toLowerCase();
  if (q) {
    items = items.filter(item => {
      const fields = [item[meta.titleField], item.description, item.subtitle, item.body, item.tag, item.category];
      return fields.join(" ").toLowerCase().includes(q);
    });
  }

  if (section === "adminCards" && filter.category && filter.category !== "all") {
    items = items.filter(item => String(item.category ?? item.tag ?? "").trim() === filter.category);
  }

  if (filter.status === "active") {
    items = items.filter(item => toBool(item[meta.activeField] ?? true));
  } else if (filter.status === "hidden") {
    items = items.filter(item => !toBool(item[meta.activeField] ?? true));
  } else if (filter.status === "pending") {
    items = items.filter(item => pendingMap.has(item[meta.keyField]));
  }

  if (!items.length) {
    container.innerHTML = totalCount === 0
      ? `<div class="cms-empty"><p>لا توجد عناصر بعد.</p><button class="btn btn-add" type="button" onclick="openItemEditor('${section}')">+ إضافة ${esc(meta.title)} جديد</button></div>`
      : `<div class="cms-empty"><p>لا توجد نتائج مطابقة للبحث أو الفلترة الحالية.</p></div>`;
    return;
  }

  container.innerHTML = items.map(item => {
    const active = toBool(item[meta.activeField] ?? true);
    const keyValue = item[meta.keyField];
    const orderValue = item[meta.orderField] ?? item.priority ?? "-";
    const extraMeta = section === "adminCards"
      ? `<span>${esc(String(item.category ?? item.tag ?? "عام"))}</span>`
      : "";
    const pendingFlag = pendingMap.has(keyValue) ? `<span class="cms-pending-flag">⏳ لم تُزامَن بعد</span>` : "";

    return `
      <div class="cms-item ${active ? "" : "is-inactive"}">
        <div class="cms-item-info">
          <div class="cms-item-title">${esc(item[meta.titleField] || "بدون عنوان")}</div>
          <div class="cms-item-meta">
            <span class="cms-status-pill ${active ? "active" : "inactive"}">${active ? "نشط" : "مخفي"}</span>
            ${extraMeta}
            <span>ترتيب: ${esc(String(orderValue))}</span>
            ${pendingFlag}
          </div>
        </div>
        <div class="cms-item-actions">
          <button class="btn btn-outline" type="button" data-action="edit" data-section="${esc(section)}" data-key="${esc(keyValue)}">تعديل</button>
          <button class="btn btn-dark" type="button" data-action="toggle" data-section="${esc(section)}" data-key="${esc(keyValue)}">${active ? "إخفاء" : "إظهار"}</button>
          <button class="btn btn-dark" type="button" data-action="delete" data-section="${esc(section)}" data-key="${esc(keyValue)}">حذف</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderDashboard() {
  setStat("statQuickCards", (DATA.quickCards || []).length);
  setStat("statForms", (DATA.forms || []).length);
  setStat("statAnnouncements", (DATA.announcements || []).length);
  setStat("statPoliciesActive", (DATA.policies || []).filter(item => toBool(item.active ?? true)).length);
  setStat("statPending", readPending().length);
  renderAdminFilesStats();
}

function renderPendingTab() {
  const container = document.getElementById("pendingList");
  if (!container) return;

  const pending = readPending();
  if (!pending.length) {
    container.innerHTML = `<div class="cms-empty"><p>لا توجد تعديلات معلقة حالياً.</p></div>`;
    return;
  }

  container.innerHTML = pending.map(item => {
    const meta = SECTION_META[item.section];
    const title = meta ? (item.row[meta.titleField] || item.keyValue) : item.keyValue;
    const sectionLabel = item.section === "adminCards" ? "الملفات الإدارية" : (meta ? meta.title : item.section);
    const actionLabel = ({ create: "إضافة", update: "تعديل", toggle: "تفعيل / تعطيل", delete: "حذف" })[item.action] || item.action;
    const stateLabel = item.state === "syncing" ? "جارٍ الإرسال" : (item.state === "failed" ? "فشل مؤقت" : "بانتظار الإرسال");
    const when = new Date(item.ts).toLocaleString("ar-IQ");
    return `
      <div class="cms-item pending-row">
        <div class="cms-item-info">
          <div class="cms-item-title">${esc(title)}</div>
          <div class="cms-item-meta">
            <span class="cms-status-pill inactive">${esc(sectionLabel)}</span>
            <span>${esc(actionLabel)}</span>
            <span class="cms-pending-flag">⏳ ${esc(stateLabel)} - ${esc(when)}</span>
            <span>المحاولات: ${Number(item.attempts || 0)}</span>
            ${item.lastError ? `<span class="cms-pending-flag">${esc(item.lastError)}</span>` : ""}
          </div>
        </div>
        <div class="cms-item-actions pending-row-actions">
          <button class="btn btn-outline" type="button" data-pending-action="retry" data-request-id="${esc(item.requestId)}" ${item.state === "syncing" ? "disabled" : ""}>إعادة المحاولة</button>
          <button class="btn btn-dark" type="button" data-pending-action="discard" data-section="${esc(item.section)}" data-key="${esc(item.keyValue)}">تجاهل التعديل المحلي</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderAuditLogSection() {
  const allEntries = readAuditLog().slice().reverse();
  const filteredEntries = filterAuditEntries(allEntries);
  const todayKey = new Date().toDateString();
  const totalCount = allEntries.length;
  const todayCount = allEntries.filter(entry => new Date(entry.timestamp).toDateString() === todayKey).length;
  const successCount = allEntries.filter(entry => entry.status === "success").length;
  const failedCount = allEntries.filter(entry => entry.status === "failed").length;

  setStat("auditTotalStat", totalCount);
  setStat("auditTodayStat", todayCount);
  setStat("auditSuccessStat", successCount);
  setStat("auditFailedStat", failedCount);

  const body = document.getElementById("auditLogBody");
  if (!body) return;

  if (!filteredEntries.length) {
    body.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="audit-empty">لا توجد سجلات مطابقة للفلاتر الحالية.</div>
        </td>
      </tr>
    `;
    return;
  }

  body.innerHTML = filteredEntries.map(entry => {
    const tooltip = [entry.description, entry.errorMessage].filter(Boolean).join(" - ");
    return `
      <tr>
        <td>${esc(formatAuditTimestamp(entry.timestamp))}</td>
        <td>${esc(getAuditSectionLabel(entry.section))}</td>
        <td>${esc(getAuditActionLabel(entry.action))}</td>
        <td title="${esc(tooltip)}">${esc(entry.itemName || "—")}</td>
        <td><span class="audit-status ${entry.status}">${esc(getAuditStatusLabel(entry.status))}</span></td>
      </tr>
    `;
  }).join("");
}

function initAuditFilters() {
  const sectionSelect = document.getElementById("auditSectionFilter");
  const actionSelect = document.getElementById("auditActionFilter");
  const statusSelect = document.getElementById("auditStatusFilter");

  if (sectionSelect) {
    sectionSelect.addEventListener("change", () => {
      auditFilters.section = sectionSelect.value;
      renderAuditLogSection();
    });
  }

  if (actionSelect) {
    actionSelect.addEventListener("change", () => {
      auditFilters.action = actionSelect.value;
      renderAuditLogSection();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", () => {
      auditFilters.status = statusSelect.value;
      renderAuditLogSection();
    });
  }
}

function exportAuditLog(format) {
  const entries = filterAuditEntries(readAuditLog().slice().reverse());
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  if (format === "json") {
    downloadTextFile(`audit-log-${stamp}.json`, JSON.stringify(entries, null, 2), "application/json;charset=utf-8");
    showStatus("تم تصدير سجل النشاط بصيغة JSON.", "success");
    return;
  }

  const headers = ["timestamp", "section", "action", "itemName", "status", "description", "errorMessage"];
  const csv = [headers.join(",")].concat(entries.map(entry => headers.map(field => {
    const value = String(entry[field] ?? "");
    return `"${value.replace(/"/g, '""')}"`;
  }).join(","))).join("\n");

  downloadTextFile(`audit-log-${stamp}.csv`, csv, "text/csv;charset=utf-8");
  showStatus("تم تصدير سجل النشاط بصيغة CSV.", "success");
}

async function clearAuditLog() {
  const entered = prompt("أدخل كلمة المرور لمسح سجل النشاط:");
  if (entered === null) return;

  const enteredHash = await sha256Hex(String(entered).trim());
  if (enteredHash !== AUDIT_CLEAR_PASSWORD_HASH) {
    logAuditEvent({
      action: "clear-audit",
      section: "system",
      itemName: "سجل النشاط",
      status: "failed",
      description: "محاولة فاشلة لمسح سجل النشاط.",
      errorMessage: "كلمة المرور غير صحيحة"
    });
    showStatus("كلمة المرور غير صحيحة", "error");
    renderAuditLogSection();
    return;
  }

  clearAuditLogStorage();
  logAuditEvent({
    action: "clear-audit",
    section: "system",
    itemName: "سجل النشاط",
    status: "success",
    description: "تم مسح سجل النشاط بواسطة المدير."
  });
  renderAuditLogSection();
  showStatus("تم مسح سجل النشاط.", "success");
}

function renderAllManageLists() {
  renderManageList("adminCards");
  renderManageList("quickCards");
  renderManageList("forms");
  renderManageList("services");
  renderManageList("announcements");
  renderManageList("policies");
  renderAdminCardsCategoryFilter();
  renderCards(DATA.adminCards || []);
  renderPendingTab();
  renderAuditLogSection();
  renderDashboard();
  updatePendingBadge();
}

function switchTab(name, options = {}) {
  const tabName = (SECTION_META[name] || name === "sync" || name === "auditLog") ? name : "adminCards";
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.hidden = panel.dataset.tabPanel !== tabName;
  });

  document.querySelectorAll(".admin-tab-btn").forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  if (options.persist !== false) {
    localStorage.setItem(ADMIN_LAST_TAB_KEY, tabName);
  }
}

function initTabs() {
  document.querySelectorAll(".admin-tab-btn").forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
}

function renderFilteredSection(section) {
  renderManageList(section);
  if (section === "adminCards") {
    renderAdminCardsCategoryFilter();
    renderCards(DATA.adminCards || []);
    renderAdminFilesStats();
  }
}

function initFilters() {
  document.querySelectorAll("[data-filter-search]").forEach(input => {
    input.addEventListener("input", () => {
      const section = input.dataset.filterSearch;
      listFilters[section].q = input.value;
      renderFilteredSection(section);
    });
  });

  document.querySelectorAll("[data-filter-status]").forEach(select => {
    select.addEventListener("change", () => {
      const section = select.dataset.filterStatus;
      listFilters[section].status = select.value;
      renderFilteredSection(section);
    });
  });

  document.querySelectorAll("[data-filter-category]").forEach(select => {
    select.addEventListener("change", () => {
      const section = select.dataset.filterCategory;
      listFilters[section].category = select.value;
      renderFilteredSection(section);
    });
  });
}

function openItemEditor(section, keyValue) {
  const meta = SECTION_META[section];
  if (!meta) return;

  currentEditSection = section;
  currentEditKeyValue = keyValue || null;
  const existing = keyValue ? (DATA[section] || []).find(item => String(item[meta.keyField]) === String(keyValue)) : null;

  const titleEl = document.getElementById("itemEditTitle");
  const errorEl = document.getElementById("itemEditError");
  const form = document.getElementById("itemEditForm");
  if (!form || !titleEl || !errorEl) return;

  titleEl.textContent = existing ? ("تعديل " + meta.title) : ("إضافة " + meta.title);
  errorEl.textContent = "";

  form.innerHTML = meta.fields.map(field => {
    const value = existing ? (existing[field.key] ?? "") : (field.default ?? (field.type === "status" ? true : ""));
    const disabled = field.key === meta.keyField && existing ? "disabled" : "";

    if (field.type === "textarea") {
      return `<div class="field-row"><label for="field_${field.key}">${esc(field.label)}</label><textarea id="field_${field.key}" ${disabled}>${esc(value)}</textarea></div>`;
    }
    if (field.type === "select") {
      const options = field.options.map(option => `<option value="${esc(option)}" ${String(value) === option ? "selected" : ""}>${option ? esc(option) : "بدون"}</option>`).join("");
      return `<div class="field-row"><label for="field_${field.key}">${esc(field.label)}</label><select id="field_${field.key}" ${disabled}>${options}</select></div>`;
    }
    if (field.type === "status") {
      const active = toBool(value);
      return `<div class="field-row"><label for="field_${field.key}">${esc(field.label)}</label><select id="field_${field.key}" ${disabled}><option value="true" ${active ? "selected" : ""}>نشط</option><option value="false" ${!active ? "selected" : ""}>مخفي</option></select></div>`;
    }
    return `<div class="field-row"><label for="field_${field.key}">${esc(field.label)}</label><input type="${field.type}" id="field_${field.key}" value="${esc(value)}" ${disabled}></div>`;
  }).join("");

  const modal = document.getElementById("itemEditModal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeItemEditor() {
  const modal = document.getElementById("itemEditModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  currentEditSection = null;
  currentEditKeyValue = null;
}

function setMutationBusy(busy) {
  mutationBusy = Boolean(busy);
  const button = document.getElementById("itemEditSave");
  if (!button) return;
  button.disabled = mutationBusy;
  button.textContent = mutationBusy ? "جارٍ الحفظ..." : "حفظ";
}

function buildStoredRow(section, row) {
  if (section !== "adminCards") return row;
  const normalized = normalizeAdminCard(row);
  return {
    ...normalized,
    tag: normalized.category,
    linkText: normalized.buttonText
  };
}

function buildSyncRow(section, row) {
  if (section !== "adminCards") return row;
  const normalized = normalizeAdminCard(row);
  return {
    adminKey: normalized.adminKey,
    title: normalized.title,
    description: normalized.description,
    icon: normalized.icon,
    category: normalized.category,
    buttonText: normalized.buttonText,
    tag: normalized.category,
    linkText: normalized.buttonText,
    linkUrl: normalized.linkUrl,
    isActive: toBool(normalized.isActive),
    sortOrder: toNum(normalized.sortOrder, 9999),
    size: normalized.size
  };
}

function applyLocalOperation(section, keyField, row, action) {
  if (readPending().length === 0) {
    writePendingCache(readCache() || DATA);
  }
  const list = (DATA[section] || []).slice();
  const keyValue = String(row[keyField]);
  const idx = list.findIndex(item => String(item[keyField]) === keyValue);

  if (action === "delete") {
    DATA[section] = list.filter(item => String(item[keyField]) !== keyValue);
  } else if (idx >= 0) {
    list[idx] = { ...list[idx], ...row };
    DATA[section] = list;
  } else {
    list.push(row);
    DATA[section] = list;
  }

  writeCache(DATA);
  renderAllManageLists();
}

async function saveItemEditor() {
  if (mutationBusy || !currentEditSection) return;
  const meta = SECTION_META[currentEditSection];
  const errorEl = document.getElementById("itemEditError");
  errorEl.textContent = "";

  const row = {};
  for (const field of meta.fields) {
    const el = document.getElementById("field_" + field.key);
    if (!el) continue;
    if (field.type === "status") {
      row[field.key] = el.value === "true";
    } else if (field.type === "number") {
      row[field.key] = el.value === "" ? 9999 : Number(el.value);
    } else {
      row[field.key] = String(el.value || "").trim();
    }
  }

  if (!currentEditKeyValue && !row[meta.keyField]) {
    row[meta.keyField] = slugify(row[meta.titleField] || meta.title);
  } else if (currentEditKeyValue) {
    row[meta.keyField] = currentEditKeyValue;
  }

  for (const field of meta.fields) {
    if (field.required && !String(row[field.key] ?? "").trim()) {
      errorEl.textContent = `الحقل "${field.label}" مطلوب.`;
      return;
    }
    if (field.isLink && !isValidLinkValue(row[field.key])) {
      errorEl.textContent = `الحقل "${field.label}" يجب أن يكون رابطاً معتمداً.`;
      return;
    }
  }

  if (!hasRequiredActiveLink(currentEditSection, row)) {
    errorEl.textContent = "الملف الإداري النشط يحتاج رابطاً صالحاً وغير فارغ.";
    return;
  }

  const storedRow = buildStoredRow(currentEditSection, row);
  const list = DATA[currentEditSection] || [];
  const existingItem = list.find(item => String(item[meta.keyField]) === String(storedRow[meta.keyField]));
  const exists = Boolean(existingItem);
  const action = exists ? "update" : "create";

  applyLocalOperation(currentEditSection, meta.keyField, storedRow, action);
  closeItemEditor();

  const itemName = String(storedRow[meta.titleField] || meta.title || storedRow[meta.keyField] || "").trim();
  logAuditEvent({
    action,
    section: currentEditSection,
    itemName,
    status: "success",
    description: exists ? `تم تعديل "${itemName}".` : `تمت إضافة "${itemName}".`
  });

  if (exists && existingItem && toNum(existingItem[meta.orderField] ?? existingItem.priority, 9999) !== toNum(storedRow[meta.orderField] ?? storedRow.priority, 9999)) {
    logAuditEvent({
      action: "reorder",
      section: currentEditSection,
      itemName,
      status: "success",
      description: `تم تغيير ترتيب "${itemName}" من ${String(existingItem[meta.orderField] ?? existingItem.priority ?? "-")} إلى ${String(storedRow[meta.orderField] ?? storedRow.priority ?? "-")}.`
    });
  }

  const operation = queuePending(currentEditSection, meta.keyField, buildSyncRow(currentEditSection, storedRow), action);
  showStatus("تم حفظ التعديل محلياً، وجارٍ انتظار تأكيد Apps Script.", "success");
  setMutationBusy(true);
  try {
    await attemptSyncItem(operation);
  } finally {
    setMutationBusy(false);
  }
}

async function toggleItemActive(section, keyValue) {
  if (mutationBusy) return;
  const meta = SECTION_META[section];
  const item = (DATA[section] || []).find(entry => String(entry[meta.keyField]) === String(keyValue));
  if (!item) return;

  const activeField = meta.activeField;
  const updated = { ...item, [activeField]: !toBool(item[activeField] ?? true) };
  const itemName = String(updated[meta.titleField] || updated.title || updated[meta.keyField] || "").trim();
  const auditAction = toBool(updated[activeField]) ? "activate" : "deactivate";
  applyLocalOperation(section, meta.keyField, updated, "toggle");

  logAuditEvent({
    action: auditAction,
    section,
    itemName,
    status: "success",
    description: toBool(updated[activeField]) ? `تم تفعيل "${itemName}".` : `تم تعطيل "${itemName}".`
  });

  const operation = queuePending(section, meta.keyField, buildSyncRow(section, updated), "toggle");
  showStatus("تم تحديث الحالة محلياً، وجارٍ انتظار تأكيد Apps Script.", "success");
  setMutationBusy(true);
  try {
    await attemptSyncItem(operation);
  } finally {
    setMutationBusy(false);
  }
}

async function deleteItem(section, keyValue) {
  if (mutationBusy) return;
  const meta = SECTION_META[section];
  if (!confirm("هل تريد حذف هذا العنصر؟ سيختفي من لوحة الأدمن بعد التأكيد.")) return;

  const item = (DATA[section] || []).find(entry => String(entry[meta.keyField]) === String(keyValue));
  if (!item) return;
  const itemName = String(item[meta.titleField] || item.title || item[meta.keyField] || "").trim();

  applyLocalOperation(section, meta.keyField, item, "delete");
  logAuditEvent({
    action: "delete",
    section,
    itemName,
    status: "success",
    description: `تم حذف "${itemName}".`
  });
  const operation = queuePending(section, meta.keyField, buildSyncRow(section, item), "delete");
  showStatus("تم تسجيل الحذف محلياً، وجارٍ انتظار تأكيد Apps Script.", "success");
  setMutationBusy(true);
  try {
    await attemptSyncItem(operation);
  } finally {
    setMutationBusy(false);
  }
}

function isRetryableSyncError(err) {
  return !err.code || err.code === "WRITE_BUSY" || err.code === "SERVER_ERROR";
}

async function attemptSyncItem(operation) {
  if (!operation) return true;
  const current = readPending().find(item => item.requestId === operation.requestId);
  if (!current) return true;

  updatePendingOperation(current, {
    state: "syncing",
    attempts: Number(current.attempts || 0) + 1,
    lastAttemptAt: Date.now(),
    lastError: ""
  });
  renderAllManageLists();

  try {
    await adminApiPost({
      sheet: current.section,
      action: current.action,
      row: current.row,
      requestId: current.requestId
    });
    removePendingOperation(current.requestId);
    await refreshFromSheet({ silent: true });
    showStatus("أكد Apps Script نجاح العملية وتم تحديث البيانات من Google Sheet.", "success");
    return true;
  } catch (err) {
    if (isAuthError(err)) {
      updatePendingOperation(current, { state: "failed", lastError: err.message });
      expireAdminSession("انتهت جلسة الأدمن. سجّل الدخول مجدداً لإكمال المزامنة.");
      return false;
    }

    if (!isRetryableSyncError(err)) {
      logAuditEvent({
        action: "error",
        section: current.section,
        itemName: String(current.row?.title || current.keyValue || "").trim(),
        status: "failed",
        description: "رفض الخادم العملية المحلية.",
        errorMessage: err.message || ""
      });
      removePendingOperation(current.requestId);
      await refreshFromSheet({ silent: true });
      showStatus(`رفض الخادم العملية: ${err.message}`, "error");
      return false;
    }

    logAuditEvent({
      action: "error",
      section: current.section,
      itemName: String(current.row?.title || current.keyValue || "").trim(),
      status: "failed",
      description: "تعذر تأكيد العملية وستبقى ضمن pendingSync.",
      errorMessage: err.message || "تعذر الاتصال بالخادم"
    });
    updatePendingOperation(current, {
      state: "failed",
      lastError: err.message || "تعذر الاتصال بالخادم"
    });
    renderAllManageLists();
    showStatus("تعذر تأكيد العملية. بقيت ضمن pendingSync بنفس requestId وستُعاد لاحقاً.", "error");
    return false;
  }
}

async function syncPendingNow() {
  const pending = readPending();
  if (!pending.length) {
    showStatus("لا توجد تعديلات معلقة بحاجة إلى مزامنة.", "success");
    return;
  }

  let successCount = 0;
  for (const operation of pending) {
    const ok = await attemptSyncItem(operation);
    if (ok) successCount += 1;
  }

  const remaining = readPending().length;
  if (remaining === 0) {
    showStatus(`اكتملت مزامنة ${successCount} عملية بنجاح.`, "success");
  } else {
    showStatus(`تمت مزامنة ${successCount} عملية، وتبقى ${remaining} عملية معلقة.`, "error");
  }
}

function discardPendingItem(section, keyValue) {
  if (!confirm("سيُزال هذا التعديل المحلي غير المتزامن فقط، ولن يُحذف أي شيء من Google Sheet. متابعة؟")) return;
  writePending(readPending().filter(item => !(item.section === section && item.keyValue === keyValue)));
  const meta = SECTION_META[section];
  if (meta) {
    DATA[section] = (DATA[section] || []).filter(item => String(item[meta.keyField]) !== String(keyValue));
    writeCache(DATA);
  }
  renderAllManageLists();
  showStatus("تم تجاهل التعديل المحلي.", "success");
}

function clearAllPending() {
  const pending = readPending();
  if (!pending.length) {
    showStatus("لا توجد عناصر معلقة لمسحها.", "success");
    return;
  }
  if (!confirm("سيتم حذف جميع العمليات المحلية غير المتزامنة والتراجع عن التعديلات المحلية المرتبطة بها. هل تريد المتابعة؟")) return;

  const restoreFromBackup = () => {
    const backup = readPendingCache();
    if (!backup) return false;
    DATA = normalizeIncomingData(backup);
    LAST_ADMIN_CARDS = (DATA.adminCards || []).slice();
    writeCache(DATA);
    writePending([]);
    renderAllManageLists();
    showStatus("تمت إزالة العمليات المعلقة واستعادة آخر نسخة محلية موثوقة.", "success");
    logAuditEvent({
      action: "clear-pending",
      section: "sync",
      itemName: "الطابور المحلي",
      status: "success",
      description: "تم مسح العمليات المعلقة واستعادة النسخة المحلية الموثوقة."
    });
    return true;
  };

  fetchSheetData().then(data => {
    if (!hasTrustedSheetPayload(data)) {
      if (!restoreFromBackup()) {
        renderAllManageLists();
        showStatus("تعذر استعادة نسخة موثوقة، لذلك لم يتم مسح العمليات المعلقة.", "error");
        logAuditEvent({
          action: "clear-pending",
          section: "sync",
          itemName: "الطابور المحلي",
          status: "failed",
          description: "تعذر العثور على مصدر موثوق لمسح العمليات المعلقة.",
          errorMessage: "لا توجد نسخة موثوقة قابلة للاستعادة"
        });
      }
      return;
    }

    DATA = normalizeIncomingData(data);
    LAST_ADMIN_CARDS = (DATA.adminCards || []).slice();
    writeCache(DATA);
    writePending([]);
    renderAllManageLists();
    showStatus("تمت إزالة العمليات المعلقة وإعادة تحميل البيانات من المصدر الموثوق.", "success");
    logAuditEvent({
      action: "clear-pending",
      section: "sync",
      itemName: "الطابور المحلي",
      status: "success",
      description: "تم مسح العمليات المعلقة وإعادة تحميل البيانات من المصدر الموثوق."
    });
  }).catch(() => {
    if (!restoreFromBackup()) {
      renderAllManageLists();
      showStatus("تعذر استعادة نسخة موثوقة، لذلك لم يتم مسح العمليات المعلقة.", "error");
      logAuditEvent({
        action: "clear-pending",
        section: "sync",
        itemName: "الطابور المحلي",
        status: "failed",
        description: "تعذر مسح العمليات المعلقة لغياب المصدر الموثوق.",
        errorMessage: "تعذر استرجاع نسخة موثوقة"
      });
    }
  });
}

function clearLocalCache() {
  if (!confirm("سيتم مسح الكاش المحلي لهذا المتصفح فقط. متابعة؟")) return;
  localStorage.removeItem(CACHE_KEY);
  showStatus("تم مسح الكاش المحلي. جارٍ إعادة التحميل من Google Sheet...", "success");
  refreshFromSheet();
}

async function fetchSheetData() {
  try {
    const response = await fetch(ADMIN_CONFIG.apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } catch (_err) {
    return loadJsonp(ADMIN_CONFIG.apiUrl);
  }
}

function hasTrustedSheetPayload(data) {
  return Boolean(data && typeof data === "object" && (
    Array.isArray(data.quickCards) ||
    Array.isArray(data.forms) ||
    Array.isArray(data.services) ||
    Array.isArray(data.announcements) ||
    Array.isArray(data.adminCards) ||
    Array.isArray(data.policies) ||
    Array.isArray(data.AdminCards) ||
    Array.isArray(data.Policies)
  ));
}

async function refreshFromSheet(options = {}) {
  try {
    const data = await fetchSheetData();
    DATA = normalizeIncomingData(data || {});
    LAST_ADMIN_CARDS = (DATA.adminCards || []).slice();
    writeCache(DATA);
    renderAllManageLists();
    if (!options.silent) {
      showStatus("تم تحديث البيانات من Google Sheet.", "success");
    }
    return true;
  } catch (err) {
    renderAllManageLists();
    if (!options.silent) {
      showStatus("تعذر تحديث البيانات من Google Sheet. استمر العرض باستخدام النسخة المحلية.", "error");
    }
    logAuditEvent({
      action: "error",
      section: "sync",
      itemName: "Google Sheet",
      status: "failed",
      description: "تعذر تحديث البيانات من Google Sheet.",
      errorMessage: err && err.message ? err.message : ""
    });
    return false;
  }
}

async function validateAdminSession() {
  const session = readAdminSession();
  if (!session) {
    expireAdminSession("جلسة الأدمن غير صالحة. سجّل الدخول مجدداً.");
    return false;
  }

  if (session.mode === LOCAL_ADMIN_FALLBACK.mode) {
    return true;
  }

  try {
    const result = await adminApiPost({ action: "validateSession" });
    if (result.expiresAt) {
      session.expiresAt = Number(result.expiresAt);
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    }
    return true;
  } catch (err) {
    if (isAuthError(err)) {
      expireAdminSession("جلسة الأدمن غير صالحة. سجّل الدخول مجدداً.");
      return false;
    }
    logAuditEvent({
      action: "error",
      section: "auth",
      itemName: "الأدمن",
      status: "failed",
      description: "تعذر التحقق من جلسة الخادم.",
      errorMessage: err.message || ""
    });
    showStatus("تعذر التحقق من جلسة الخادم. ستبقى العمليات محلية حتى عودة الاتصال.", "error");
    return false;
  }
}

async function logoutAdmin() {
  const session = readAdminSession();
  let logoutFailed = "";
  try {
    if (session && session.mode !== LOCAL_ADMIN_FALLBACK.mode) {
      await adminApiPost({ action: "logout" });
    }
  } catch (_err) {
    logoutFailed = _err && _err.message ? _err.message : "تعذر إبلاغ الخادم بتسجيل الخروج.";
  } finally {
    logAuditEvent({
      action: "logout",
      section: "auth",
      itemName: "الأدمن",
      status: logoutFailed ? "failed" : "success",
      description: logoutFailed ? "تم تسجيل الخروج محلياً مع تعذر إبلاغ الخادم." : "تم تسجيل الخروج من لوحة الأدمن.",
      errorMessage: logoutFailed
    });
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = "index.html";
  }
}

document.addEventListener("click", event => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const { action, section, key } = actionButton.dataset;
    if (action === "edit") openItemEditor(section, key);
    if (action === "toggle") toggleItemActive(section, key);
    if (action === "delete") deleteItem(section, key);
    return;
  }

  const pendingButton = event.target.closest("[data-pending-action]");
  if (pendingButton) {
    const action = pendingButton.dataset.pendingAction;
    if (action === "retry") {
      const requestId = pendingButton.dataset.requestId;
      const operation = readPending().find(item => item.requestId === requestId);
      if (operation) attemptSyncItem(operation);
    }
    if (action === "discard") {
      discardPendingItem(pendingButton.dataset.section, pendingButton.dataset.key);
    }
  }
});

window.addEventListener("online", () => {
  if (readPending().length > 0) {
    syncPendingNow();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  initTabs();
  initFilters();
  initAuditFilters();

  const cache = readCache();
  if (cache) {
    DATA = normalizeIncomingData(cache);
    LAST_ADMIN_CARDS = (DATA.adminCards || []).slice();
  } else {
    DATA = normalizeIncomingData({});
    LAST_ADMIN_CARDS = (DATA.adminCards || []).slice();
  }

  renderAllManageLists();
  switchTab(localStorage.getItem(ADMIN_LAST_TAB_KEY) || "adminCards", { persist: false });

  const sessionValid = await validateAdminSession();
  if (!sessionValid) return;

  await refreshFromSheet({ silent: true });

  if (readPending().length > 0) {
    syncPendingNow();
  }
});
