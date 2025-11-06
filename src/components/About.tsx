import { CheckCircle2 } from "lucide-react";

const features = [
  "30+ years of industry experience",
  "ISO certified quality standards",
  "Cutting-edge engineering technology",
  "On-time project delivery guarantee",
  "Comprehensive after-sales support",
  "Sustainable construction practices",
];

export const About = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose <span className="text-primary">AICS</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Arabian Integrated Construction Company has been at the forefront of steel structure 
              construction in the region. Our commitment to excellence and innovation drives us to 
              deliver projects that exceed expectations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Completed Projects</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction Rate</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
