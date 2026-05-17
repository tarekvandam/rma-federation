import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-700 pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* About */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            RMA Federation
          </h2>

          <p className="text-gray-400 leading-7">
            World Real Martial Art Federation dedicated to real combat,
            discipline, martial arts development, and international championships.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link href="#">About</Link>
            <Link href="#">News</Link>
            <Link href="#">Championships</Link>
            <Link href="#">Membership</Link>
            <Link href="#">Media Center</Link>

          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-gray-400">

            <span>Phone: +20 100 190 4418</span>

            <span>Email: realmartialartrma@gmail.com</span>

            <span>Location: Cairo, Egypt</span>

          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="https://www.facebook.com/tarekninjateam"
              target="_blank"
              className="bg-zinc-900 hover:bg-red-600 transition px-5 py-3 rounded-xl text-white font-bold"
            >
              Facebook
            </a>

            <a
              href="https://www.youtube.com/@tarekvandam"
              target="_blank"
              className="bg-zinc-900 hover:bg-red-600 transition px-5 py-3 rounded-xl text-white font-bold"
            >
              YouTube
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 mt-12 pt-6 text-center text-gray-500">
        © 2026 RMA Federation. All rights reserved.
      </div>

    </footer>
  );
}