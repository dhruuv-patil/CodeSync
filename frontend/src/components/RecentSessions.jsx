import {
  Code2,
  Clock,
  Users,
  Trophy,
  Loader,
} from "lucide-react";

import { getDifficultyBadgeClass } from "../lib/utils.js";

import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

          <Clock className="w-4 h-4 text-[#00FF88]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Recent Sessions
          </h2>

          <p className="text-xs text-zinc-500 mt-0.5">
            Your previous collaborative interviews
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

        {isLoading ? (

          <div className="col-span-full flex items-center justify-center py-16">

            <Loader className="w-7 h-7 animate-spin text-[#00FF88]" />
          </div>

        ) : sessions.length > 0 ? (

          sessions.map((session) => (
            <div
              key={session._id}
              className="group bg-[#18181B] border border-white/[0.06] rounded-xl p-4 hover:border-[#00FF88]/20 transition-all duration-200"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3 mb-4">

                <div className="flex items-start gap-3 min-w-0">

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center shrink-0">

                    <Code2 className="w-5 h-5 text-[#00FF88]" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0">

                    <h3 className="font-semibold text-[15px] text-white truncate mb-1">
                      {session.problem}
                    </h3>

                    <span
                      className={`badge badge-sm border-0 text-[10px] font-medium ${getDifficultyBadgeClass(
                        session.difficulty
                      )}`}
                    >
                      {session.difficulty}
                    </span>
                  </div>
                </div>

                {/* Status */}
                {session.status === "active" && (

                  <div className="px-2 py-0.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/10 text-[#00FF88] text-[10px] font-medium flex items-center gap-1">

                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />

                    ACTIVE
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="space-y-2 text-xs text-zinc-500 mb-4">

                <div className="flex items-center gap-2">

                  <Clock className="w-3.5 h-3.5" />

                  <span>
                    {formatDistanceToNow(new Date(session.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">

                  <Users className="w-3.5 h-3.5" />

                  <span>
                    {session.participant ? "2 Participants" : "1 Participant"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">

                <span className="text-[10px] uppercase tracking-wide text-zinc-600 font-medium">
                  Completed
                </span>

                <span className="text-[10px] text-zinc-600">
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))

        ) : (

          <div className="col-span-full text-center py-14">

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00FF88]/5 border border-[#00FF88]/10 flex items-center justify-center">

              <Trophy className="w-7 h-7 text-[#00FF88]/40" />
            </div>

            <h3 className="text-base font-semibold text-zinc-300 mb-1">
              No sessions yet
            </h3>

            <p className="text-sm text-zinc-500">
              Start your first coding interview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;