import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { Shield } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const testLoginMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/test-login", {});
    },
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Zalogowano pomyślnie",
        description: `Witaj, ${data.user.username}!`,
      });
      setTimeout(() => setLocation("/admin"), 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Błąd logowania",
        description: error.message || "Nie udało się zalogować",
        variant: "destructive",
      });
    },
  });

  const handleTestLogin = () => {
    testLoginMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-xl">
            <Shield className="h-10 w-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold mb-3 text-white">Panel administracyjny</h1>
          <p className="text-gray-400 text-lg">BHP Perfect</p>
        </div>

        <Card className="p-10 bg-black/40 backdrop-blur-lg border-2 border-primary/30 shadow-2xl">
          <div className="text-center space-y-4">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-white">Wejście testowe</h2>
              <p className="text-gray-400 text-sm">
                Szybki dostęp do panelu administracyjnego<br/>
                bez wprowadzania danych logowania
              </p>
            </div>
            
            <Button
              onClick={handleTestLogin}
              size="lg"
              className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-6 text-xl shadow-lg hover:shadow-primary/50 transition-all"
              disabled={testLoginMutation.isPending}
              data-testid="button-test-login"
            >
              {testLoginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Logowanie...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6" />
                  Wejdź do panelu administracyjnego
                </span>
              )}
            </Button>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                💡 <strong>Uwaga:</strong> Ten tryb działa tylko w środowisku deweloperskim.<br/>
                W wersji produkcyjnej wymagane będzie standardowe logowanie.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
