import { Award, Shield, Target, Flame, Swords, Eye, Globe, ChevronRight, Crown, Crosshair, Users, ThumbsUp, Video } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";

import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "About Us",
  "Learn about the World Real Martial Art Federation, Tarek Vandam, and our commitment to realistic combat, self-defense, and martial arts discipline."
);

const missions = [
  "Build strong, disciplined, and confident martial artists.",
  "Create realistic standards for combat training and self-defense.",
  "Develop athletes physically, mentally, and tactically.",
  "Spread awareness against fake and ineffective martial arts content.",
  "Establish an international platform for training, championships, instructor development, and martial arts education.",
];

const differentiators = [
  { icon: Crosshair, text: "Realistic combat-focused training." },
  { icon: Target, text: "Scientific and practical teaching methods." },
  { icon: Shield, text: "Self-defense adapted for modern real-life situations." },
  { icon: Swords, text: "Combination of traditional martial arts values with modern combat systems." },
  { icon: Flame, text: "Strong emphasis on discipline, mindset, awareness, and adaptability." },
  { icon: Crown, text: "Training designed for both competition and real-world application." },
];

const trainingAreas = [
  "Realistic Self-Defense",
  "Striking Systems",
  "Grappling & Clinch Fighting",
  "Tactical Combat Movement",
  "Physical Conditioning",
  "Combat Awareness",
  "Psychological Preparedness",
  "Competition Training",
];

const whoCanJoin = [
  { icon: Target, text: "Beginners seeking confidence and self-defense skills." },
  { icon: Swords, text: "Athletes preparing for combat sports competitions." },
  { icon: Crosshair, text: "Martial artists looking for realistic combat application." },
  { icon: Crown, text: "Coaches and instructors seeking professional development." },
  { icon: Flame, text: "Anyone interested in discipline, fitness, and personal transformation." },
];

const federationMemberships = [
  { org: "Egyptian Karate Federation", rank: "2nd Dan Black Belt" },
  { org: "Egyptian Traditional Karate Federation", rank: "2nd Dan Black Belt" },
  { org: "African Traditional Karate Federation", rank: "2nd Dan Black Belt" },
  { org: "International Kyokushin Karate-do Federation", rank: "3rd Dan Black Belt", note: "Egypt Representative" },
  { org: "International MMA Federation (IMMAF)", rank: "3rd Dan Black Belt", note: "Egypt Representative" },
  { org: "International Federation – Canada Shindo Jiu-Jitsu", rank: "6th Dan Black Belt" },
  { org: "Egyptian Kickboxing Federation", rank: "Member" },
  { org: "Egyptian Jeet Kune Do Federation", rank: "Member" },
  { org: "World Council for Sports Training and Investment", rank: "Member" },
];

const professionalCerts = [
  "First Aid",
  "Cardiopulmonary Resuscitation (CPR)",
  "Basic Life Support (BLS)",
];

const certifications = [
  { title: "Diploma in Nutrition", issuer: "Stanford University, USA" },
  { title: "Diploma in Sports Training", issuer: "University of Colorado, USA" },
];

const achievements = [
  { icon: FaFacebook, value: "60K+", label: "Facebook Followers", color: "#1877F2" },
  { icon: FaYoutube, value: "60K+", label: "YouTube Subscribers", color: "#FF0000" },
  { icon: Eye, value: "16M+", label: "Total Views", color: "#ef4444" },
  { icon: Globe, value: "International", label: "Events Participation", color: "#22c55e" },
];

const stagger = (i: number) => ({
  animationDelay: `${i * 0.1}s`,
});

