"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/universities", label: "Universities" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(7,24,41,0.97)] backdrop-blur-[10px] border-b border-white/[0.07] h-[68px] px-[5%] flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <Image src="/logo.png" alt="Horizon Group" width={38} height={38} className="object-contain" priority />
        <div>
          <div className="font-display text-[17px] font-semibold text-white leading-tight">
            Horizon Group
          </div>
          <div className="text-[10px] font-light text-gray-horizon-300 tracking-widest uppercase">
            Study Services
          </div>
        </div>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white/75 no-underline text-sm font-normal tracking-wide hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li><ThemeToggle /></li>
        <li>
          <Link
            href="/contact"
            className="bg-gold text-navy-dark px-[22px] py-[9px] rounded-md text-sm font-medium hover:bg-gold-light transition-colors"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Mobile right side */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          className="text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-navy-dark border-t border-white/[0.07] py-4 px-[5%] flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/75 text-sm hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-gold text-navy-dark px-5 py-2 rounded-md text-sm font-medium w-fit hover:bg-gold-light transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
