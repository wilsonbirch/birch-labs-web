/**
 * The Fit Score self-check on /ai-assistant: six 1–5 scores per weekly task,
 * where 5 always means "a better fit for an assistant". Runs in the browser only.
 */

export const FIT_FACTORS = ["frequency", "time", "clarity", "digital", "mistakes", "handover"] as const;

export type FitFactor = (typeof FIT_FACTORS)[number];
export type FitScores = Record<FitFactor, number>;
export type FitBand = "start" | "next" | "later";

export const FIT_MAX = FIT_FACTORS.length * 5;

export function fitTotal(scores: FitScores): number {
  return FIT_FACTORS.reduce((sum, factor) => {
    const score = scores[factor];
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      throw new RangeError(`${factor} must be a whole number from 1 to 5`);
    }
    return sum + score;
  }, 0);
}

/** 24+ start here, 18–23 next, under 18 leave it for now. */
export function fitBand(total: number): FitBand {
  if (total >= 24) return "start";
  if (total >= 18) return "next";
  return "later";
}

/** Highest total first; ties keep the order the tasks were added in. */
export function rankTasks<T extends { scores: FitScores }>(tasks: readonly T[]) {
  return tasks
    .map((task) => {
      const total = fitTotal(task.scores);
      return { ...task, total, band: fitBand(total) };
    })
    .sort((a, b) => b.total - a.total);
}
