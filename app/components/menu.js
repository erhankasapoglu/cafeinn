"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import menuData from "../data/menu.json";
import Link from "next/link";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(100);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      setTimeout(() => {
        smoothScrollTo(element);
      }, 100);
    }
  };

  const smoothScrollTo = (element) => {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight + 10 : 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - navbarHeight - 80;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg- white min-h-screen">
      {/* Header */}
      <header className="bg-[#003362] text-white py-3 fixed top-0 left-0 right-0 z-20 flex justify-center items-center h-[80px]">
        <Image
          src="/images/logo.png"
          alt="Cafe Logo"
          width={120}
          height={120}
          className="h-[120px] w-auto"
        />
      </header>

      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-3 fixed top-[80px] left-0 right-0 z-10 shadow-lg">
        <div className="max-w-full mx-auto flex flex-nowrap overflow-x-auto whitespace-nowrap justify-start gap-4 px-4 pl-4">
          {menuData.categories.map((category) => (
            <Link key={category.name} href={`#${category.name}`} scroll={false}>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category.name);
                }}
                className={`flex justify-center items-center px-4 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === category.name
                    ? "border-2 border-white bg-yellow-500 text-black shadow-md"
                    : "hover:bg-yellow-400 hover:text-black"
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Menü İçeriği */}
      <main className="pt-[180px] p-4 max-w-full mx-auto">
        {menuData.categories.map((category) => (
          <div id={category.name} key={category.name} className="mb-11 mt-0">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-black">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center p-3 border rounded-lg shadow-md space-x-4 w-full bg-white"
                >
                  <div className="flex-shrink-0 w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <p className="text-black text-base sm:text-lg font-semibold">
                      {item.name}
                    </p>
                    <p className="text-black text-sm sm:text-base">
                      {item.price} TL
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* WhatsApp & Instagram Butonları */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-50">
        {/* WhatsApp */}
        <a
          href="https://wa.me/YOUR_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110"
        >
          <Image
            src="/images/whatsapp.png"
            alt="WhatsApp"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/YOUR_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110"
        >
          <Image
            src="/images/instagram.png"
            alt="Instagram"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </a>
      </div>
    </div>
  );
}
