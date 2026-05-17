import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions.js";

import transformedProblems from "../data/transformedProblems.json";

import { executeCode } from "../lib/piston.js";

import Navbar from "../components/Navbar";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
} from "lucide-react";

import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient.js";

import {
  StreamCall,
  StreamVideo,
} from "@stream-io/video-react-sdk";

import VideoCallUI from "../components/VideoCallUI";

const SessionPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useUser();

  const [output, setOutput] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation = useJoinSession();

  const endSessionMutation = useEndSession();

  const session = sessionData;

  const isHost = session?.host?.clerkId === user?.id;

  const isParticipant =
    session?.participant?.clerkId === user?.id;

  const {
    call,
    channel,
    chatClient,
    isInitializingCall,
    streamClient,
  } = useStreamClient(
    sessionData,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = sessionData?.problem
    ? transformedProblems.find(
        (p) => p.title === sessionData.problem
      )
    : null;

  const [selectedLanguage, setSelectedLanguage] =
    useState("javascript");

  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || ""
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;

    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, {
      onSuccess: refetch,
    });
  }, [
    session,
    user,
    loadingSession,
    isHost,
    isParticipant,
    id,
  ]);

  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") {
      navigate("/dashboard");
    }
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(
        problemData.starterCode[selectedLanguage]
      );
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    setSelectedLanguage(newLang);

    const starterCode =
      problemData?.starterCode?.[newLang] || "";

    setCode(starterCode);

    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);

    setOutput(null);

    const result = await executeCode(
      selectedLanguage,
      code
    );

    setOutput(result);

    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session?"
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () =>
          navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-[#09090B] text-white overflow-hidden relative flex flex-col">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[240px] h-[240px] bg-[#00FF88]/5 blur-2xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/5 blur-2xl rounded-full" />
      </div>

      <Navbar />

      <div className="flex-1 pt-24 px-20 pb-4 relative z-10 overflow-hidden">

        <PanelGroup direction="horizontal">

          {/* LEFT SIDE */}
          <Panel defaultSize={55} minSize={30}>

            <div className="h-full overflow-hidden rounded-3xl border border-white/5 bg-[#111113]/90 backdrop-blur-2xl">

              <PanelGroup direction="vertical">

                {/* PROBLEM PANEL */}
                <Panel defaultSize={48} minSize={20}>

                  <div className="h-full overflow-y-auto">

                    {/* HEADER */}
                    <div className="p-6 border-b border-white/5 bg-black/10 backdrop-blur-xl">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h1 className="text-3xl font-black tracking-tight text-white">

                            {sessionData?.problem || "Loading..."}
                          </h1>

                          {problemData?.category && (
                            <p className="text-zinc-500 mt-1">

                              {problemData.category}
                            </p>
                          )}

                          <p className="text-zinc-500 mt-3 text-sm">

                            Host:{" "}
                            {sessionData?.host?.name ||
                              "Loading..."}

                            {" • "}

                            {sessionData?.participant
                              ? 2
                              : 1}
                            /2 participants
                          </p>
                        </div>

                        <div className="flex items-center gap-3">

                          {/* Difficulty */}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              session?.difficulty ===
                              "easy"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : session?.difficulty ===
                                  "medium"
                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            {session?.difficulty}
                          </span>

                          {/* End Session */}
                          {isHost &&
                            session?.status ===
                              "active" && (
                              <button
                                onClick={
                                  handleEndSession
                                }
                                disabled={
                                  endSessionMutation.isPending
                                }
                                className="h-10 px-4 rounded-xl bg-red-500/15 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2 hover:bg-red-500/20 transition-all"
                              >
                                {endSessionMutation.isPending ? (
                                  <Loader2Icon className="w-4 h-4 animate-spin" />
                                ) : (
                                  <LogOutIcon className="w-4 h-4" />
                                )}

                                End Session
                              </button>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
<div className="p-6 space-y-5">

  {/* DESCRIPTION */}
  {problemData?.description && (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5">

      <h2 className="text-xl font-bold mb-4 text-white">
        Description
      </h2>

      <div className="space-y-3 text-zinc-300 leading-relaxed">

        <p>
          {problemData.description}
        </p>
      </div>
    </div>
  )}

  {/* EXAMPLES */}
  {problemData?.examples?.length > 0 && (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5">

      <h2 className="text-xl font-bold mb-5 text-white">
        Examples
      </h2>

      <div className="space-y-4">

        {(problemData.examples || []).map(
          (example, idx) => (
            <div
              key={`example-${idx}`}
              className="rounded-2xl bg-[#09090B] border border-white/5 p-4"
            >

              {/* Header */}
              <div className="flex items-center gap-2 mb-3">

                <div className="size-6 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-xs text-[#00FF88] font-bold">

                  {idx + 1}
                </div>

                <p className="font-semibold text-white">
                  Example {idx + 1}
                </p>
              </div>

              {/* Content */}
              <div className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-7">

                {example.example_text}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )}

  {/* CONSTRAINTS */}
  {problemData?.constraints?.length > 0 && (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5">

      <h2 className="text-xl font-bold mb-4 text-white">
        Constraints
      </h2>

      <ul className="space-y-2">

        {(problemData.constraints || []).map(
          (constraint, idx) => (
            <li
              key={`constraint-${idx}`}
              className="flex gap-2 text-zinc-300"
            >

              <span className="text-[#00FF88]">
                •
              </span>

              <code className="text-sm">
                {constraint}
              </code>
            </li>
          )
        )}
      </ul>
    </div>
  )}
</div>
                  </div>
                </Panel>

                <PanelResizeHandle className="h-2 bg-transparent hover:bg-[#00FF88]/10 transition-all cursor-row-resize" />

                {/* CODE EDITOR */}
                <Panel defaultSize={35} minSize={25}>

                  <CodeEditorPanel
                    selectedLanguage={
                      selectedLanguage
                    }
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={
                      handleLanguageChange
                    }
                    onCodeChange={(value) =>
                      setCode(value)
                    }
                    onRunCode={handleRunCode}
                  />
                </Panel>

                <PanelResizeHandle className="h-2 bg-transparent hover:bg-[#00FF88]/10 transition-all cursor-row-resize" />

                {/* OUTPUT */}
                <Panel defaultSize={17} minSize={15}>

                  <OutputPanel output={output} />
                </Panel>
              </PanelGroup>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-transparent hover:bg-[#00FF88]/10 transition-all cursor-col-resize" />

          {/* RIGHT SIDE */}
          <Panel defaultSize={45} minSize={30}>

            <div className="h-full rounded-3xl border border-white/5 bg-[#111113]/90 backdrop-blur-2xl p-4 overflow-auto">

              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">

                  <div className="text-center">

                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-[#00FF88] mb-4" />

                    <p className="text-zinc-400">

                      Connecting to video call...
                    </p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">

                  <div className="max-w-md w-full rounded-3xl border border-white/5 bg-[#0C0C0F] p-8">

                    <div className="flex flex-col items-center text-center">

                      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-5">

                        <PhoneOffIcon className="w-12 h-12 text-red-400" />
                      </div>

                      <h2 className="text-2xl font-bold mb-2">

                        Connection Failed
                      </h2>

                      <p className="text-zinc-500">

                        Unable to connect to video call
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">

                  <StreamVideo client={streamClient}>

                    <StreamCall call={call}>

                      <VideoCallUI
                        chatClient={chatClient}
                        channel={channel}
                      />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default SessionPage;