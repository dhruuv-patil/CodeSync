import { Link } from "react-router";
import { SignInButton } from "@clerk/clerk-react";

import {
  ArrowRight,
  Code2,
  Users,
  Video,
  Sparkles,
  Play,
  CheckCircle2,
} from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden relative">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[240px] h-[240px] bg-[#00FF88]/5 blur-2xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/5 blur-2xl rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">

        <div className="flex items-center h-[58px] px-5 rounded-2xl border border-white/10 bg-[#09090B]/70 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.25)]">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 mr-auto"
          >

            {/* Dot */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF88] blur-md opacity-70 rounded-full" />

              <div className="relative w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
            </div>

            {/* Text */}
            <h1 className="text-[18px] font-bold tracking-[-0.03em]">

              <span className="text-white">
                Code
              </span>

              <span className="text-[#00FF88]">
                Sync
              </span>
            </h1>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2">

            <a
              href="#features"
              className="px-5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.03]"
            >
              Features
            </a>

            <a
              href="#workspace"
              className="px-5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.03]"
            >
              Workspace
            </a>

            <a
              href="#dashboard"
              className="px-5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.03]"
            >
              Dashboard
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-4">

            <SignInButton mode="modal">

              <button className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00FF88] text-black text-[13px] font-semibold hover:bg-[#00E67A] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.35)]">

                Get Started

                <ArrowRight className="size-4" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 items-stretch">

          {/* LEFT HERO CARD */}
          <div className="relative rounded-[32px] border border-white/5 bg-[#0B0B0E] overflow-hidden p-8 md:p-10">

            {/* Glow */}
            <div className="absolute inset-0 ]" />

            <div className="relative">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-7">

                <div className="relative">
              <div className="absolute inset-0 bg-[#00FF88] blur-md opacity-70 rounded-full" />

              <div className="relative w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
            </div>

                LIVE CODING PLATFORM
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em] mb-6">

                Practice Real
                <br />

                Coding Interviews
                <br />

                <span className="text-[#00FF88]">
                  Together
                </span>
              </h1>

              {/* Description */}
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">

                Start collaborative coding interviews, solve DSA problems,
                communicate live with teammates, and practice in a modern
                realtime coding workspace.
              </p>

              {/* Pills */}
              <div className="flex flex-wrap gap-3 mb-10">

                {[
                  "Realtime Collaboration",
                  "Live Interviews",
                  "Multi-language Compiler",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">

                <SignInButton mode="modal">
                  <button className="h-14 px-7 rounded-2xl bg-[#00FF88] text-black font-semibold flex items-center gap-2 hover:opacity-90 transition-all hover:shadow-[0_0_25px_rgba(0,255,136,0.25)]">

                    Get Started

                    <ArrowRight className="size-5" />
                  </button>
                </SignInButton>

                <a
                  href="#features"
                  className="h-14 px-7 rounded-2xl border border-white/5 bg-white/[0.03] flex items-center gap-2 text-zinc-200 hover:bg-white/[0.05] transition-all"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CODE CARD */}
          <div className="relative rounded-[32px] border border-white/5 bg-[#0B0B0E] overflow-hidden">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,136,0.10),transparent_40%)]" />

            <div className="relative h-full flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">

                <div>
                  <p className="text-zinc-500 text-sm">
                    Live Session
                  </p>

                  <h3 className="text-lg font-semibold">
                    Realtime Workspace
                  </h3>
                </div>

                <div className="px-4 py-2 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 text-[#00FF88] text-sm font-medium">
                  Live
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 p-5">

                <div className="rounded-2xl border border-white/5 bg-[#09090B] overflow-hidden h-full">

                  {/* Topbar */}
                  <div className="flex items-center justify-between px-5 h-14 border-b border-white/5">

                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-red-500" />
                      <div className="size-3 rounded-full bg-yellow-500" />
                      <div className="size-3 rounded-full bg-green-500" />
                    </div>

                    <div className="text-zinc-500 text-sm">
                      maximum-subarray.java
                    </div>
                  </div>

                  {/* Code */}
                  <div className="p-6 space-y-3 font-mono text-sm overflow-hidden">

                    <div className="text-zinc-500">
                      class Solution {"{"}
                    </div>

                    <div className="ml-5 text-blue-400">
                      public int maxSubArray(int[] nums) {"{"}
                    </div>

                    <div className="ml-10 text-zinc-300">
                      int max = nums[0];
                    </div>

                    <div className="ml-10 text-zinc-300">
                      int current = nums[0];
                    </div>

                    <div className="ml-10 text-zinc-300">
                      for(int i = 1; i &lt; nums.length; i++) {"{"}
                    </div>

                    <div className="ml-16 text-zinc-300">
                      current = Math.max(nums[i], current + nums[i]);
                    </div>

                    <div className="ml-16 text-zinc-300">
                      max = Math.max(max, current);
                    </div>

                    <div className="ml-10 text-zinc-300">
                      {"}"}
                    </div>

                    <div className="ml-10 text-green-400">
                      return max;
                    </div>

                    <div className="ml-5 text-blue-400">
                      {"}"}
                    </div>

                    <div className="text-zinc-500">
                      {"}"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-4 pb-24"
      >

        <div className="mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-5">

            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF88] blur-md opacity-70 rounded-full" />

              <div className="relative w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
            </div>

            PLATFORM FEATURES
          </div>

          <h2 className="text-5xl font-black tracking-tight mb-4">

            Built For Modern
            <span className="text-[#00FF88]">
              {" "}Coding Interviews
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl">
            Everything you need for collaborative coding,
            technical interviews, and realtime teamwork.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {[
            {
              icon: Video,
              title: "Live Video Rooms",
              desc: "Conduct technical interviews with realtime communication.",
            },
            {
              icon: Code2,
              title: "Realtime Code Editor",
              desc: "Collaboratively solve coding problems with synchronized editing.",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              desc: "Practice pair programming and coding interviews together.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/5 bg-[#0B0B0E] p-7 hover:border-[#00FF88]/10 transition-all duration-300 relative overflow-hidden"
            >

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,136,0.12),transparent_45%)]" />

              <div className="relative">

                <div className="size-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center mb-6">

                  <feature.icon className="size-7 text-[#00FF88]" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;