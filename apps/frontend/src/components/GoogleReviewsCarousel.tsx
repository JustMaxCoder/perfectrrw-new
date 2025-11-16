
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface Review {
  name: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

const googleReviews: Review[] = [
  {
    name: "Michał H.",
    rating: 5,
    comment: "Я рекомендую. Магазин небольшой, но ассортимент хороший. Полезный и приятный сервис",
    timeAgo: "7 miesięcy temu"
  },
  {
    name: "Marlena Bielińska-Sawicka",
    rating: 5,
    comment: "Большой выбор товаров, вежливое обслуживание, очень отзывчивые, обработка нестандартных заказов, также регистрация в магазине одежды.",
    timeAgo: "8 miesięcy temu"
  },
  {
    name: "Daniel Czaja",
    rating: 5,
    comment: "Рекомендую этот магазин и этих людей. Я ждала майки с принтом 24 часа. Я очень удивлена! 😁 Доставка быстрая. Это КОМПАНИЯ!!! Хочу с ними работать! ☺️ Спасибо за помощь.",
    timeAgo: "rok temu"
  },
  {
    name: "Aleksander Śliwiński",
    rating: 5,
    comment: "Рекомендую магазин компаниям и частным лицам. Хороший ассортимент, доступные цены и очень приятное, полезное обслуживание. Обязательно вернусь",
    timeAgo: "rok temu"
  },
  {
    name: "Michał Za",
    rating: 5,
    comment: "Дружелюбное и полезное обслуживание",
    timeAgo: "rok temu"
  },
  {
    name: "Szczepan Slomski",
    rating: 5,
    comment: "Профессиональное обслуживание и очень большой выбор товаров. Однозначно рекомендую этот магазин.",
    timeAgo: "rok temu"
  },
  {
    name: "Michał Dobrowolski",
    rating: 5,
    comment: "Большой выбор товаров, отличное качество и профессиональное обслуживание. Рекомендую.",
    timeAgo: "rok temu"
  },
  {
    name: "Masakra Zmiana",
    rating: 5,
    comment: "Отличное обслуживание, очень большой выбор товаров.",
    timeAgo: "2 lata temu"
  },
  {
    name: "Włodzimierz Dolak",
    rating: 5,
    comment: "Профессиональное обслуживание, много товаров, рекомендую.",
    timeAgo: "2 lata temu"
  },
  {
    name: "Arkadiusz Lewandowski",
    rating: 5,
    comment: "Очень хорошее обслуживание и много товара, рекомендую.",
    timeAgo: "2 lata temu"
  },
  {
    name: "Marcin Osiak",
    rating: 5,
    comment: "Они предлагают все, что должно быть в магазине службы экстренной помощи по охране труда и технике безопасности.",
    timeAgo: "2 lata temu"
  },
  {
    name: "Paweł Paciorek",
    rating: 5,
    comment: "Магазин, который стоит рекомендовать, большой ассортимент. РЕКОМЕНДУЮ.",
    timeAgo: "2 lata temu"
  },
  {
    name: "Tymek Urbiak",
    rating: 5,
    comment: "Я рекомендую :)",
    timeAgo: "3 lata temu"
  },
  {
    name: "Royal Hotel",
    rating: 5,
    comment: "Заказ был обработан мгновенно, быстро и по доступной цене. Вежливое обслуживание. Рекомендую.",
    timeAgo: "3 lata temu"
  },
  {
    name: "Janusz Chrzanowski",
    rating: 5,
    comment: "Экспресс-заказ выполнен, очень приятное обслуживание. Доставка до вашей двери",
    timeAgo: "4 lata temu"
  },
  {
    name: "Czesław Pieniak",
    rating: 5,
    comment: "Компанию стоит рекомендовать. Большой выбор товаров для охраны труда и пожарной безопасности, оперативное выполнение заказов — сегодня заказываешь, завтра забираешь. Просторный магазин, очень вежливое обслуживание.",
    timeAgo: "4 lata temu"
  },
  {
    name: "Monika Lewandowska",
    rating: 5,
    comment: "Большой выбор обуви и рабочей одежды. Хороший сервис. Я рекомендую",
    timeAgo: "5 lat temu"
  },
  {
    name: "Mariusz Babrych",
    rating: 5,
    comment: "В магазине хороший ассортимент. Если вам понадобится что-то ещё, они закажут это и позвонят вам, чтобы сообщить о готовности. Если вам нужен логотип на футболке, они сделают его для вас. Персонал дружелюбный и профессиональный. Рекомендую.",
    timeAgo: "5 lat temu"
  },
  {
    name: "Piotr Burzykowski",
    rating: 4,
    comment: "Хороший сервис, отличные поставки. Я рекомендую!",
    timeAgo: "5 lat temu"
  }
];

const REVIEWS_PER_PAGE = 5;

export default function GoogleReviewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(googleReviews.length / REVIEWS_PER_PAGE);

  const currentReviews = googleReviews.slice(
    currentPage * REVIEWS_PER_PAGE,
    (currentPage + 1) * REVIEWS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const averageRating = googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            Opinie naszych <span className="text-primary">klientów</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
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
            <span className="text-lg font-semibold text-gray-700">
              {averageRating.toFixed(1)} ({googleReviews.length} opinii)
            </span>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Zobacz, co mówią o nas nasi zadowoleni klienci z Google Reviews
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={prevPage}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextPage}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={totalPages <= 1}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 min-h-[300px]">
            {currentReviews.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {review.timeAgo}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-4">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Przejdź do strony ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/Sklep+BHP+Pogotowie+BHP/@52.4328,20.6697,15z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Zobacz wszystkie opinie na Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
