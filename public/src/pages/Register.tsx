
import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Hasła nie są zgodne");
      }

      return await apiRequest("POST", "/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Konto utworzone!",
        description: "Witamy w BHP Perfect!",
      });
      setLocation("/profil");
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd rejestracji",
        description: error.message || "Nie udało się utworzyć konta",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <UserPlus className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Utwórz konto</h1>
          <p className="text-muted-foreground">
            Dołącz do BHP Perfect i zarządzaj swoimi zamówieniami
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Nazwa użytkownika *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                required
                minLength={3}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="jan_kowalski"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="password">Hasło *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 6 znaków
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Potwierdź hasło *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Tworzenie konta..." : "Utwórz konto"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Masz już konto?{" "}
            <button
              onClick={() => setLocation("/logowanie")}
              className="text-primary font-medium hover:underline"
            >
              Zaloguj się
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
