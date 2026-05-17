import {
  TerminalIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";

function OutputPanel({ output }) {
  return (
    <div className="h-full bg-[#111113] flex flex-col text-white">

      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

            <TerminalIcon className="w-4 h-4 text-[#00FF88]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Output
            </h2>

            <p className="text-[11px] text-zinc-500">
              Execution results
            </p>
          </div>
        </div>

        {/* Status */}
        {output && (
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-medium border flex items-center gap-1
              
              ${
                output.success
                  ? "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/10"
                  : "bg-red-500/10 text-red-400 border-red-500/10"
              }
            `}
          >

            {output.success ? (
              <CheckCircle2Icon className="w-3 h-3" />
            ) : (
              <XCircleIcon className="w-3 h-3" />
            )}

            {output.success ? "SUCCESS" : "ERROR"}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-5">

        {output === null ? (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/5 border border-[#00FF88]/10 flex items-center justify-center mb-4">

              <TerminalIcon className="w-6 h-6 text-[#00FF88]/50" />
            </div>

            <h3 className="text-sm font-medium text-zinc-300 mb-1">
              No Output Yet
            </h3>

            <p className="text-xs text-zinc-500 max-w-sm">
              Run your code to view execution results
              and test case outputs here.
            </p>
          </div>

        ) : output.success ? (

          <div className="bg-[#18181B] border border-[#00FF88]/10 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">

              <CheckCircle2Icon className="w-4 h-4 text-[#00FF88]" />

              <span className="text-sm font-medium text-[#00FF88]">
                Execution Successful
              </span>
            </div>

            <pre className="text-sm font-mono text-zinc-200 whitespace-pre-wrap break-words leading-7 overflow-x-auto">
              {output.output}
            </pre>
          </div>

        ) : (

          <div className="space-y-4">

            {/* Output */}
            {output.output && (

              <div className="bg-[#18181B] border border-white/[0.06] rounded-xl p-4">

                <div className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-wide">
                  Console Output
                </div>

                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap break-words leading-7 overflow-x-auto">
                  {output.output}
                </pre>
              </div>
            )}

            {/* Error */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">

              <div className="flex items-center gap-2 mb-3">

                <XCircleIcon className="w-4 h-4 text-red-400" />

                <span className="text-sm font-medium text-red-400">
                  Execution Error
                </span>
              </div>

              <pre className="text-sm font-mono text-red-300 whitespace-pre-wrap break-words leading-7 overflow-x-auto">
                {output.error}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;