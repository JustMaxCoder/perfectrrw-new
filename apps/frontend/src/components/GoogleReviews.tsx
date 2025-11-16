import { Star, MapPin } from "lucide-react";
import { Card } from "./ui/card";

// Placeholder for actual review data
const reviews = [
  {
    id: 1,
    customerName: "Jan Kowalski",
    rating: 5,
    createdAt: "2024-07-10T10:00:00Z",
    comment: "Świetny sklep z profesjonalnym sprzętem BHP. Obsługa bardzo pomocna, a ceny konkurencyjne. Polecam!",
  },
  {
    id: 2,
    customerName: "Anna Nowak",
    rating: 5,
    createdAt: "2024-06-15T12:30:00Z",
    comment: "Zamówiłam odzież roboczą dla całego zespołu. Szybka wysyłka, świetna jakość produktów. Na pewno wrócę!",
  },
  {
    id: 3,
    customerName: "Piotr Wiśniewski",
    rating: 5,
    createdAt: "2024-07-01T09:00:00Z",
    comment: "Bardzo dobra jakość butów roboczych. Wygodne i trwałe. Obsługa klienta na najwyższym poziomie.",
  },
  {
    id: 4,
    customerName: "Maria Lewandowska",
    rating: 4,
    createdAt: "2024-05-20T15:00:00Z",
    comment: "Duży wybór produktów BHP. Ceny mogłyby być nieco niższe, ale jakość rekompensuje to w pełni.",
  }
];

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return name.substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper function to format date to "time ago"
const getTimeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sekund temu`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minut temu`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} godzin temu`;
  } else if (diffInSeconds < 2592000) { // Approximately 30 days
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} dni temu`;
  } else if (diffInSeconds < 31536000) { // Approximately 365 days
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} miesięcy temu`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} lat temu`;
  }
};


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
                    {getInitials(review.customerName)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
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
                    <span className="text-sm text-gray-500">{getTimeAgo(review.createdAt)}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
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