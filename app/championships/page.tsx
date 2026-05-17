export default function ChampionshipsPage() {
  const championships = [
    {
      title: "RMA World Championship",
      location: "Cairo, Egypt",
      date: "March 12, 2026",
      description:
        "The biggest international RMA tournament featuring elite fighters from around the world.",
    },

    {
      title: "International Fighters Camp",
      location: "Dubai, UAE",
      date: "June 8, 2026",
      description:
        "Advanced combat training camp for professional fighters and instructors.",
    },

    {
      title: "RMA Continental League",
      location: "Tokyo, Japan",
      date: "September 21, 2026",
      description:
        "International league focused on rankings and championship qualification.",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold mb-4">
            RMA <span className="text-red-600">Championships</span>
          </h1>

          <p className="text-gray-400 text-lg">
            Official tournaments and international combat events
          </p>

        </div>

        {/* Championship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {championships.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 hover:border-red-600 transition rounded-2xl p-8"
            >

              <span className="text-red-500 font-semibold">
                {item.date}
              </span>

              <h2 className="text-2xl font-bold mt-4 mb-3">
                {item.title}
              </h2>

              <h3 className="text-gray-400 mb-5">
                {item.location}
              </h3>

              <p className="text-gray-400 leading-8 mb-6">
                {item.description}
              </p>

              <button className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-bold">
                Register Now
              </button>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}