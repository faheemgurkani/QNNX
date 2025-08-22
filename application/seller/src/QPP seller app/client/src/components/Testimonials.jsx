const items = [
  {
    name: "Ayesha Khan",
    role: "Boutique Owner · Karachi",
    text: "Super easy to set up. I listed 12 products and got my first 50 orders in a week!",
    avatar: "https://i.pravatar.cc/80?img=1",
    tone: "green"
  },
  {
    name: "Bilal Ahmed",
    role: "Electronics · Lahore",
    text: "Catalog + orders are smooth. Our repeat buyers increased by 30%.",
    avatar: "https://i.pravatar.cc/80?img=12",
    tone: "yellow"
  },
  {
    name: "Sadaf Malik",
    role: "Handmade Crafts · Islamabad",
    text: "Shipping and payments just worked. Loved the seller dashboard.",
    avatar: "https://i.pravatar.cc/80?img=5",
    tone: "green"
  },
  {
    name: "Hamza Raza",
    role: "Grocery · Multan",
    text: "From signup to first sale in 24 hours. Exactly what I needed.",
    avatar: "https://i.pravatar.cc/80?img=15",
    tone: "yellow"
  },
  {
    name: "Maria Javed",
    role: "Cosmetics · Faisalabad",
    text: "Support team was helpful and onboarding was painless.",
    avatar: "https://i.pravatar.cc/80?img=9",
    tone: "green"
  },
  {
    name: "Usman Ali",
    role: "Footwear · Peshawar",
    text: "Clean UI, fast payouts, zero hassle. Highly recommended.",
    avatar: "https://i.pravatar.cc/80?img=22",
    tone: "yellow"
  }
]

// Small card like your design
function Card({ item }) {
  const quote = item.tone === "green" ? "“”" : "“”"
  const accent =
    item.tone === "green"
      ? "text-emerald-500"
      : "text-amber-500"

  return (
  <div className="flex-none w-[320px] rounded-2xl bg-white border border-slate-100 shadow-soft p-5">

      <div className="flex items-center gap-3 mb-3">
    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-none" />

        <div>
          <div className="font-semibold text-slate-800">{item.name}</div>
          <div className="text-sm text-slate-500">{item.role}</div>
        </div>
        <div className={`ml-auto text-2xl ${accent}`}>“</div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
    </div>
  )
}

// One continuously scrolling row (duplicate content for seamless loop)
function Row({ reverse=false, speed=40 }) {
  const anim = reverse ? "animate-scroll-reverse" : "animate-scroll";
  return (
    <div className="relative overflow-hidden marquee-mask" style={{ "--duration": `${speed}s` }}>
      <div className={`flex w-[200%] gap-4 ${anim} hover:[animation-play-state:paused]`}>
        {/* copy 1 */}
        <div className="flex gap-4 w-1/2">
          {items.map((it, i) => <Card key={`a-${i}`} item={it} />)}
        </div>
        {/* copy 2 */}
        <div className="flex gap-4 w-1/2">
          {items.map((it, i) => <Card key={`b-${i}`} item={it} />)}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials(){
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <div className="text-center mb-8">
        <p className="text-sm text-brand-200">Testimonial</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">What The People Think About Us</h2>
      </div>

      <div className="space-y-6">
      <Row reverse={false} speed={40} />
<Row reverse={true}  speed={40} />

      </div>
      <p className="sr-only">
        Animation pauses on hover and respects reduced motion preferences.
      </p>
    </section>
  )
}
