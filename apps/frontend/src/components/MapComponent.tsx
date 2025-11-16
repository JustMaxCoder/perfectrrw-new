export function MapComponent() {
  return (
    <div className="w-full relative" data-testid="map-container">
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 -z-10 rounded-2xl p-[3px] bg-gradient-to-r from-black via-primary to-black animate-[gradient_3s_ease_infinite] bg-[length:200%_100%]" 
             style={{
               backgroundImage: 'linear-gradient(90deg, #000000 0%, #FCD34D 25%, #000000 50%, #FCD34D 75%, #000000 100%)',
               animation: 'gradient-shift 3s ease infinite'
             }}
        />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.123!2d20.6697!3d52.4328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb5e8e5e8e5e%3A0x5e5e5e5e5e5e5e5e!2sBohater%C3%B3w%20Modlina%2017%2C%2005-100%20Nowy%20Dw%C3%B3r%20Mazowiecki!5e0!3m2!1spl!2spl!4v1234567890"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa sklepu - BHP Perfect"
          className="rounded-2xl relative z-10"
        />
      </div>
      <style>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}