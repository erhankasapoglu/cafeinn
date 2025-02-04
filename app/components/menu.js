"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import menuData from "../data/menu.json";
import Link from "next/link";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(100);

  useEffect(() => {
    // Navbar yüksekliğini dinamik olarak al
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight); // Navbar yüksekliğini al
    }
  }, []);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      setTimeout(() => {
        smoothScrollTo(element);
      }, 100); // Küçük bir gecikme vererek daha düzgün bir kaydırma sağlıyoruz
    }
  };

  const smoothScrollTo = (element) => {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight + 10 : 100; // Navbar yüksekliği + 10px boşluk
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 80;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-900 text-white py-3 fixed top-0 left-0 right-0 z-20 flex justify-center items-center h-[80px]">
        <Image
          src="/images/logo.png"
          alt="Cafe Logo"
          width={100}
          height={100}
          className="h-[60px] w-auto"
        />
      </header>

      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-3 fixed top-[80px] left-0 right-0 z-10 shadow-lg">
        <div className="max-w-full mx-auto flex flex-wrap justify-center gap-2 px-2">
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
          <div
            id={category.name}
            key={category.name}
            className="mb-11 mt-0" // Kategori başlıkları en üste hizalanacak
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center p-3 border rounded-lg shadow-md space-x-4 w-full bg-white"
                >
                  {/* Resim */}
                  <div className="flex-shrink-0 w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  {/* İçecek Adı ve Fiyat */}
                  <div className="flex flex-col justify-start">
                    <p className="text-black text-base sm:text-lg font-semibold">
                      {item.name}
                    </p>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {item.price} TL
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
