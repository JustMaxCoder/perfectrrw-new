import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Strona nie znaleziona</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Przepraszamy, strona której szukasz nie istnieje.
        </p>
        <Link href="/" data-testid="link-home">
          <Button size="lg" className="bg-primary text-primary-foreground">
            <Home className="mr-2 h-5 w-5" />
            Wróć na stronę główną
          </Button>
        </Link>
      </div>
    </div>
  );
}
