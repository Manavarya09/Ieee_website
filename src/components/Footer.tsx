"use client";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/asme", label: "ASME" },
  { href: "/team", label: "Our Team" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 dark:text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">GET IN TOUCH</h3>
          <p className="mb-2">
            <span className="font-semibold">Contact:</span> General queries
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:ieeebpdc@dubai.bits-pilani.ac.in"
              className="hover:text-blue-300 transition-colors"
            >
              ieeebpdc@dubai.bits-pilani.ac.in
            </a>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span>
            <br />
            BITS Pilani, Dubai Campus
            <br />
            Dubai International Academic City
            <br />
            Dubai, United Arab Emirates
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-left">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="hover:text-blue-300 transition-colors font-small"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="md:text-right">
          <h3 className="text-lg font-bold mb-4 text-white">FOLLOW US</h3>
          <div className="flex md:flex-col items-center md:items-end gap-4">
            <a
              href="https://www.instagram.com/ieee.bitsdubai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
            >
              <FaInstagram /> ieee_bitsdubai
            </a>
            <a
              href="https://www.linkedin.com/company/ieee-bpdc-student-chapter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
            >
              <FaLinkedin /> IEEE BPDC
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © 2025 IEEE BPDC, BITS Pilani, Dubai Campus
      </div>
    </footer>
  );
}
