import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";

import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils.js";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 bg-[#111113] border border-white/[0.06] rounded-2xl h-full">

      <div className="p-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">

          {/* Left */}
          <div className="flex items-center gap-3">

            <div className="p-2.5 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10">

              <ZapIcon className="size-4 text-[#00FF88]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Live Sessions
              </h2>

              <p className="text-xs text-zinc-500 mt-0.5">
                Ongoing collaborative interviews
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/10">

            <div className="size-1.5 bg-[#00FF88] rounded-full animate-pulse" />

            <span className="text-xs font-medium text-[#00FF88]">
              {sessions.length} Active
            </span>
          </div>
        </div>

        {/* Sessions */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">

          {isLoading ? (

            <div className="flex items-center justify-center py-16">
              <LoaderIcon className="size-7 animate-spin text-[#00FF88]" />
            </div>

          ) : sessions.length > 0 ? (

            sessions.map((session) => (
              <div
                key={session._id}
                className="group border border-white/[0.06] bg-[#18181B] rounded-xl hover:border-[#00FF88]/20 transition-all duration-200"
              >

                <div className="flex items-center justify-between gap-4 p-4">

                  {/* Left */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">

                    {/* Icon */}
                    <div className="relative size-11 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

                      <Code2Icon className="size-5 text-[#00FF88]" />

                      <div className="absolute -top-1 -right-1 size-3 bg-[#00FF88] rounded-full border border-[#18181B]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">

                      {/* Title */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">

                        <h3 className="font-semibold text-[15px] text-white truncate">
                          {session.problem}
                        </h3>

                        <span
                          className={`badge badge-sm border-0 text-[10px] font-medium ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.charAt(0).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 flex-wrap">

                        {/* Host */}
                        <div className="flex items-center gap-1">

                          <CrownIcon className="size-3.5 text-yellow-400" />

                          <span className="text-zinc-400">
                            {session.host?.name}
                          </span>
                        </div>

                        {/* Users */}
                        <div className="flex items-center gap-1">

                          <UsersIcon className="size-3.5" />

                          <span>
                            {session.participant ? "2/2" : "1/2"}
                          </span>
                        </div>

                        {/* Status */}
                        {session.participant &&
                        !isUserInSession(session) ? (

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/10">
                            FULL
                          </span>

                        ) : (

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/10">
                            OPEN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  {session.participant &&
                  !isUserInSession(session) ? (

                    <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-500 text-sm font-medium cursor-not-allowed">
                      Full
                    </button>

                  ) : (

                    <Link
                      to={`/session/${session._id}`}
                      className="group/btn flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FF88] text-black text-sm font-semibold hover:bg-[#00E67A] transition-all duration-200"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}

                      <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))

          ) : (

            <div className="text-center py-16">

              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-[#00FF88]/5 border border-[#00FF88]/10 flex items-center justify-center">

                <SparklesIcon className="w-8 h-8 text-[#00FF88]/50" />
              </div>

              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                No active sessions
              </h3>

              <p className="text-sm text-zinc-500">
                Start a coding session to collaborate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;