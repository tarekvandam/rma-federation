export default function MediaPage() {
  const videos = [
    {
      title: "RMA Combat Training",
      embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    {
      title: "Self Defense Techniques",
      embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const podcasts = [
    {
      title: "RMA Podcast Episode 1",
      description:
        "Discussion about real combat systems and martial arts philosophy.",
    },

    {
      title: "Mindset & Discipline",
      description:
        "Building discipline and mental toughness in martial arts.",
    },
  ];

  const interviews = [
    {
      title: "Interview with Tarek Vandam",
      description:
        "Talking about the future of RMA Federation and real martial arts.",
    },

    {
      title: "International Coaches Meeting",
      description:
        "Discussion with international martial arts instructors.",
    },
  ];

  const galleryImages = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-bold mb-4">
            Media <span className="text-red-600">Center</span>
          </h1>

          <p className="text-gray-400 text-lg">
            Videos, podcasts, interviews and official federation media
          </p>

        </div>

        {/* Videos */}
        <section className="mb-24">

          <h2 className="text-4xl font-bold mb-10">
            Featured Videos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
              >

                <iframe
                  className="w-full h-[300px]"
                  src={video.embed}
                  title={video.title}
                  allowFullScreen
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    {video.title}
                  </h3>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Podcasts */}
        <section className="mb-24">

          <h2 className="text-4xl font-bold mb-10">
            Podcasts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
              >

                <h3 className="text-2xl font-bold mb-4">
                  {podcast.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {podcast.description}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Interviews */}
        <section className="mb-24">

          <h2 className="text-4xl font-bold mb-10">
            Interviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {interviews.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
              >

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Gallery */}
        <section>

          <h2 className="text-4xl font-bold mb-10">
            Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`gallery-${index}`}
                className="rounded-2xl object-cover h-80 w-full hover:scale-105 transition duration-300"
              />
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}