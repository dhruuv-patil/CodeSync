import { getDifficultyBadgeClass } from "../lib/utils.js";

const ProblemDescription = ({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-[#111113] text-white">

      {/* Header */}
      <div className="p-5 border-b border-white/[0.06]">

        {/* Top */}
        <div className="flex items-start justify-between gap-4 mb-4">

          <div>

            <h1 className="text-2xl font-bold tracking-[-0.04em] text-white">
              {problem.title}
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              {problem.category}
            </p>
          </div>

          <span
            className={`badge border-0 font-medium ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Select */}
        <select
          className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#00FF88]/20 transition-all duration-200"
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} — {p.difficulty}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        {/* Description */}
        <div className="bg-[#18181B] border border-white/[0.06] rounded-2xl p-5">

          <h2 className="text-lg font-semibold text-white mb-4">
            Description
          </h2>

          <div className="space-y-3 text-sm leading-7 text-zinc-300">

            <p>{problem.description}</p>
          </div>
        </div>

        {/* Examples */}
        {problem.examples?.length > 0 && (
          <div className="bg-[#18181B] border border-white/[0.06] rounded-2xl p-5">

            <h2 className="text-lg font-semibold text-white mb-4">
              Examples
            </h2>

            <div className="space-y-4">

              {(problem.examples || []).map((example, idx) => (

                <div
                  key={`example-${idx}`}
                  className="bg-[#111113] border border-white/[0.06] rounded-xl p-4"
                >

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">

                    <div className="w-6 h-6 rounded-md bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center text-[#00FF88] text-[11px] font-semibold">

                      {idx + 1}
                    </div>

                    <p className="text-sm font-medium text-white">
                      Example {idx + 1}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-7">

                    {example.example_text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints?.length > 0 && (
          <div className="bg-[#18181B] border border-white/[0.06] rounded-2xl p-5">

            <h2 className="text-lg font-semibold text-white mb-4">
              Constraints
            </h2>

            <ul className="space-y-3">

              {(problem.constraints || []).map((constraint, idx) => (

                <li
                  key={`constraint-${idx}`}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >

                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-2 shrink-0" />

                  <code className="text-sm text-zinc-300 break-all">
                    {constraint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;