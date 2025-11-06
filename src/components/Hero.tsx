import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-steel.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Background Image with Advanced Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern steel structure construction"
          className="w-full h-full object-cover opacity-30 md:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Industry Leading Steel Solutions</span>
          </div>

          {/* Logo/Brand with Glow Effect */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl md:blur-2xl rounded-full" />
              <Building2 className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-primary" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-primary">
              AICS
            </h1>
          </div>

          {/* Main Headline with Stagger Animation */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-slide-up px-4" style={{ animationDelay: "0.4s" }}>
            Arabian Integrated<br />
            <span className="text-primary">Construction Company</span>
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed animate-slide-up px-4" style={{ animationDelay: "0.6s" }}>
            Precision-engineered steel structures that stand the test of time.{" "}
            <span className="text-foreground font-semibold">Built to last, designed to impress.</span>
          </p>

          {/* CTA Buttons with Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center mb-12 md:mb-16 animate-slide-up px-4" style={{ animationDelay: "0.8s" }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6 h-auto relative group overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get a Free Quote
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6 h-auto backdrop-blur-sm hover:bg-primary/10 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Explore Projects
            </Button>
          </div>

          {/* Enhanced Stats with Modern Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-3xl mx-auto animate-fade-in px-4" style={{ animationDelay: "1s" }}>
            {[
              { number: "500+", label: "Projects Completed", icon: "🏗️" },
              { number: "25+", label: "Years Experience", icon: "⭐" },
              { number: "99%", label: "Client Satisfaction", icon: "💯" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-1 md:space-y-2">
                  <div className="text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
