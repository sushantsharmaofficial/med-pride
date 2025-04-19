import React from "react";

export default function buttomFooter() {
  return (
    <div className="w-full bg-slate-800 text-white">
      <div className="container max-w-7xl mx-auto py-3 px-4 md:px-6">
        <div className="flex items-center justify-center gap-12">
          <p className="text-base">Legal Notice</p>
          <p className="text-base">Sitemap</p>
          <p className="text-base">Privacy Policy</p>
          <p className="text-base">Cookie Policy</p>
          <p className="text-base">Cookie Configuration</p>
        </div>
      </div>
    </div>
  );
}