export default function AboutPage() {
  return (
    <main className="bg-black text-white">

      {/* ============ HERO ============ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[slowzoom_20s_ease-in-out_infinite]"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(220,38,38,0.15),_rgba(0,0,0,0.95))]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div
            className="max-w-4xl animate-[fadeUp_1.2s_ease-out]"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-lg shadow-red-900/20 mb-8">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              About the Federation
            </span>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-white">
              REAL
              <br />
              <span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">MARTIAL</span>
              <br />
              ART
            </h1>

            <p className="mt-8 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed">
              Founded by <span className="text-white font-bold">Tarek Vandam</span> — a martial artist, coach, and founder dedicated to realistic combat, exposing fake systems, and building disciplined fighters worldwide.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/membership"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-red-900/40 transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:scale-[1.03]"
              >
                Join the Federation
                <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/contact"
                className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]"
              >
                <Crown size={18} className="text-red-400" />
                Start Training
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ============ ABOUT RMA ============ */}
      <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.1),_rgba(0,0,0,0.96))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              About the Federation
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              World Real Martial Art <span className="text-red-600">Federation</span>
            </h2>
          </div>

          <div className="space-y-8 text-center animate-[fadeUp_0.8s_ease-out_0.15s_both]">
            <p className="text-lg sm:text-xl text-gray-300 leading-8 max-w-4xl mx-auto">
              World Real Martial Art Federation (RMA) is a modern martial arts organization dedicated to building a <strong className="text-white">realistic combat system</strong> based on practical application, scientific training methods, and authentic self-defense principles.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-8 max-w-4xl mx-auto">
              Founded by <strong className="text-white">Tarek Vandam</strong>, RMA was created to challenge unrealistic martial arts myths and promote effective combat skills that can be applied in real-life situations, competitions, and personal protection.
            </p>
          </div>

          <div className="mt-16 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
            <div className="relative max-w-2xl mx-auto rounded-[32px] border border-red-500/20 bg-gradient-to-br from-red-600/10 via-black/40 to-red-800/5 p-10 shadow-[0_24px_80px_rgba(220,38,38,0.1)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/30 px-5 py-2 text-xs uppercase tracking-[0.35em] text-red-300">
                  Core Message
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white italic leading-tight mt-4">
                &ldquo;Not everything you see should be believed.&rdquo;
              </p>
              <p className="mt-6 text-gray-400 text-base leading-7">
                RMA focuses on testing techniques under realistic pressure instead of relying on exaggerated demonstrations or theatrical movements. The system combines elements of striking, grappling, tactical movement, physical conditioning, combat psychology, and self-defense awareness into one complete training methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="relative overflow-hidden bg-black py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(220,38,38,0.06),_rgba(0,0,0,0.95))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Our Purpose
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              Our <span className="text-red-600">Mission</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission, i) => (
              <div
                key={mission}
                style={stagger(i)}
                className="group rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.6s_ease-out_both]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mt-1">
                    <span className="text-red-400 font-black text-lg">{i + 1}</span>
                  </div>
                  <p className="text-base font-semibold text-white leading-7">{mission}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT MAKES RMA DIFFERENT ============ */}
      <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_right,_rgba(220,38,38,0.1),_rgba(0,0,0,0.95))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              The RMA Edge
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              What Makes RMA <span className="text-red-600">Different</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  style={stagger(i)}
                  className="group flex items-start gap-5 rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 animate-[fadeUp_0.6s_ease-out_both]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 shadow-lg shadow-red-900/20">
                    <Icon size={22} className="text-red-400" />
                  </div>
                  <p className="text-base font-semibold text-white leading-7 pt-2">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TRAINING AREAS ============ */}
      <section className="relative overflow-hidden bg-black py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(220,38,38,0.06),_rgba(0,0,0,0.95))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Programs
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              RMA Training <span className="text-red-600">Areas</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainingAreas.map((area, i) => (
              <div
                key={area}
                style={stagger(i)}
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mb-5">
                    <span className="text-red-400 font-black text-lg">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO CAN JOIN ============ */}
      <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.08),_rgba(0,0,0,0.96))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Open to All
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              Who Can <span className="text-red-600">Join</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {whoCanJoin.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  style={stagger(i)}
                  className="group flex items-start gap-5 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-6 transition-all duration-500 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.5s_ease-out_both]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mt-0.5">
                    <Icon size={18} className="text-red-400" />
                  </div>
                  <p className="text-base text-gray-300 leading-7 pt-1">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISION ============ */}
      <section className="relative overflow-hidden bg-black py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.08),_rgba(0,0,0,0.95))]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Our Vision
            </span>
            <h2 className="mt-8 text-4xl sm:text-5xl font-black tracking-tight text-white">
              The <span className="text-red-600">Vision</span>
            </h2>
          </div>

          <p className="mt-10 text-xl text-gray-300 leading-9 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
            To become one of the leading international organizations in <strong className="text-white">realistic martial arts education</strong>, <strong className="text-white">competition systems</strong>, and <strong className="text-white">combat development</strong> while creating a global community built on respect, discipline, strength, and truth.
          </p>

          <div className="mt-14 animate-[fadeUp_0.8s_ease-out_0.4s_both]">
            <div className="inline-flex items-center gap-4 rounded-full border border-red-500/20 bg-red-500/10 px-8 py-5 shadow-lg shadow-red-900/20">
              <span className="text-2xl font-black text-red-400">RMA</span>
              <span className="text-white text-lg font-bold">&mdash;</span>
              <span className="text-xl text-white font-semibold">Real Martial Art</span>
            </div>
          </div>

          <p className="mt-6 text-lg uppercase tracking-[0.35em] text-red-300 animate-[fadeUp_0.8s_ease-out_0.5s_both]">
            Train Real. Fight Smart. Live Strong.
          </p>
        </div>
      </section>

      {/* ============ FOUNDER STORY ============ */}
      <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.12),_rgba(0,0,0,0.96))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
            <div className="relative animate-[fadeUp_0.8s_ease-out_both]">
              <div className="relative h-[500px] sm:h-[600px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_32px_120px_rgba(0,0,0,0.6)]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-flex rounded-full bg-red-600/20 border border-red-500/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300 backdrop-blur-sm">
                    Founder &amp; Lead Coach
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-red-600/10 blur-3xl" />
            </div>

            <div className="space-y-8">
              <div className="animate-[fadeUp_0.8s_ease-out_0.1s_both]">
                <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
                  Founder Story
                </span>
              </div>

              <h2
                className="text-5xl sm:text-6xl font-black tracking-tight text-white animate-[fadeUp_0.8s_ease-out_0.15s_both]"
              >
                Tarek<br />
                <span className="text-red-600">Vandam</span>
              </h2>

              <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
                A martial artist and self-defense coach with years of combat experience, Tarek Vandam founded <strong className="text-white">Real Martial Art (RMA)</strong> to bridge the gap between fantasy fighting and real-world effectiveness.
              </p>

              <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.25s_both]">
                As the <strong className="text-white">Egypt Representative for the International Kyokushin Karate-do Federation (3rd Dan)</strong> and the <strong className="text-white">International MMA Federation (3rd Dan)</strong>, he brings authentic martial arts lineage combined with modern combat training methodologies. His content focuses on realistic combat awareness, exposing fake martial arts myths, and building genuine self-defense skills.
              </p>

              <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
                Through RMA, Tarek has built a global community of disciplined fighters, created millions of views worth of combat education content, and continues to train the next generation of martial artists who value substance over show.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 animate-[fadeUp_0.8s_ease-out_0.35s_both]">
                {["Martial Arts Coach", "Kyokushin 3rd Dan", "IMMAF Representative", "Self-Defense Expert", "Founder of RMA"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="relative overflow-hidden bg-black py-28 px-6">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_right,_rgba(220,38,38,0.1),_rgba(0,0,0,0.95))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Professional Credentials
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
               Certifications &amp; <span className="text-red-600">Credentials</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
              Officially certified and internationally recognized combat credentials.
            </p>
          </div>

          {/* --- Federation Memberships --- */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                Federation Memberships &amp; Dan Ranks
              </h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {federationMemberships.map((item, i) => (
                <div
                  key={item.org}
                  style={stagger(i)}
                  className="group rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.5s_ease-out_both]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20">
                      <Swords size={18} className="text-red-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm leading-6">{item.org}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          item.rank.includes("6th") || item.rank.includes("6") 
                            ? "bg-red-600/20 text-red-300 border border-red-500/30"
                            : item.rank.includes("3rd") || item.rank.includes("3")
                            ? "bg-orange-600/20 text-orange-300 border border-orange-500/30"
                            : item.rank.includes("2nd") || item.rank.includes("2")
                            ? "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-white/10 text-gray-300 border border-white/10"
                        }`}>
                          {item.rank}
                        </span>
                        {item.note && (
                          <span className="text-[11px] text-gray-500 uppercase tracking-wider">{item.note}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Professional Certifications & Diplomas --- */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                  Medical &amp; Safety Certifications
                </h3>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Provided by: The General Union of Egyptian Ambulance Authority Personnel &amp; The International Heart Institute, USA
              </p>
              <div className="space-y-4">
                {professionalCerts.map((cert, i) => (
                  <div
                    key={cert}
                    style={stagger(i)}
                    className="group flex items-center gap-4 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-5 transition-all duration-500 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-800/10 border border-emerald-500/20">
                      <Shield size={20} className="text-emerald-400" />
                    </div>
                    <p className="font-semibold text-white text-base">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                  Academic Diplomas
                </h3>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div
                    key={cert.title}
                    style={stagger(i)}
                    className="group flex items-start gap-4 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-5 transition-all duration-500 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/20">
                      <Award size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base">{cert.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACHIEVEMENTS ============ */}
      <section className="relative overflow-hidden bg-black py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(220,38,38,0.08),_rgba(0,0,0,0.95))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">
              Track Record
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white">
              Federation <span className="text-red-600">Achievements</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
              Real impact measured across platforms and international events.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={stagger(i)}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0f1114] p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-red-600/30 animate-[fadeUp_0.6s_ease-out_both]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 shadow-lg shadow-red-900/20 mb-6">
                      <Icon size={28} style={{ color: item.color }} />
                    </div>
                    <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">{item.value}</p>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[slowzoom_20s_ease-in-out_infinite]"
          style={{ backgroundImage: "url('/gallery/1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.12),_rgba(0,0,0,0.95))]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div
            className="space-y-10 animate-[fadeUp_1s_ease-out_both]"
          >
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-xs uppercase tracking-[0.4em] text-red-300 shadow-lg shadow-red-900/20">
                <Users size={14} />
                Join the Movement
              </span>

              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                Ready to Train
                <br />
                <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">Real?</span>
              </h2>

              <p className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
                Join the World Real Martial Art Federation. Train with purpose. Fight with discipline. Transform completely.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="/membership"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-red-900/50 transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:scale-[1.04] hover:shadow-red-900/70"
              >
                <Crown size={20} />
                Join RMA
                <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/contact"
                className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 px-10 py-5 rounded-full text-lg font-semibold backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.04] hover:border-white/30"
              >
                <Flame size={20} className="text-red-400" />
                Start Training
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowzoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>

    </main>
  );
}
