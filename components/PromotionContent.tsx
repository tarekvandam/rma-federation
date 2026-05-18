"use client";

import { useState } from "react";

const beltLevels = [
  {
    color: "yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    text: "text-yellow-300",
    emoji: "🟡",
    name: "Yellow Belt",
    duration: "3 months (2 sessions per week)",
    items: [
      "Principles of Real Martial Art",
      "Basic stances: attention, ready, fighting stance",
      "General flexibility training",
      "Guard position (front guard)",
      "Punches: straight, reverse",
      "Kicks: front kick (body), round kick (body)",
      "Basic combinations (forward attack / backward defense)",
      "Falls: forward fall (low), rolling fall",
      "Physical conditioning ladder (core, push-ups, bridge – level 1)",
      "6 self-defense techniques, including escapes and basic takedowns",
    ],
  },
  {
    color: "orange-500",
    bg: "bg-orange-500/10 border-orange-500/30",
    text: "text-orange-400",
    emoji: "🟠",
    name: "Orange Belt",
    duration: "3 months",
    items: [
      "Additional stances (front, rear, horse stance + movement at angles)",
      "Punches: straight, reverse, hook",
      "Kicks: front, round, side (body level)",
      "Falls: forward, rolling, side",
      "Conditioning (including jumping level 1)",
      "Combat basics (reaction speed & control)",
      "8 techniques (knife defense, chokes, submissions)",
    ],
  },
  {
    color: "green-500",
    bg: "bg-green-500/10 border-green-500/30",
    text: "text-green-400",
    emoji: "🟢",
    name: "Green Belt",
    duration: "3 months",
    items: [
      "Advanced movement with strikes",
      "High & low kicks",
      "Additional falls (including backward fall)",
      "Conditioning (jump level 2)",
      "Combat basics + clinch & takedown (level 1)",
      "7 techniques (grabs, knife defense, pre-attack defense)",
    ],
  },
  {
    color: "blue-500",
    bg: "bg-blue-500/10 border-blue-500/30",
    text: "text-blue-400",
    emoji: "🔵",
    name: "Blue Belt",
    duration: "3 months",
    items: [
      "Advanced combinations of punches (including uppercut)",
      "Advanced kicks (inside/outside anatomical kicks)",
      "Takedowns (leg sweeps, hip throws, shoulder throws)",
      "Conditioning (speed development)",
      "Combat (level 2 takedowns)",
      "8 techniques (gun defense, stick defense, advanced chokes)",
    ],
  },
  {
    color: "amber-700",
    bg: "bg-amber-800/10 border-amber-800/30",
    text: "text-amber-400",
    emoji: "🟤",
    name: "Brown Belt",
    duration: "3 months",
    items: [
      "Full combinations of punches & kicks (with speed and coordination)",
      "Advanced falls (including over obstacles)",
      "Advanced takedowns",
      "Combat simulation (all 3 rounds)",
      "8 techniques (multiple attackers, weapons training – stick & knife)",
    ],
  },
  {
    color: "red-600",
    bg: "bg-red-600/10 border-red-600/30",
    text: "text-red-400",
    emoji: "🔴",
    name: "Red Belt",
    duration: "6 months",
    items: [
      "Advanced striking combinations",
      "Advanced kicks (including flying kicks & 360°)",
      "Advanced takedowns (level 2)",
      "Combat with positional transitions",
      "Bone conditioning (level 1)",
      "Mastery of stick fighting",
      "Mastery of knife fighting",
      "Basic anatomy (bones & joints)",
      "4 improvised techniques",
    ],
  },
];

const blackBeltContent = {
  requirements: [
    "Comprehensive understanding of combat (attack & defense)",
    "Strong connection with balance and movement",
    "High-level coordination and awareness",
    "Execution of techniques at no less than 75% efficiency",
    "Mastery of techniques with speed and power",
    "Advanced control and maximum force techniques",
    "Mastery of grappling, holds, and submissions",
    "Ability to teach and explain techniques",
    "Written explanation of 5 personal signature techniques",
  ],
  program: [
    "Full mastery of all stances and transitions",
    "Advanced mobility (including ground transitions)",
    "Full striking system",
    "Advanced falls (over 6 persons obstacle)",
    "Advanced takedowns",
    "Full combat performance demonstrating all techniques",
    "Minimum 15-page research paper covering 5 techniques",
    "Mastery of Katana (Japanese sword)",
    "Discussion of nerve & muscle anatomy",
    "6 improvised techniques for different weapon scenarios",
  ],
};

