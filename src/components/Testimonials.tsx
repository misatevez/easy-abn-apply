import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Sole Trader",
    text: "Got my ABN within 24 hours. The process was incredibly easy and the team was very helpful.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Freelancer",
    text: "I was dreading the paperwork but this service made it painless. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Small Business Owner",
    text: "Used the ABN + Business Name package. Great value and everything was handled professionally.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">What Our Customers Say</h2>
          <p className="text-muted-foreground">Trusted by thousands of Australian businesses</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-background p-6">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 text-sm text-muted-foreground">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
