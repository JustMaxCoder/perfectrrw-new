
import { Star, MapPin } from "lucide-react";
import { Card } from "./ui/card";

const reviews = [
  {
    id: 1,
    author: "Jan Kowalski",
    rating: 5,
    date: "2 tygodnie temu",
    text: "Świetny sklep z profesjonalnym sprzętem BHP. Obsługa bardzo pomocna, a ceny konkurencyjne. Polecam!",
    avatar: "JK"
  },
  {
    id: 2,
    author: "Anna Nowak",
    rating: 5,
    date: "1 miesiąc temu",
    text: "Zamówiłam odzież roboczą dla całego zespołu. Szybka wysyłka, świetna jakość produktów. Na pewno wrócę!",
    avatar: "AN"
  },
  {
    id: 3,
    author: "Piotr Wiśniewski",
    rating: 5,
    date: "3 tygodnie temu",
    text: "Bardzo dobra jakość butów roboczych. Wygodne i trwałe. Obsługa klienta na najwyższym poziomie.",
    avatar: "PW"
  },
  {
    id: 4,
    author: "Maria Lewandowska",
    rating: 4,
    date: "2 miesiące temu",
    text: "Duży wybór produktów BHP. Ceny mogłyby być nieco niższe, ale jakość rekompensuje to w pełni.",
    avatar: "ML"
  }
];

export default function GoogleReviews() {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white rounded-lg shadow-md p-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Opinie z Google
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({totalReviews} opinii)</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Sklep BHP Pogotowie BHP</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                    {review.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{review.author}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Google Link */}
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/maps/place/Bohater%C3%B3w+Modlina+17,+05-100+Nowy+Dw%C3%B3r+Mazowiecki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Zobacz wszystkie opinie w Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
