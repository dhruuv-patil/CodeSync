import { useState } from "react";

import { Link } from "react-router";

import Navbar from "../components/Navbar";

import ProblemsSearch from "../components/ProblemSearch.jsx";

import PROBLEMS from "../data/transformedProblems.json";

import {
  ChevronRightIcon,
  Code2Icon,
} from "lucide-react";

import { getDifficultyBadgeClass } from "../lib/utils.js";

function ProblemsPage() {

  const problems = PROBLEMS;

  // SEARCH
  const [search, setSearch] =
    useState("");

  // FILTERED PROBLEMS
  const filteredProblems =
    problems.filter(
      (problem) =>
        problem.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        problem.category
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  // STATS
  const easyProblemsCount =
    problems.filter(
      (p) => p.difficulty === "Easy"
    ).length;

  const mediumProblemsCount =
    problems.filter(
      (p) => p.difficulty === "Medium"
    ).length;

  const hardProblemsCount =
    problems.filter(
      (p) => p.difficulty === "Hard"
    ).length;

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[240px] h-[240px] bg-[#00FF88]/5 blur-2xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/5 blur-2xl rounded-full" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="relative z-10 pt-23 px-4 pb-6">

        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <div className="mb-4 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111113] px-6 py-6">

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00FF88]/5 blur-2xl rounded-full" />

            <div className="relative flex items-center justify-between gap-8">

              {/* LEFT */}
              <div>

                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/10 bg-[#00FF88]/10 text-[#00FF88] text-[10px] font-semibold tracking-[0.14em] uppercase mb-5">

                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />

                  Coding Practice
                </div>

                {/* HEADING */}
                <h1 className="text-4xl font-bold tracking-[-0.05em] leading-tight">

                  <span className="text-white">
                    Practice Problems
                  </span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-zinc-400 text-[15px] leading-relaxed max-w-2xl">

                  Sharpen your coding skills
                  with curated interview
                  questions and real-world
                  problem-solving challenges.
                </p>
              </div>

              {/* STATS */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">

                {/* TOTAL */}
                <div className="bg-[#18181B] border border-white/[0.06] rounded-xl px-5 py-4 text-center min-w-[90px]">

                  <div className="text-2xl font-bold text-white">
                    {problems.length}
                  </div>

                  <div className="text-xs text-zinc-500 mt-1">
                    Total
                  </div>
                </div>

                {/* EASY */}
                <div className="bg-[#18181B] border border-white/[0.06] rounded-xl px-5 py-4 text-center min-w-[90px]">

                  <div className="text-2xl font-bold text-[#00FF88]">
                    {easyProblemsCount}
                  </div>

                  <div className="text-xs text-zinc-500 mt-1">
                    Easy
                  </div>
                </div>

                {/* MEDIUM */}
                <div className="bg-[#18181B] border border-white/[0.06] rounded-xl px-5 py-4 text-center min-w-[90px]">

                  <div className="text-2xl font-bold text-yellow-400">
                    {mediumProblemsCount}
                  </div>

                  <div className="text-xs text-zinc-500 mt-1">
                    Medium
                  </div>
                </div>

                {/* HARD */}
                <div className="bg-[#18181B] border border-white/[0.06] rounded-xl px-5 py-4 text-center min-w-[90px]">

                  <div className="text-2xl font-bold text-red-400">
                    {hardProblemsCount}
                  </div>

                  <div className="text-xs text-zinc-500 mt-1">
                    Hard
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <ProblemsSearch
            search={search}
            setSearch={setSearch}
          />

          {/* PROBLEMS */}
          <div className="space-y-3">

            {filteredProblems.map((problem) => (

              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="group block bg-[#111113] border border-white/[0.06] rounded-2xl p-5 hover:bg-[#151518] hover:border-[#00FF88]/10 transition-all duration-200"
              >

                <div className="flex items-center justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">

                    {/* ICON */}
                    <div className="w-11 h-11 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center shrink-0">

                      <Code2Icon className="w-5 h-5 text-[#00FF88]" />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                      {/* TOP */}
                      <div className="flex items-center gap-3 flex-wrap mb-1">

                        <h2 className="text-lg font-semibold text-white">
                          {problem.title}
                        </h2>

                        <span
                          className={`badge border-0 text-[10px] font-medium ${getDifficultyBadgeClass(
                            problem.difficulty.toLowerCase()
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* CATEGORY */}
                      <p className="text-sm text-zinc-500 mb-3">
                        {problem.category}
                      </p>

                      {/* DESCRIPTION */}
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-4xl line-clamp-2">

                        {problem.description.text}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF88] text-black text-sm font-semibold shrink-0">

                    Solve

                    <ChevronRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProblemsPage;