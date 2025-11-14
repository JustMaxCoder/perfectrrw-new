import { Card } from "../components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { MapComponent } from "../components/MapComponent";

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+48 123 456 789",
      link: "tel:+48123456789",
    },
    {
      icon: Mail,
      title: "Email",
      content: "kontakt@sklepbhp.pl",
      link: "mailto:kontakt@sklepbhp.pl",
    },
    {
      icon: MapPin,
      title: "Adres",
      content: "Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki",
      link: null,
    },
    {
      icon: Clock,
      title: "Godziny otwarcia",
      content: "Pn-Pt: 8:00-17:00, Sob: 9:00-14:00",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Kontakt</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Skontaktuj się z nami - chętnie odpowiemy na wszystkie pytania
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className="bg-primary rounded-full p-4 inline-flex mb-4">
                  <info.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-${info.title.toLowerCase()}`}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.content}</p>
                )}
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Masz pytania?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Nasz zespół ekspertów jest do Twojej dyspozycji. Skontaktuj się z
                nami telefonicznie lub mailowo, a pomożemy Ci dobrać odpowiednie
                produkty BHP dla Twojej firmy.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Oferujemy również doradztwo w zakresie doboru środków ochrony
                osobistej oraz możliwość zamówień hurtowych z atrakcyjnymi rabatami.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="font-semibold">Zamówienia hurtowe</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Dla firm oferujemy specjalne warunki współpracy i rabaty. Skontaktuj
                  się z nami, aby uzyskać ofertę.
                </p>
              </div>
            </div>
          </Card>

          {/* Map */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Nasza Lokalizacja</h2>
            <div className="w-full">
              <MapComponent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
