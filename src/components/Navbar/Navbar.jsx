import React, { useEffect, useState } from "react";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/#about" },
  { id: 3, name: "Services & Products", link: "/#services" },
  { id: 4, name: "Contact", link: "/#about" },
  { id: 5, name: "Tour", link: "/#about" },
  { id: 6, name: "Training", link: "/#about" },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${
        isSticky ? "fixed top-0 z-50 shadow-lg" : "relative"
      } w-full bg-gradient-to-r from-white to-green-800 text-white transition-all duration-300`}
    >
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div data-aos="fade-down" data-aos-once="true">
            <a
              href="/"
              className="font-bold text-2xl sm:text-3xl flex items-center gap-2 tracking-wider font-sans text-green-900"
            >
              KRC
            </a>
          </div>

          {/* Menu */}
          <div
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
            className="flex items-center gap-4"
          >
            <ul className="hidden sm:flex items-center gap-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="inline-block text-xl py-4 px-4 text-black hover:text-white duration-200 font-sans"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