const rules = [
  {
    num: "1",
    title: "Definition",
    content: "Real Martial Art (RMA) is a competitive combat system that combines striking, grappling, and submission within a regulated framework designed to achieve realistic fighting while ensuring athlete safety.",
  },
  {
    num: "2",
    title: "Age Categories",
    content: null,
    items: ["Cadets: 10 to 14 years", "Juniors: 15 to 18 years", "Adults: 18 years and above"],
  },
  {
    num: "3",
    title: "Weight Classes",
    content: "Weight divisions follow the international kickboxing system (WAKO):",
    items: ["51 kg, 54 kg, 57 kg, 60 kg", "63.5 kg, 67 kg, 71 kg, 75 kg", "81 kg, 86 kg, 91 kg, +91 kg"],
    note: "Subject to modification based on age division and event organization",
  },
  {
    num: "4",
    title: "Bout Structure",
    content: null,
    items: ["Each bout consists of 3 rounds", "Cadets: 1.5 min | Amateurs: 3 min | Professionals: 5 min", "Rest between rounds: 1 minute"],
  },
  {
    num: "5",
    title: "Round Structure",
    content: null,
    subs: [
      { subtitle: "Round One (Striking)", items: ["Allowed: Punches, Kicks", "Prohibited: Ground fighting"] },
      { subtitle: "Round Two (Grappling)", items: ["Limited to: Wrestling, Jiu-Jitsu", "Prohibited: All striking"] },
      { subtitle: "Round Three (Open Combat)", items: ["All techniques allowed: Striking, Takedowns, Ground fighting, Submissions"] },
    ],
  },
  {
    num: "6",
    title: "Start of the Fight",
    content: "All rounds start from a standing position.",
  },
  {
    num: "7",
    title: "Striking Rules",
    content: null,
    subs: [
      { subtitle: "Legal Target Areas", items: ["From chest to thigh"] },
      { subtitle: "Head/Face Contact", items: ["Allowed: Kicks, Knees (without holding or clinch)", "Prohibited: Punches, Elbow strikes"] },
      { subtitle: "Ground Striking", items: ["Striking or kicking a grounded opponent is prohibited"] },
    ],
  },
  {
    num: "8",
    title: "Scoring System",
    content: null,
    items: ["Clean technical punch = 1 point", "Body kick = 1 point", "Head kick = 2 points", "Knee to the head (without clinch) = 2 points", "Technical takedown = 1 point", "Submission attempt = No points"],
  },
  {
    num: "9",
    title: "Submissions",
    content: "All types of submissions are allowed. Victory is achieved by: opponent tap-out or referee stoppage.",
  },
  {
    num: "10",
    title: "Ground Fighting",
    content: null,
    items: ["Allowed only in: Round Two & Round Three", "Ground engagement duration: 30 seconds", "If no effective action occurs, the referee stops and restarts from standing"],
  },
  {
    num: "11",
    title: "Ways to Win",
    content: null,
    items: ["By points", "By submission", "By technical knockout (TKO)", "Opponent unable to continue"],
  },
  {
    num: "12",
    title: "Draw",
    content: "In case of a draw: an extra round is played. If still tied: judges' decision.",
  },
  {
    num: "13",
    title: "Medical Stoppage",
    content: null,
    items: ["Severe bleeding", "Loss of balance", "Injury preventing continuation"],
  },
  {
    num: "14",
    title: "Equipment",
    content: "Mandatory for all levels:",
    items: ["Gloves", "Head guard", "Mouth guard", "Shin guards", "Groin guard"],
  },
  {
    num: "15",
    title: "Fouls",
    content: null,
    items: ["Striking illegal target areas", "Striking a grounded opponent", "Using prohibited techniques", "Disobeying referee instructions"],
  },
  {
    num: "16",
    title: "Penalties",
    content: null,
    items: ["First warning: Verbal", "Second warning: 1 point deduction", "Third warning: 1 point deduction", "Fourth warning: Disqualification"],
  },
  {
    num: "17",
    title: "Objective of the Rules",
    content: null,
    items: ["Achieve realistic combat", "Reduce injuries", "Develop comprehensive skills", "Create a fair and safe competitive system"],
  },
];

