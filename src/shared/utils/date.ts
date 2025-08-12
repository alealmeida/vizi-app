// src/shared/utils/date.ts
type UnitForms =
  | { one: string; other: string; short: string }
  | { one: string; other: string; short: { one: string; other: string } };

interface DictEntry {
  now: string;
  yesterday: string;
  prefix: string;
  units: Record<string, UnitForms>;
}

const PT_BR: DictEntry = {
  now: "agora",
  yesterday: "ontem",
  prefix: "há",
  units: {
    second: { one: "segundo", other: "segundos", short: "s" },
    minute: { one: "minuto", other: "minutos", short: "min" },
    hour:   { one: "hora", other: "horas", short: "h" },
    day:    { one: "dia", other: "dias", short: "d" },
    week:   { one: "semana", other: "semanas", short: "sem" },
    month:  { one: "mês", other: "meses", short: { one: "mês", other: "meses" } },
    year:   { one: "ano", other: "anos", short: { one: "ano", other: "anos" } },
  },
};

/**
 * Retorna tempo relativo no formato:
 *  - há 2h, há 1d, ontem, há 3 semanas...
 * @param date Data original
 * @param options abreviação e idioma
 */
export function formatTimeAgoPt(
  date: string | Date,
  options: { abbreviate?: boolean; locale?: "pt-BR" } = {}
): string {
  const abbreviate = options.abbreviate ?? true;
  const dict = PT_BR; // No futuro: selecionar pelo locale

  const now = new Date();
  const inputDate = typeof date === "string" ? new Date(date) : date;
  const diff = now.getTime() - inputDate.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return dict.now;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return formatUnit("minute", minutes);

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return formatUnit("hour", hours);

  const days = Math.floor(hours / 24);
  if (days === 1) return dict.yesterday;
  if (days < 7) return formatUnit("day", days);

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return formatUnit("week", weeks);

  const months = Math.floor(days / 30);
  if (months < 12) return formatUnit("month", months);

  const years = Math.floor(days / 365);
  return formatUnit("year", years);

  function formatUnit(unit: string, value: number) {
    const unitDef = dict.units[unit];
    const isOne = value === 1;

    let label: string;
    if (abbreviate) {
      if (typeof unitDef.short === "string") {
        label = unitDef.short; // sempre igual, sem plural
      } else {
        label = isOne ? unitDef.short.one : unitDef.short.other;
      }
    } else {
      label = isOne ? unitDef.one : unitDef.other;
    }

    return `${dict.prefix} ${value} ${label}`;
  }
}