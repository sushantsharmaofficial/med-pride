import React from "react";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
} from "lucide-react";

export default function TopHeader() {
  return (
    <section className="w-full bg-primary text-white ">
      <div className="container max-w-7xl mx-auto flex items-center px-4 md:px-6 justify-end py-2">
        <div className="flex items-center gap-16">
          <div className="flex justify-between items-center gap-4 ">
            <Facebook className="w-5 h-5 hover:opacity-80 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:opacity-80 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:opacity-80 cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:opacity-80 cursor-pointer" />
            <Youtube className="w-5 h-5 hover:opacity-80 cursor-pointer" />
          </div>
          <div className="flex items-center gap-10 mr-6">
            <div className="flex items-center gap-2 ">
              <span className="text-sm font-oxanium">joins</span>
            </div>
            <div className="flex items-center gap-2  ">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-noto-serif">
                contact@medeqip.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
