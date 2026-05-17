import { Link, useLocation } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      name: "Problems",
      path: "/problems",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },

  ];

  return (
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
            <span className="text-white">Code</span>

            <span className="text-[#00FF88]">
              Sync
            </span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2">

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 border
              
              ${
                isActive(item.path)
                  ? "bg-white/[0.04] border-white/10 text-white"
                  : "border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 ml-4">

          {/* CTA */}
          <button className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00FF88] text-black text-[13px] font-semibold hover:bg-[#00E67A] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.35)]">
            Get Started

            <ArrowRightIcon className="size-4" />
          </button>

          {/* User */}
          <div className="scale-90">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;