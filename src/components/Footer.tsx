export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">IEEE BPDC</div>
          <p className="text-black/60 dark:text-white/70">Building a community of engineers through events, mentorship, and innovation.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick links</div>
          <ul className="space-y-1">
            <li><a className="hover:text-ieee-500" href="/">Home</a></li>
            <li><a className="hover:text-ieee-500" href="/events">Events</a></li>
            <li><a className="hover:text-ieee-500" href="/team">Our team</a></li>
            <li><a className="hover:text-ieee-500" href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <p>Email: ieee@bpdc.edu</p>
          <p>© {new Date().getFullYear()} IEEE BPDC</p>
        </div>
      </div>
    </footer>
  );
}
