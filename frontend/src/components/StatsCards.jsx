import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="grid grid-cols-1 gap-4">

      {/* Active Sessions */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 hover:bg-[#151518] transition-all duration-200">

        {/* Top */}
        <div className="flex items-center justify-between mb-5">

          <div className="w-11 h-11 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

            <UsersIcon className="w-5 h-5 text-[#00FF88]" />
          </div>

          <div className="px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/10 text-[#00FF88] text-[11px] font-medium">
            Live
          </div>
        </div>

        {/* Number */}
        <h2 className="text-4xl font-bold tracking-[-0.04em] text-white">
          {activeSessionsCount}
        </h2>

        {/* Label */}
        <p className="text-sm text-zinc-500 mt-1">
          Active Sessions
        </p>
      </div>

      {/* Total Sessions */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 hover:bg-[#151518] transition-all duration-200">

        {/* Top */}
        <div className="flex items-center justify-between mb-5">

          <div className="w-11 h-11 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

            <TrophyIcon className="w-5 h-5 text-[#00FF88]" />
          </div>
        </div>

        {/* Number */}
        <h2 className="text-4xl font-bold tracking-[-0.04em] text-white">
          {recentSessionsCount}
        </h2>

        {/* Label */}
        <p className="text-sm text-zinc-500 mt-1">
          Total Sessions
        </p>
      </div>
    </div>
  );
}

export default StatsCards;