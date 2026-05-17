import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { useState } from "react";

import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions.js";

import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards.jsx";
import ActiveSessions from "../components/ActiveSessions.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();

  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">

        {/* Background Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-120px] left-[-120px] w-[240px] h-[240px] bg-[#00FF88]/5 blur-2xl rounded-full" />

          <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/5 blur-2xl rounded-full" />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main */}
        <main className="relative z-10 pt-23 pb-5 px-4">

          <div className="max-w-6xl mx-auto">

            {/* Welcome Section */}
            <div className="mb-4 ">
              <WelcomeSection
                onCreateSession={() => setShowCreateModal(true)}
              />
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-3">

              {/* LEFT SIDE */}
              <div className="space-y-3">

                <StatsCards
                  activeSessionsCount={activeSessions.length}
                  recentSessionsCount={recentSessions.length}
                />
              </div>

              {/* RIGHT SIDE */}
              <div>

                <ActiveSessions
                  sessions={activeSessions}
                  isLoading={loadingActiveSessions}
                  isUserInSession={isUserInSession}
                />
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="mt-4">

              <RecentSessions
                sessions={recentSessions}
                isLoading={loadingRecentSessions}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default DashboardPage;