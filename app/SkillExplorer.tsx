"use client";

import { useMemo, useState } from "react";
import { workItems, type WorkCategory } from "./data";
import { WorkCard } from "./components";

const filters: ("All" | WorkCategory)[] = ["All", "Design", "Motion", "Digital", "Growth"];

export function SkillExplorer() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => (active === "All" ? workItems : workItems.filter((item) => item.category === active)),
    [active],
  );

  return (
    <div>
      <div className="filter-bar" role="toolbar" aria-label="Filter expertise">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={filter === active ? "active" : ""}
            aria-pressed={filter === active}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="work-grid" aria-live="polite">
        {visible.map((item) => (
          <WorkCard key={item.slug} item={item} index={workItems.indexOf(item)} />
        ))}
      </div>
    </div>
  );
}
