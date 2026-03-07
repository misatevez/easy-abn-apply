import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import ABNRegistration from "./pages/ABNRegistration";
import UpdateABNDetails from "./pages/UpdateABNDetails";
import ABNCancellation from "./pages/ABNCancellation";
import BusinessNameCancellation from "./pages/BusinessNameCancellation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/abn-registration" element={<ABNRegistration />} />
          <Route path="/update-abn-details" element={<UpdateABNDetails />} />
          <Route path="/abn-cancellation" element={<ABNCancellation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
