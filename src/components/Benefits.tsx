import { CheckCircle2, Award, Timer, Users, Zap, Shield as ShieldIcon } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Industry-leading standards with certified materials and rigorous quality control processes.",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    icon: Timer,
    title: "On-Time Delivery",
    description: "Proven track record of meeting deadlines with efficient project management and planning.",
    gradient: "from-accent/20 via-accent/10 to-transparent",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Highly skilled engineers, fabricators, and project managers with decades of combined experience.",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    icon: CheckCircle2,
    title: "Safety First",
    description: "Comprehensive safety protocols and compliance with all industry regulations and standards.",
    gradient: "from-accent/20 via-accent/10 to-transparent",
  },
];

const stats = [
  { value: "5000+", label: "Tons of Steel", icon: "⚙️" },
  { value: "100+", label: "Team Members", icon: "👥" },
  { value: "24/7", label: "Support", icon: "📞" },
  { value: "ISO", label: "Certified", icon: "✓" },
];

const Benefits = () => {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-background to-card/20">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4 md:mb-6">
            <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Why Choose Us</span>
          </div>
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">Why Choose AICS</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
            Excellence in every beam, precision in every weld
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative text-center space-y-4 md:space-y-6 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-b from-card/50 to-transparent backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow md:hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: "scale-in 0.5s ease-out forwards"
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <div className="relative">
                  <div className="inline-flex p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-1 md:mb-2 md:group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-primary" />
                  </div>
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-primary/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 animate-pulse" />
                </div>

                <div className="relative space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Bar */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative gradient-steel rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-card border border-border/50 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group/stat hover:scale-110 transition-transform duration-300"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: "fade-in 0.6s ease-out forwards"
                  }}
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2 md:mb-3 group-hover/stat:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm font-medium">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm font-medium">OSHA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm font-medium">Industry Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
