import Editor from "@monaco-editor/react";

import {
  Loader2Icon,
  PlayIcon,
  Code2Icon,
} from "lucide-react";

import { LANGUAGE_CONFIG } from "../data/problems.js";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-[#111113] flex flex-col text-white">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Icon */}
          <div className="w-9 h-9 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/10 flex items-center justify-center">

            <Code2Icon className="w-4 h-4 text-[#00FF88]" />
          </div>

          {/* Language */}
          <div className="flex items-center gap-3">

            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="size-5"
            />

            <select
              className="bg-[#18181B] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#00FF88]/20 transition-all duration-200"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(
                ([key, lang]) => (
                  <option key={key} value={key}>
                    {lang.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Run Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF88] text-black text-sm font-semibold hover:bg-[#00E67A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRunning}
          onClick={onRunCode}
        >

          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />

              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />

              Run Code
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden bg-[#111113] rounded-b-2xl">

        <Editor
          height="100%"
          language={
            LANGUAGE_CONFIG[selectedLanguage].monacoLang
          }
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontFamily: "JetBrains Mono, monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            padding: {
              top: 20,
            },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            roundedSelection: true,
            renderLineHighlight: "all",
            lineHeight: 24,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;