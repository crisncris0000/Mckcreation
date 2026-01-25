import React, { useMemo } from "react";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function buildPageItems(current, total, siblings = 1) {
  // current is 0-based, but UI shows 1-based
  const last = total - 1;
  if (total <= 0) return [];

  const pages = [];
  const left = clamp(current - siblings, 0, last);
  const right = clamp(current + siblings, 0, last);

  const showLeftEllipsis = left > 1;
  const showRightEllipsis = right < last - 1;

  // Always show first
  pages.push(0);

  if (showLeftEllipsis) pages.push("…");
  else {
    for (let p = 1; p < left; p++) pages.push(p);
  }

  // Middle range
  for (let p = left; p <= right; p++) {
    if (p !== 0 && p !== last) pages.push(p);
  }

  if (showRightEllipsis) pages.push("…");
  else {
    for (let p = right + 1; p < last; p++) pages.push(p);
  }

  // Always show last (if different)
  if (last !== 0) pages.push(last);

  // Remove duplicates (can happen with tiny totals)
  return pages.filter((v, i, arr) => i === 0 || v !== arr[i - 1]);
}

const PageCounter = ({
  page,              // 0-based current page
  totalPages,        // total number of pages (e.g., 1..N)
  onPageChange,      // (newPage) => void
  siblings = 1,      // how many pages around current
  className = "",
}) => {
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const items = useMemo(
    () => buildPageItems(page, totalPages, siblings),
    [page, totalPages, siblings]
  );

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
        {/* Prev */}
        <button
          type="button"
          onClick={() => canGoPrev && onPageChange(page - 1)}
          disabled={!canGoPrev}
          className={[
            "rounded-xl px-3 py-2 text-sm font-medium transition",
            canGoPrev
              ? "bg-gray-50 text-gray-800 hover:bg-gray-100"
              : "bg-gray-50 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {items.map((it, idx) => {
            if (it === "…") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm text-gray-400"
                >
                  …
                </span>
              );
            }

            const p = it; // 0-based
            const isActive = p === page;

            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "min-w-[40px] rounded-xl px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-gray-900 text-white shadow"
                    : "bg-white text-gray-700 hover:bg-gray-100",
                ].join(" ")}
              >
                {p + 1}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => canGoNext && onPageChange(page + 1)}
          disabled={!canGoNext}
          className={[
            "rounded-xl px-3 py-2 text-sm font-medium transition",
            canGoNext
              ? "bg-gray-50 text-gray-800 hover:bg-gray-100"
              : "bg-gray-50 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
        </button>

        {/* Page info */}
        <div className="hidden sm:block pl-2 pr-1 text-sm text-gray-500">
          Page <span className="font-semibold text-gray-700">{page + 1}</span> /{" "}
          <span className="font-semibold text-gray-700">{totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default PageCounter;