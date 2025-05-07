
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  AppWindow, 
  Search, 
  FileText, 
  ChartBar, 
  Database, 
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, href, isActive, onClick }: NavItemProps) => {
  return (
    <Link to={href} onClick={onClick}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 py-6 font-normal",
          isActive ? "bg-sidebar-accent text-white" : "text-gray-300 hover:text-white hover:bg-sidebar-accent/50"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { 
      icon: AppWindow, 
      label: "Modèle IA Multimodal", 
      href: "/model-selection",
    },
    { 
      icon: Search, 
      label: "Recherche Web", 
      href: "/web-search",
    },
    { 
      icon: FileText, 
      label: "Rédaction Documents", 
      href: "/document-editor",
    },
    { 
      icon: ChartBar, 
      label: "Génération Graphiques", 
      href: "/chart-generator",
    },
    { 
      icon: Database, 
      label: "Analyse Données", 
      href: "/data-analysis",
    },
    { 
      icon: MessageSquare, 
      label: "Chat Enrichi", 
      href: "/", 
    },
  ];

  return (
    <>
      {/* Mobile Trigger */}
      <div className="fixed top-4 left-4 z-50 block md:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar Backdrop for Mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-bceao-primary transition-all duration-300",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
          "md:relative md:translate-x-0 md:transition-none"
        )}
      >
        <div className="flex flex-col h-full w-64">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/c8aeb1b6-5733-40b8-8aa3-56497dca15ba.png" 
                alt="BCEAO Logo" 
                className="h-8 w-auto" 
              />
              <h1 className="text-xl font-bold text-white">BCEAO Chat</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-sidebar-accent"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="mt-4 flex flex-col space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
                onClick={() => setIsCollapsed(true)}
              />
            ))}
          </nav>
          
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Utilisateur BCEAO</p>
                <p className="text-xs text-gray-300">Analyste Économique</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
