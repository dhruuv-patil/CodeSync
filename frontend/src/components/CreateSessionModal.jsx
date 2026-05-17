import {
  Code2Icon,
  LoaderIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";

import transformedProblems from "../data/transformedProblems.json";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {

  const problems = transformedProblems;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#00FF88]/10 blur-3xl rounded-full" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/5 bg-[#111113]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.35)]">

        {/* TOP GRADIENT */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative p-8">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">

            {/* ICON */}
            <div className="relative">

              <div className="absolute inset-0 bg-[#00FF88] blur-xl opacity-30 rounded-2xl" />

              <div className="relative size-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center">

                <SparklesIcon className="size-7 text-[#00FF88]" />
              </div>
            </div>

            {/* TEXT */}
            <div>

              <h3 className="text-3xl font-black tracking-tight text-white">
                Create Session
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                Start a realtime collaborative coding interview
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-7">

            {/* PROBLEM SELECT */}
            <div className="space-y-3">

              <div className="flex items-center justify-between">

                <label className="text-sm font-semibold text-zinc-300">
                  Select Problem
                </label>

                <span className="text-xs text-red-400 font-medium">
                  Required
                </span>
              </div>

              {/* SEARCH INPUT */}
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full bg-[#09090B] border border-white/5 rounded-2xl px-5 py-4 text-zinc-200 outline-none focus:border-[#00FF88]/30 focus:ring-4 focus:ring-[#00FF88]/5 transition-all duration-300 placeholder:text-zinc-500"
                value={roomConfig.search || ""}
                onChange={(e) =>
                  setRoomConfig({
                    ...roomConfig,
                    search: e.target.value,
                  })
                }
              />

              {/* SELECT */}
              <select
                className="w-full bg-[#09090B] border border-white/5 rounded-2xl px-5 py-4 text-zinc-200 outline-none focus:border-[#00FF88]/30 focus:ring-4 focus:ring-[#00FF88]/5 transition-all duration-300"
                value={roomConfig.problem}
                onChange={(e) => {

                  const selectedProblem = problems.find(
                    (p) => p.title === e.target.value
                  );

                  setRoomConfig({
                    ...roomConfig,
                    difficulty: selectedProblem.difficulty,
                    problem: e.target.value,
                  });
                }}
              >

                <option value="" disabled>
                  Choose a coding problem...
                </option>

                {problems
                  .filter((problem) =>
                    problem.title
                      .toLowerCase()
                      .includes(
                        (roomConfig.search || "").toLowerCase()
                      )
                  )
                  .map((problem, index) => (
                    <option
                      key={`${problem.title}-${index}`}
                      value={problem.title}
                    >
                      {problem.title} ({problem.difficulty})
                    </option>
                  ))}
              </select>
            </div>

            {/* SESSION SUMMARY */}
            {roomConfig.problem && (
              <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5">

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-blue-500/5" />

                <div className="relative flex gap-4">

                  {/* LEFT ICON */}
                  <div className="mt-1">

                    <div className="relative">

                      <div className="absolute inset-0 bg-[#00FF88] blur-xl opacity-20 rounded-2xl" />

                      <div className="relative size-12 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center">

                        <Code2Icon className="size-6 text-[#00FF88]" />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="space-y-3 flex-1">

                    <h4 className="font-bold text-[#00FF88] text-lg">
                      Session Summary
                    </h4>

                    <div className="space-y-2 text-sm">

                      <div className="flex items-center justify-between">

                        <span className="text-zinc-500">
                          Problem
                        </span>

                        <span className="font-semibold text-white text-right">
                          {roomConfig.problem}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">

                        <span className="text-zinc-500">
                          Difficulty
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${roomConfig.difficulty === "easy"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : roomConfig.difficulty === "medium"
                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                        >
                          {roomConfig.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">

                        <span className="text-zinc-500">
                          Participants
                        </span>

                        <span className="font-semibold text-white">
                          2 (1-on-1 Interview)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-4 mt-10">

            {/* CANCEL */}
            <button
              className="px-6 py-3 rounded-xl border border-white/5 bg-white/[0.03] text-zinc-300 font-semibold hover:bg-white/[0.05] transition-all duration-300"
              onClick={onClose}
            >
              Cancel
            </button>

            {/* CREATE */}
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00FF88] text-black font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
            >

              {isCreating ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <PlusIcon className="size-5" />
              )}

              {isCreating
                ? "Creating..."
                : "Create Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;