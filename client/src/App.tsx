import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import DigitalizePlanos from "@/pages/digitalize-planos";
import DigitalizeComparacao from "@/pages/digitalize-comparacao";
import PlanoDetalhes from "@/pages/plano-detalhes";
import Checkout from "@/pages/checkout";
import CheckoutSuccess from "@/pages/checkout-success";
import CheckoutCancelled from "@/pages/checkout-cancelled";
import CheckoutExpired from "@/pages/checkout-expired";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quem-somos" component={About} />
      <Route path="/produtos" component={Products} />
      <Route path="/digitalize-planos" component={DigitalizePlanos} />
      <Route path="/digitalize-comparacao" component={DigitalizeComparacao} />
      <Route path="/plano-detalhes" component={PlanoDetalhes} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/checkout/cancelled" component={CheckoutCancelled} />
      <Route path="/checkout/expired" component={CheckoutExpired} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
