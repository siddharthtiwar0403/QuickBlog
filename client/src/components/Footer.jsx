import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-200">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-black">
        <div>
          <p
            onClick={() => navigate("/")}
            className="text-primary font-semibold text-3xl transition-all duration-300 ease-in-out  hover:text-blue-700 hover:scale-105 hover:-translate-y-1"
          >
            Siddharth Tiwari
          </p>

          <p className="max-w-[310px] mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            ea provident est quam veritatis quibusdam!
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-black">
        Copyright 2025 @ Siddharth Tiwari - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
