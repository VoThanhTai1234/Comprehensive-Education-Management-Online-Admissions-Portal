"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchHealth } from "@/lib/api/health";
import type { HealthData } from "@/types/api";

type CheckState =
  | { status: "checking" }
  | { status: "up"; health: HealthData }
  | { status: "unavailable"; message: string };

export function HealthCheck() {
  const [state, setState] = useState<CheckState>({ status: "checking" });

  const loadHealth = useCallback(async (signal?: AbortSignal) => {
    try {
      const health = await fetchHealth(signal);
      setState({ status: "up", health });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setState({
        status: "unavailable",
        message:
          error instanceof Error
            ? error.message
            : "Không thể kiểm tra trạng thái backend.",
      });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchHealth(controller.signal).then(
      (health) => setState({ status: "up", health }),
      (error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          status: "unavailable",
          message:
            error instanceof Error
              ? error.message
              : "Không thể kiểm tra trạng thái backend.",
        });
      },
    );
    return () => controller.abort();
  }, []);

  function retry() {
    setState({ status: "checking" });
    void loadHealth();
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Kết nối backend</h2>
          <p aria-live="polite" className="mt-1 text-sm text-slate-600">
            {state.status === "checking" && "Đang kiểm tra /api/health…"}
            {state.status === "up" &&
              `${state.health.service}: ${state.health.status} · Database: ${state.health.database}`}
            {state.status === "unavailable" && state.message}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            aria-label={`Trạng thái ${state.status}`}
            className={`h-3 w-3 rounded-full ${
              state.status === "up"
                ? "bg-emerald-500"
                : state.status === "checking"
                  ? "animate-pulse bg-amber-400"
                  : "bg-rose-500"
            }`}
          />
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
            disabled={state.status === "checking"}
            onClick={retry}
            type="button"
          >
            Kiểm tra lại
          </button>
        </div>
      </div>
    </div>
  );
}
