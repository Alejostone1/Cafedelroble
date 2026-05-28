/**
 * CAFÉ DEL ROBLE — Design Tokens
 * Fuente única de verdad para clases de Tailwind semánticas.
 * Consumir ESTOS tokens en todos los componentes.
 * NUNCA usar colores hardcodeados (bg-stone-*, text-amber-*, etc.)
 */

export const tokens = {
  /* ── Fondos ── */
  bg: {
    base:    "bg-base",           // fondo de página
    surface: "bg-surface",        // cards, modales
    surfaceHover: "bg-surface-hover",
    elevated: "bg-elevated",      // dropdowns, tooltips
    muted:   "bg-muted-bg",       // secciones secundarias
    invert:  "bg-invert",         // fondo inverso
    brand:   "bg-brand",          // fondo brand
    brandSubtle: "bg-brand-subtle", // fondo brand sutil
    accent:  "bg-accent",
  },

  /* ── Texto ── */
  text: {
    default:   "text-fg",
    secondary: "text-fg-secondary",
    muted:     "text-fg-muted",
    disabled:  "text-fg-disabled",
    inverse:   "text-fg-inverse",
    brand:     "text-fg-brand",
    link:      "text-fg-link",
    brandFg:   "text-brand-fg",   // texto SOBRE bg-brand
  },

  /* ── Bordes ── */
  border: {
    default: "border-line",
    muted:   "border-line-muted",
    strong:  "border-line-strong",
    brand:   "border-line-brand",
  },

  /* ── Estados ── */
  success: {
    bg:   "bg-success-bg",
    text: "text-success-fg",
    border: "border-success",
  },
  warning: {
    bg:   "bg-warning-bg",
    text: "text-warning-fg",
    border: "border-warning",
  },
  danger: {
    bg:   "bg-danger-bg",
    text: "text-danger-fg",
    border: "border-danger",
  },
  info: {
    bg:   "bg-info-bg",
    text: "text-info-fg",
    border: "border-info",
  },

  /* ── Componentes ── */
  sidebar: {
    bg:         "bg-sidebar",
    text:       "text-sidebar-fg",
    border:     "border-sidebar-line",
    itemHover:  "hover:bg-sidebar-item-hover",
    itemActive: "bg-sidebar-item-active",
    itemActiveFg: "text-sidebar-item-active-fg",
  },
  card: {
    bg:     "bg-card",
    hover:  "hover:bg-card-hover",
    border: "border-card-line",
  },
  input: {
    bg:     "bg-input",
    border: "border-input-line",
    ring:   "focus:ring-ring",
  },
  navbar: {
    bg:     "bg-navbar",
    border: "border-navbar-line",
  },
  modal: {
    bg:      "bg-modal",
    overlay: "bg-modal-overlay",
  },
  table: {
    header: "bg-table-header",
    row:    "bg-table-row",
    rowHover: "hover:bg-table-row-hover",
    border: "border-table-line",
  },
  badge: {
    bg:   "bg-badge-default-bg",
    text: "text-badge-default-fg",
  },
} as const;

/* ── Clases compuestas reutilizables ── */
export const cx = {
  card:     "bg-card border border-card-line rounded-xl shadow-token-sm",
  cardHover:"bg-card border border-card-line rounded-xl shadow-token-sm hover:shadow-token-md hover:border-line transition-all duration-200",
  input:    "bg-input border border-input-line rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all",
  badge:    "bg-badge-default-bg text-badge-default-fg text-xs font-semibold px-2.5 py-0.5 rounded-full",
  separator:"bg-line",
  muted:    "text-fg-muted text-sm",
  label:    "text-fg text-sm font-medium",
  heading:  "text-fg font-bold tracking-tight",
  subheading: "text-fg-secondary",
  link:     "text-fg-link hover:text-fg-brand underline-offset-4 hover:underline transition-colors",
  section:  "bg-muted-bg",
  overlay:  "bg-modal-overlay backdrop-blur-sm",
} as const;

/* ── Variantes de botón reutilizables ── */
export const buttonTokens = {
  primary:
    "bg-brand text-brand-fg hover:bg-brand-hover active:bg-brand-active focus-visible:ring-2 focus-visible:ring-ring shadow-token-sm hover:shadow-token-brand",
  secondary:
    "bg-brand-subtle text-fg-brand hover:bg-muted-bg border border-line hover:border-line-strong",
  outline:
    "border border-line bg-surface text-fg hover:bg-surface-hover hover:border-line-strong",
  ghost:
    "text-fg-secondary hover:bg-surface-hover hover:text-fg",
  danger:
    "bg-danger text-fg-inverse hover:opacity-90",
  premium:
    "bg-invert text-fg-inverse hover:opacity-90 shadow-token-md",
} as const;