export default function PromotionContent() {
  const [beltOpen, setBeltOpen] = useState<string | null>("yellow-400");
  const [tab, setTab] = useState<"promotion" | "rules">("promotion");

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            RMA Federation
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-red-600">Promotion</span> Program & Rules
          </h1>
          <p className="text-gray-400 text-lg">Real Martial Art (RMA) – Realistic Self-Defense System</p>
          <p className="text-gray-500 mt-2">Founder: Tarek Said Ibrahim (Tarek Vandam)</p>
        </div>

        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => setTab("promotion")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition ${tab === "promotion" ? "bg-red-600 text-white" : "bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-red-600/40"}`}
          >
            🥋 Promotion Program
          </button>
          <button
            onClick={() => setTab("rules")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition ${tab === "rules" ? "bg-red-600 text-white" : "bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-red-600/40"}`}
          >
            📋 Official Rules
          </button>
        </div>

        {tab === "promotion" && (
          <>
            <section className="mb-16 bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-red-400">Importance of the Colored Belt (Kyu) Program</h2>
              <p className="text-gray-400 mb-6 leading-8">This stage is one of the most important phases for a beginner practitioner. The athlete must learn essential fundamentals of combat.</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {["Self-confidence and continuous growth", "Strong connection with the ground (balance, power, movement)", "Coordination between limbs for effective technique execution"].map((item, i) => (
                  <div key={i} className="bg-black/40 rounded-xl p-4 border border-zinc-800">
                    <span className="text-red-500 font-bold text-lg mr-2">{i + 1}.</span>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-3">Focus Areas</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-gray-400">
                {["Flexibility training & conditioning", "Controlled combat movements", "Falls, stances & takedowns", "Proper striking techniques", "Basic terminology (salute, attention, etc.)"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><span className="text-red-500">•</span> {item}</div>
                ))}
              </div>
            </section>

            <div className="space-y-4 mb-16">
              {beltLevels.map((belt) => (
                <div key={belt.color} className={`rounded-2xl border ${belt.bg} overflow-hidden transition`}>
                  <button onClick={() => setBeltOpen(beltOpen === belt.color ? null : belt.color)} className="w-full flex items-center justify-between p-5 text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{belt.emoji}</span>
                      <div>
                        <h3 className={`text-xl font-bold ${belt.text}`}>{belt.name}</h3>
                        <p className="text-gray-500 text-sm">{belt.duration}</p>
                      </div>
                    </div>
                    <span className={`text-gray-500 transition ${beltOpen === belt.color ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {beltOpen === belt.color && (
                    <div className="px-5 pb-5 space-y-2">
                      {belt.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-gray-300">
                          <span className={`${belt.text} mt-1`}>•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <section className="mb-16 bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">⚫</span>
                <h2 className="text-2xl font-bold text-white">Black Belt (Dan) – Importance</h2>
              </div>
              <p className="text-gray-400 mb-6 leading-8">This stage represents the true foundation of the practitioner and the beginning of specialization.</p>
              <h3 className="text-lg font-bold text-gray-200 mb-3">Requirements</h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-8 text-gray-400">
                {blackBeltContent.requirements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span><span>{item}</span></div>
                ))}
              </div>
              <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
                <p className="text-red-400 font-bold">⚠️ No athlete may obtain a black belt without meeting all requirements and passing official tests</p>
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-3">Black Belt 1st Dan – Program</h3>
              <p className="text-gray-500 text-sm mb-3">Duration: 1 year (2 sessions per week)</p>
              <div className="grid sm:grid-cols-2 gap-2 text-gray-400">
                {blackBeltContent.program.map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span><span>{item}</span></div>
                ))}
              </div>
            </section>
          </>
        )}

        {tab === "rules" && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Official Combat Rules & Regulations</h2>
              <p className="text-gray-500">International Federation of Real Martial Art (RMA)</p>
            </div>
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.num} className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition">
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 font-bold text-lg min-w-[2rem]">{rule.num}.</span>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{rule.title}</h3>
                      {rule.content && <p className="text-gray-300">{rule.content}</p>}
                      {rule.items && (
                        <ul className="space-y-1">
                          {rule.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400"><span className="text-red-500 mt-1">•</span><span>{item}</span></li>
                          ))}
                        </ul>
                      )}
                      {rule.subs && rule.subs.map((sub, i) => (
                        <div key={i} className="bg-black/30 rounded-xl p-4 border border-zinc-800/50">
                          <p className="font-bold text-gray-200 mb-2">{sub.subtitle}</p>
                          <ul className="space-y-1">
                            {sub.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-gray-400"><span className="text-gray-500 mt-1">•</span><span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {rule.note && <p className="text-gray-500 text-sm italic">{rule.note}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 text-center">
              <p className="text-gray-400 mb-4">International Federation of Real Martial Art (RMA)</p>
              <p className="text-white font-bold">Captain / Tarek Said Ibrahim (Tarek Vandam)</p>
              <p className="text-gray-500 text-sm mb-6">Founder & President</p>
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-gray-500 text-sm">Official Seal & Signature</p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
