"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import menuData from "../data/menu.json";
import Link from "next/link";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [socialVisible, setSocialVisible] = useState(true);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSocialVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 80;
      const referencePoint = headerHeight + navbarHeight;
      let closestCategory = menuData.categories[0].name;
      let minDiff = Infinity;

      menuData.categories.forEach((category) => {
        const element = document.getElementById(category.name);
        if (element) {
          const diff = Math.abs(
            element.getBoundingClientRect().top - referencePoint
          );
          if (diff < minDiff) {
            minDiff = diff;
            closestCategory = category.name;
          }
        }
      });

      setActiveCategory(closestCategory);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // İlk render'da aktif kategoriyi belirle
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]);

  useEffect(() => {
    if (activeCategory) {
      const activeNavElement = document.getElementById(`nav-${activeCategory}`);
      if (activeNavElement) {
        activeNavElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryName) => {
    const element = document.getElementById(categoryName);
    if (element) {
      smoothScrollTo(element);
    }
  };

  const smoothScrollTo = (element) => {
    const navbar = document.querySelector("nav");
    const computedNavbarHeight = navbar ? navbar.offsetHeight + 10 : 100;
    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      computedNavbarHeight -
      80;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <header className="bg-[#003362] text-white py-3 fixed top-0 left-0 right-0 z-20 flex justify-center items-center h-[80px]">
        <Image
          src="/images/logo.png"
          alt="Cafe Logo"
          width={120}
          height={120}
          className="h-[120px] w-auto"
        />
      </header>

      <nav className="bg-gray-800 text-white py-2 fixed top-[80px] left-0 right-0 z-10 shadow-lg">
        <div className="max-w-full mx-auto flex flex-nowrap overflow-x-auto whitespace-nowrap justify-start gap-2 px-4 scrollbar-hide">
          {menuData.categories.map((category) => (
            <Link key={category.name} href={`#${category.name}`} scroll={false}>
              <span
                id={`nav-${category.name}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category.name);
                }}
                className={`flex justify-center items-center px-3 py-1 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
                  activeCategory === category.name
                    ? "border-2 border-white bg-[#003362] text-white shadow-md"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <main className="pt-[180px] p-4 max-w-full mx-auto">
        {menuData.categories.map((category) => (
          <div id={category.name} key={category.name} className="mb-11">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-black">
              {category.name}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center p-3 border rounded-lg shadow-md bg-white"
                >
                  <div className="relative w-full aspect-square mb-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-black text-base font-semibold text-center">
                    {item.name}
                  </p>
                  <p className="text-black text-sm">{item.price} TL</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <div
          className={`w-16 transition-transform duration-300 ${
            socialVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-3">
            <a
              href="https://wa.me/+905318687716"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-transparent rounded-full flex items-center justify-center transition transform hover:scale-110"
            >
              <Image
                src="/images/whatsapp.png"
                alt="WhatsApp"
                width={180}
                height={180}
                className="w-10 h-10"
              />
            </a>
            <a
              href="https://www.instagram.com/cafe_lnn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-transparent rounded-full flex items-center justify-center transition transform hover:scale-110"
            >
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={180}
                height={180}
                className="w-10 h-10"
              />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSocialVisible(!socialVisible)}
        className="fixed top-1/2 z-50 bg-transparent text-black p-2 focus:outline-none transition-all duration-300"
        style={{ right: socialVisible ? "64px" : "0px" }}
      >
        {socialVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </button>
    </div>
  );
}
