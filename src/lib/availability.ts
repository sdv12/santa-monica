import type { ISO } from "./dates";

/** Noches ocupadas: desde `start` (inclusive) hasta `end` (exclusive), igual que la vista `occupied_dates`. */
export type OccupiedRange = { start: ISO; end: ISO };
