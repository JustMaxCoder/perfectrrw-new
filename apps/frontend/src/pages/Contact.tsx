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
      {/* Hero Section - Minimalist 2025 */}
      <section className="bg-black text-white py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Kontakt
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Skontaktuj się z nami - chętnie odpowiemy na wszystkie pytania
          </p>
        </div>
      </section>

      {/* Contact Cards - Enhanced with 2025 Design */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary rounded-full p-4 inline-flex mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <info.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-black">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                    data-testid={`link-${info.title.toLowerCase()}`}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {info.content}
                  </p>
                )}
              </Card>
            ))}
          </div>

          {/* Additional Info - B2B Focus */}
          <Card className="p-8 md:p-12 bg-white border-0 shadow-lg mb-12 animate-fade-in-up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-black tracking-tight">
                Masz pytania?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nasz zespół ekspertów jest do Twojej dyspozycji. Skontaktuj się z
                nami telefonicznie lub mailowo, a pomożemy Ci dobrać odpowiednie
                produkty BHP dla Twojej firmy.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Oferujemy również doradztwo w zakresie doboru środków ochrony
                osobistej oraz możliwość zamówień hurtowych z atrakcyjnymi rabatami.
              </p>

              {/* B2B Special Block - Yellow Accent */}
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg hover:bg-primary/15 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-2 flex-shrink-0">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black text-lg mb-2">
                      Zamówienia hurtowe
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Dla firm oferujemy specjalne warunki współpracy i rabaty.
                    </p>
                    <a href="tel:+48533008146" className="text-xl font-bold text-black hover:text-primary transition-colors">
                      533 008 146
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Map Section - Modern Gradient Border */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold mb-8 text-center text-black tracking-tight">
              Nasza <span className="text-primary">Lokalizacja</span>
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki
            </p>
            <div className="w-full">
              <MapComponent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}