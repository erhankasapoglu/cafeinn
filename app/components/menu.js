"use client"; // Bu satırı ekleyin, bileşenin istemci tarafında çalışacağını belirtmek için

import { useState } from "react";
import Image from "next/image";
import menuData from "../data/menu.json";
import Link from "next/link";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);

  // Kategorilere tıklandığında aktif kategoriyi belirle
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      smoothScrollTo(element, 600); // Burada 600ms kaydırma süresi belirtiliyor
    }
  };

  // Kaydırma efektini uygulamak için custom scroll fonksiyonu
  const smoothScrollTo = (element, duration) => {
    const start = window.scrollY;
    const navbarHeight = 170; // Navbar'ın yüksekliği (24 + 4px padding)
    const end = element.offsetTop - navbarHeight; // Navbar'ı geçmek için 96px ekliyoruz
    const distance = end - start;
    let startTime = null;
  
    const easeInOutQuad = (time, start, distance, duration) => {
      time /= duration / 2;
      if (time < 1) return (distance / 2) * time * time + start;
      time--;
      return (-distance / 2) * (time * (time - 2) - 1) + start;
    };
  
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };
  
    requestAnimationFrame(animateScroll);
  };

  return (
    <div>
      {/* Header: Logo - fixed ve navbarla birlikte sabit */}
      <header className="bg-gray-900 text-white py-0 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Image 
            src="/images/logo.png" 
            alt="Cafe Logo" 
            width={100} 
            height={100} 
            className="mx-auto" 
          />
        </div>
      </header>

      {/* Navbar */}
      <div className="bg-gray-800 text-white py-4 fixed top-24 left-0 right-0 z-20 shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-center space-x-4">
          {menuData.categories.map((category) => (
            <Link
              key={category.name}
              href={`#${category.name}`}
              className={`hover:text-yellow-500 relative`}
            >
              <span
                onClick={(e) => {
                  e.preventDefault(); // Link'in default davranışını engelle
                  handleCategoryClick(category.name); // Kategoriye kaydırma işlemini başlat
                }}
                className={`${
                  activeCategory === category.name
                    ? "border-2 border-white rounded-full px-3 py-1"
                    : ""
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Menü İçeriği */}
      <div className="pt-40 p-4 max-w-full mx-auto">
        {menuData.categories.map((category) => (
          <div
            id={category.name}
            key={category.name}
            className="mb-11 pt-0"
          >
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center justify-start p-2 border rounded-lg shadow space-x-4 w-full">
                  {/* Sol tarafa hizalanmış resim */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  {/* Sağdaki metin */}
                  <div className="flex flex-col justify-start">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-gray-500">{item.price} TRY</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
