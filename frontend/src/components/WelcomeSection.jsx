import { useUser } from "@clerk/clerk-react";

import {
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090B]/70 backdrop-blur-2xl px-8 py-8">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF88]/10 blur-3xl rounded-full" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* Left Content */}
        <div>

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88] text-[10px] font-semibold tracking-[0.14em] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />

            Live Coding Platform
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-5xl font-black tracking-[-0.06em] leading-[0.95]">

            <span className="text-white">
              Welcome back,
            </span>

            <br />

            <span className="text-white">
              {user?.firstName || "Developer"} 👋
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-zinc-400 text-[15px] leading-relaxed max-w-2xl">
            Start collaborative coding interviews, solve real problems,
            and practice with others in real-time.
          </p>
        </div>

        {/* Right Button */}
        <div className="flex items-center">

          <button
            onClick={onCreateSession}
            className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#00FF88] text-black text-[14px] font-semibold transition-all duration-200 hover:bg-[#00E67A] hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]"
          >

            <SparklesIcon className="w-5 h-5" />

            <span>Create Session</span>

            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;