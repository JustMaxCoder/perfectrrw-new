
import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/login", formData);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Zalogowano pomyślnie!",
        description: `Witaj z powrotem, ${data.user.username}!`,
      });
      setLocation("/profil");
    },
    onError: () => {
      toast({
        title: "Błąd logowania",
        description: "Nieprawidłowy email lub hasło",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <LogIn className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Zaloguj się</h1>
          <p className="text-muted-foreground">
            Uzyskaj dostęp do swojego konta BHP Perfect
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="jan@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Nie masz konta?{" "}
            <button
              onClick={() => setLocation("/rejestracja")}
              className="text-primary font-medium hover:underline"
            >
              Zarejestruj się
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
