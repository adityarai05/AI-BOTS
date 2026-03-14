import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./pages/Overview";
import Chatbots from "./pages/Chatbots";
import CreateBot from "./pages/CreateBot";
import Knowledge from "./pages/Knowledge";
import TestChat from "./pages/TestChat";
import Embed from "./pages/Embed";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ParallaxDemo from "./pages/ParallaxDemo";
import { FloatingBot } from "./components/blocks/FloatingBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FloatingBot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="chatbots" element={<Chatbots />} />
            <Route path="create" element={<CreateBot />} />
            <Route path="knowledge/:botId" element={<Knowledge />} />
            <Route path="test/:botId" element={<TestChat />} />
            <Route path="embed/:botId" element={<Embed />} />
            <Route path="analytics/:botId" element={<Analytics />} />
          </Route>
          <Route path="/parallax" element={<ParallaxDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
