
import React from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-bceao-light to-white">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/3679c7a7-0843-40ec-a9b5-6d78d90e8617.png')] opacity-5 bg-repeat"></div>
      <Sidebar />
      <main className={cn("flex-1 overflow-auto p-6 relative z-10", className)}>
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
