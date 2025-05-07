
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatInterface from "./pages/ChatInterface";
import ModelSelection from "./pages/ModelSelection";
import WebSearch from "./pages/WebSearch";
import DocumentEditor from "./pages/DocumentEditor";
import ChartGenerator from "./pages/ChartGenerator";
import DataAnalysis from "./pages/DataAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/model-selection" element={<ModelSelection />} />
          <Route path="/web-search" element={<WebSearch />} />
          <Route path="/document-editor" element={<DocumentEditor />} />
          <Route path="/chart-generator" element={<ChartGenerator />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
