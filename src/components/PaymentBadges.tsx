export function PaymentBadges({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-1">
      {/* Apple Pay */}
      <span
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md border text-xs font-semibold tracking-tight ${
          dark
            ? 'bg-black text-white border-white/20'
            : 'bg-black text-white border-black/10'
        }`}
        title="Apple Pay"
      >
        <svg className="h-3.5 w-auto fill-current mr-0.5" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.91-10.28-19.14-13.56-30.7-3.26-11.56-4.9-22.37-4.9-32.44 0-14.79 3.8-27.13 11.41-37.03 7.6-9.9 17.06-14.95 28.37-15.17 4.58 0 9.78 1.25 15.6 3.76 5.82 2.5 9.47 3.81 10.96 3.91 1.48-.1 5.37-1.46 11.66-4.08 6.29-2.61 11.59-3.8 15.9-3.56 12.18.66 21.65 5.23 28.4 13.72-10.76 6.52-16.03 15.54-15.82 27.05.22 9.02 3.65 16.59 10.3 22.7 6.64 6.12 14.54 9.54 23.68 10.29-2.39 7.39-5.38 14.88-8.98 22.46zM119.22 31.02c0-7.39 2.66-14.28 7.99-20.67 5.33-6.39 11.96-10.35 19.9-11.89.22 1.2.33 2.45.33 3.75 0 7.39-2.77 14.5-8.32 21.32-5.55 6.82-12.29 10.87-20.22 12.15-.22-1.3-.33-2.52-.33-3.66z" />
        </svg>
        Pay
      </span>

      {/* Google Pay */}
      <span
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md border text-xs font-semibold ${
          dark
            ? 'bg-white text-neutral-900 border-white/20'
            : 'bg-white text-neutral-800 border-neutral-300 shadow-sm'
        }`}
        title="Google Pay"
      >
        <span className="font-bold flex items-center tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
          <span className="ml-1 text-neutral-800">Pay</span>
        </span>
      </span>

      {/* Visa */}
      <span
        className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-md border text-xs font-black tracking-widest ${
          dark
            ? 'bg-white text-[#1434CB] border-white/20'
            : 'bg-white text-[#1434CB] border-neutral-300 shadow-sm'
        }`}
        title="Visa"
      >
        VISA
      </span>

      {/* Mastercard */}
      <span
        className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-md border ${
          dark
            ? 'bg-white border-white/20'
            : 'bg-white border-neutral-300 shadow-sm'
        }`}
        title="Mastercard"
      >
        <div className="flex items-center -space-x-1">
          <div className="h-3 w-3 rounded-full bg-[#EB001B]" />
          <div className="h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
        </div>
      </span>

      {/* Stripe Secure */}
      <span
        className={`inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium ${
          dark ? 'text-cream-100/70' : 'text-forest-700/70'
        }`}
      >
        <svg className="h-3 w-3 text-amber-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
        <span className="font-semibold">Stripe</span>
      </span>
    </div>
  )
}
