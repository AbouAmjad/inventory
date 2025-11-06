import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Factory, Warehouse, Construction, HardHat, Shield } from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Commercial Buildings",
    description: "Modern steel frameworks for office buildings, retail centers, and mixed-use developments.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Factory,
    title: "Industrial Facilities",
    description: "Heavy-duty structures for manufacturing plants, warehouses, and production facilities.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Warehouse,
    title: "Storage Solutions",
    description: "Efficient and durable warehouse and storage facility construction.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Construction,
    title: "Infrastructure",
    description: "Large-scale projects including bridges, towers, and public infrastructure.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: HardHat,
    title: "Custom Fabrication",
    description: "Bespoke steel fabrication services tailored to your specific requirements.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Structural Engineering",
    description: "Expert design and engineering consultation for optimal structural integrity.",
    color: "from-accent/20 to-accent/5",
  },
];

const Services = () => {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4 md:mb-6">
            <span className="text-xs md:text-sm font-medium text-primary">What We Do</span>
          </div>
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">Our Services</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
            Comprehensive steel structure solutions from design to delivery
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden gradient-steel border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow md:hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: "fade-in 0.6s ease-out forwards"
                }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 p-4 md:p-6">
                  <div className="mb-4 md:mb-6 inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 md:group-hover:scale-110 md:group-hover:rotate-3">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-4 md:p-6 pt-0">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                  
                  {/* Hover Arrow */}
                  <div className="mt-3 md:mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-xs md:text-sm font-semibold">Learn more</span>
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center px-4">
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">Need something specific?</p>
          <button className="text-primary hover:text-accent font-semibold text-base md:text-lg transition-colors duration-300 underline underline-offset-4 decoration-2 hover:decoration-accent">
            Contact us for custom solutions →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
