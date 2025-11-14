import { Card } from "../components/ui/card";
import { Shield, Award, Users, Truck } from "lucide-react";
import storePhoto from "../assets/store-photo.jpg";
import { BRANDING } from "../config/branding";

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Bezpieczeństwo",
      description: "Wszystkie produkty spełniają najwyższe normy bezpieczeństwa UE",
    },
    {
      icon: Award,
      title: "Jakość",
      description: "Współpracujemy tylko ze sprawdzonymi producentami",
    },
    {
      icon: Users,
      title: "Doświadczenie",
      description: "Ponad 15 lat doświadczenia w branży BHP",
    },
    {
      icon: Truck,
      title: "Szybka dostawa",
      description: "Wysyłka w 24h do całej Polski",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">O nas</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Jesteśmy liderem w dostarczaniu profesjonalnej odzieży roboczej i środków ochrony osobistej w Polsce.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-center">
                Nasza <span className="text-primary">misja</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                BHP Perfect powstał z myślą o bezpieczeństwie pracowników w każdej
                branży. Od ponad 15 lat dostarczamy najwyższej jakości odzież
                roboczą, obuwie BHP i środki ochrony osobistej.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Nasza siedziba znajduje się w Nowym Dworze Mazowieckim, skąd
                obsługujemy klientów w całej Polsce. Stawiamy na jakość,
                bezpieczeństwo i profesjonalną obsługę.
              </p>
              <p className="text-lg text-muted-foreground">
                Współpracujemy tylko ze sprawdzonymi producentami, którzy spełniają
                wszystkie normy bezpieczeństwa Unii Europejskiej.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl border-2 border-primary/20">
              <img
                src={storePhoto}
                alt="Sklep BHP Perfect - magazyn z asortymentem"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className="bg-primary rounded-full p-4 inline-flex mb-4">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Nasza lokalizacja</h2>
          <p className="text-xl text-muted-foreground mb-8">
            BHP Perfect
            <br />
            Nowy Dwór Mazowiecki, Poland
          </p>
          <p className="text-muted-foreground">
            Zapraszamy do odwiedzenia naszego sklepu stacjonarnego lub kontaktu
            przez email i telefon.
          </p>
        </div>
      </section>
    </div>
  );
}