import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import PROBLEMS from "../data/transformedProblems.json";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import { executeCode } from "../lib/piston";
import { getDifficultyBadgeClass } from "../lib/utils.js";

const ProblemPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] =
    useState("1");

  const [selectedLanguage, setSelectedLanguage] =
    useState("javascript");

  const initialProblem =
    PROBLEMS.find((p) => p.id === "1");

  const [code, setCode] = useState(
    initialProblem?.starterCode?.javascript || ""
  );

  const [output, setOutput] = useState(null);

  const [isRunning, setIsRunning] =
    useState(false);

  // CURRENT PROBLEM
  const currentProblem = PROBLEMS.find(
    (p) => p.id === currentProblemId
  );

  // CHANGE PROBLEM
  useEffect(() => {

    const foundProblem = PROBLEMS.find(
      (p) => p.id === id
    );

    if (id && foundProblem) {

      setCurrentProblemId(id);

      setCode(
        foundProblem.starterCode[
          selectedLanguage
        ] || ""
      );

      setOutput(null);
    }
  }, [id, selectedLanguage]);

  // CHANGE LANGUAGE
  const handleLanguageChange = (e) => {

    const newLanguage = e.target.value;

    setSelectedLanguage(newLanguage);

    setCode(
      currentProblem?.starterCode?.[
        newLanguage
      ] || ""
    );
  };

  // CHANGE PROBLEM ROUTE
  const handleProblemChange = (
    newProblemId
  ) => {
    navigate(`/problem/${newProblemId}`);
  };

  // CONFETTI
  const triggerConfetti = () => {

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  // NORMALIZE OUTPUT
  const normalizeOutput = (output) => {

    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  // CHECK TESTS
  const checkIfTestsPassed = (
    actualOutput,
    expectedOutput
  ) => {

    const normalizedActual =
      normalizeOutput(actualOutput);

    const normalizedExpected =
      normalizeOutput(expectedOutput);

    return (
      normalizedActual ===
      normalizedExpected
    );
  };

  // RUN CODE
  const handleRunCode = async () => {

    setIsRunning(true);

    setOutput(null);

    const result = await executeCode(
      selectedLanguage,
      code
    );

    setOutput(result);

    setIsRunning(false);

    if (result.success) {

      const expectedOutput =
        currentProblem?.expectedOutput?.[
          selectedLanguage
        ] || "";

      const testsPassed =
        checkIfTestsPassed(
          result.output,
          expectedOutput
        );

      if (testsPassed) {

        triggerConfetti();

        toast.success(
          "All tests passed!"
        );
      }

      else {

        toast.error(
          "Tests failed!"
        );
      }
    }

    else {

      toast.error(
        "Code execution failed!"
      );
    }
  };

  // LOADING
  if (!currentProblem) {

    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        Problem not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[240px] h-[240px] bg-[#00FF88]/5 blur-2xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/5 blur-2xl rounded-full" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="relative z-10 pt-23 px-4 pb-4">

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

                  Coding Problem
                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold tracking-[-0.05em] leading-tight">

                  <span className="text-white">
                    {currentProblem.title}
                  </span>
                </h1>

                {/* DESC */}
                <p className="mt-4 text-zinc-400 text-[15px] leading-relaxed max-w-2xl">

                  Solve coding problems,
                  run test cases, and improve
                  your interview skills in
                  real-time.
                </p>
              </div>

              {/* DIFFICULTY */}
              <div
                className={`badge border-0 px-5 py-4 text-sm font-semibold shrink-0 ${getDifficultyBadgeClass(
                  currentProblem.difficulty.toLowerCase()
                )}`}
              >
                {currentProblem.difficulty}
              </div>
            </div>
          </div>

          {/* PANELS */}
          <div className="h-[calc(100vh-180px)]">

            <PanelGroup
              direction="horizontal"
              className="gap-3"
            >

              {/* LEFT */}
              <Panel
                defaultSize={40}
                minSize={28}
              >

                <div className="h-full bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">

                  <ProblemDescription
                    problem={currentProblem}
                    currentProblemId={
                      currentProblemId
                    }
                    onProblemChange={
                      handleProblemChange
                    }
                    allProblems={PROBLEMS}
                  />
                </div>
              </Panel>

              {/* RESIZE */}
              <PanelResizeHandle className="w-2 flex items-center justify-center">

                <div className="w-[2px] h-14 rounded-full bg-white/[0.06] hover:bg-[#00FF88]/30 transition-all duration-200" />
              </PanelResizeHandle>

              {/* RIGHT */}
              <Panel
                defaultSize={62}
                minSize={30}
              >

                <PanelGroup
                  direction="vertical"
                  className="gap-3"
                >

                  {/* EDITOR */}
                  <Panel
                    defaultSize={72}
                    minSize={35}
                  >

                    <div className="h-full bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">

                      <CodeEditorPanel
                        selectedLanguage={
                          selectedLanguage
                        }
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={
                          handleLanguageChange
                        }
                        onCodeChange={setCode}
                        onRunCode={
                          handleRunCode
                        }
                      />
                    </div>
                  </Panel>

                  {/* RESIZE */}
                  <PanelResizeHandle className="h-2 flex items-center justify-center">

                    <div className="h-[2px] w-14 rounded-full bg-white/[0.06] hover:bg-[#00FF88]/30 transition-all duration-200" />
                  </PanelResizeHandle>

                  {/* OUTPUT */}
                  <Panel
                    defaultSize={35}
                    minSize={25}
                  >

                    <div className="h-full bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">

                      <OutputPanel
                        output={output}
                      />
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProblemPage;