"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Workshop {
  title: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  seats: string;
  registration: string;
  fee: string;
}

const workshops: Workshop[] = [
  {
    title: "Robotics & Automation",
    description: "Hands-on session to build and program a small robotic arm.",
    instructor: "Dr. Alex Johnson",
    date: "15/11/2025",
    time: "10:00 AM – 1:00 PM",
    seats: "Limited",
    registration: "https://forms.gle/workshop1",
    fee: "AED 50",
  },
  {
    title: "3D Printing & Design",
    description: "Learn 3D modeling and print functional prototypes.",
    instructor: "Ms. Sara Ahmed",
    date: "16/11/2025",
    time: "2:00 PM – 5:00 PM",
    seats: "Open",
    registration: "https://forms.gle/workshop2",
    fee: "AED 40",
  },
  {
    title: "Sustainable Energy Systems",
    description: "Explore renewable energy solutions and small-scale solar projects.",
    instructor: "Mr. Omar Khalid",
    date: "17/11/2025",
    time: "11:00 AM – 2:00 PM",
    seats: "Limited",
    registration: "https://forms.gle/workshop3",
    fee: "Free",
  },
];

export default function AsmeEventPage() {
  const [status, setStatus] = useState<string | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="space-y-16">
      {/* Hero / Carousel */}
      <section className="relative">
        <Slider {...sliderSettings}>
          <div>
            <img
              src="https://images.stockcake.com/public/c/c/6/cc61d424-17d1-41d7-9c18-043b3c6e65b8_large/robotics-workshop-activity-stockcake.jpg"
              alt="Engineering Workshop"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxYQVYXcV-JyI6KJK9YA-ri9cgoB4QEZYxNw&s"
              alt="3D Printing"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://www.ucsiuniversity.edu.my/sites/default/files/styles/blog_large__825x410_/public/fig_3.jpg?itok=fkTwfZxQ"
              alt="Sustainable Energy"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </Slider>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          {/* Logos */}
          <div className="flex gap-6 items-center mb-4">
            <img
              src="/uploads/asme/asme.jpg" // replace with your ASME logo path
              alt="ASME Logo"
              className="h-16 animate-fadeIn"
            />
            <img
              src="/uploads/asme/ieee.jpg" // replace with your IEEE logo path
              alt="IEEE Logo"
              className="h-16 animate-fadeIn delay-200"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg mb-4 animate-fadeIn">
            ASME presents: Mechanical Innovations Week 2025
          </h1>
          <p className="max-w-2xl text-lg drop-shadow-md animate-fadeIn delay-200">
            Join us for hands-on workshops and interactive sessions organized by ASME BPDC.
          </p>
          <a
            href="#registration"
            className="mt-6 inline-block px-6 py-3 bg-ieee-500 hover:bg-ieee-600 transition rounded-lg font-semibold shadow-lg animate-bounce"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">Register for Workshops</h2>
        <div className="space-y-4">
          {workshops.map((w) => (
            <div key={w.title} className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1">{w.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{w.description}</p>
              <p className="text-sm"><strong>Date & Time:</strong> {w.date} – {w.time}</p>
              <p className="text-sm"><strong>Instructor:</strong> {w.instructor}</p>
              <p className="text-sm"><strong>Seats:</strong> {w.seats} | <strong>Fee:</strong> {w.fee}</p>
              <a
                href={w.registration}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-2 bg-ieee-500 text-white rounded hover:bg-ieee-600 transition"
              >
                Register
              </a>
            </div>
          ))}
        </div>
      </section>

   
      {/* Contact / Support */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Contact & Support</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.name.value;
            const email = form.email.value;
            const message = form.message.value;

            const whatsappNumber = "9710000000"; // your WhatsApp number
            const text = `New message from ASME Event Page:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

            window.open(whatsappUrl, "_blank");
            form.reset();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              required
              name="name"
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#071428]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              required
              type="email"
              name="email"
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#071428]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              required
              name="message"
              rows={4}
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#071428]"
            />
          </div>
          <button className="px-5 py-2.5 rounded-md bg-ieee-500 text-white hover:bg-ieee-600 transition">
            Send via WhatsApp
          </button>
        </form>

        
      </section>
    </div>
  );
}
