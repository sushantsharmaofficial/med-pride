import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

import React from "react";
import ButtomFooter from "./components/buttomFooter";

export default function Footer() {
  return (
    <footer className="bg-primary h-full relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-5 right-[10%] w-80 h-80 rounded-full bg-white opacity-3"></div>
        <div className="absolute top-20 right-[20%] w-80 h-80 rounded-full bg-white opacity-3"></div>
        <div className="absolute top-5 right-[5%] w-80 h-80 rounded-full bg-white opacity-3"></div>
      </div>

      <div className="container max-w-7xl mx-auto py-12 relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-start justify-start h-full">
          <div className="pb-16 pt-6">
            <Image
              src="https://www.medequip-uk.com/images/rgb_mqp-logo-2022_240px@2x.png?v=09.01.2023"
              alt="logo"
              width={300}
              height={300}
            />
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-between items-start gap-12 font-fira-sans">
            <div className="flex flex-col items-start justify-start w-full  md:min-w-[280px]   ">
              <p className=" text-base pb-12  ">
                Our core purpose is to provide health workers with top-quality
                medical devices.
              </p>

              <div className="flex flex-col gap-2  ">
                <h3 className="text-base font-bold">Head office</h3>
                <p className="text-base">Tripureshwar, Kathmandu</p>
                <p className="text-base">Nepal</p>
                <p className="text-base underline">+977 9808000000</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end md:justify-end">
              <ul className="list-none flex flex-col gap-1  ">
                <li className="mb-1 text-base">Our products</li>
                <li className="mb-1 text-base">Therapeutic stakes</li>
                <li className="mb-1 text-base">Breaking news</li>
                <li className="mb-1 text-base">Resources</li>
                <li className="mb-1 text-base">The Vygon Group</li>
              </ul>
            </div>
            <div className="flex flex-col items-start md:items-center md:justify-center">
              <ul className="list-none flex flex-col gap-1  ">
                <li className="mb-1">Contact</li>
                <li className="mb-1">Join us</li>
                <li className="mb-1">My favourites</li>
                <li className="mb-1">Sign in</li>
              </ul>
            </div>
            <div className="flex flex-col items-start md:items-end md:justify-end">
              <ul className="list-none flex flex-col gap-1  ">
                <li className="mb-1">Our other sites</li>
                <li className="mb-1">IFU Hub</li>
                <li className="mb-1">Hemodynamic Management</li>
                <li className="mb-1">Safe Enteral</li>
                <li className="mb-1">CytoPrevent</li>
                <li className="mb-1">Neonates</li>
                <li className="mb-1">VascuFirst</li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center md:-mt-12 min-w-[300px]">
              <p className="text-lg font-fira-sans mb-4 font-bold">Follow us</p>
              <ul className="list-none mt-2 flex items-center gap-5">
                <li className="mb-1 ">
                  <Facebook className="w-12 h-12" />
                </li>
                <li className="mb-1 ">
                  <Twitter className="w-12 h-12" />
                </li>
                <li className="mb-1 ">
                  <Instagram className="w-12 h-12" />
                </li>
                <li className="mb-1 ">
                  <Linkedin className="w-12 h-12" />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <ButtomFooter />
    </footer>
  );
}
