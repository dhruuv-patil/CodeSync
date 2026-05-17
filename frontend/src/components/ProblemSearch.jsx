import { SearchIcon } from "lucide-react";

function ProblemsSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-4">

      <div className="relative">

        {/* Icon */}
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#111113]
            pl-12
            pr-5
            text-white
            text-sm
            placeholder:text-zinc-500
            outline-none
            transition-all
            duration-200
            focus:border-[#00FF88]/20
            focus:bg-[#131316]
          "
        />

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[#00FF88]/[0.015]" />
      </div>
    </div>
  );
}

export default ProblemsSearch;