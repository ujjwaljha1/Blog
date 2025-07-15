import React from "react";

function Homepage() {
  const time = new Date().toLocaleTimeString();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-white ">
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6 shadow-lg backdrop-blur-md text-xs sm:text-sm">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          Server Network: <span className="text-white/80">Online</span>
        </span>
        <span className="mx-2 text-white/30">|</span>
        <span className="text-cyan-400 font-mono">{time}</span>
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold text-center">
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
          Future
        </span>{" "}
        <span className="text-white">Insights</span>
      </h1>

      <p className="mt-4 text-center max-w-xl text-white/70 text-sm sm:text-base">
        Experience the next generation of digital storytelling powered by{" "}
        <span className="text-cyan-300">AI consciousness</span> and{" "}
        <span className="text-purple-300">quantum narratives</span>.
      </p>


      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <a
          href="#"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          🚀 Enter Neural Space
        </a>
        <a
          href="#"
          className="px-6 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white transition shadow"
        >
          🧠 Explore Quantum Feed
        </a>
      </div>
    </div>
  );
}

export default Homepage;
