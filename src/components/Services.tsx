import { Card, CardContent } from "@/components/ui/card";
import { Building2, Factory, Warehouse, Boxes } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Commercial Buildings",
    description: "Complete steel structure solutions for commercial and office buildings with modern design standards",
  },
  {
    icon: Factory,
    title: "Industrial Facilities",
    description: "Heavy-duty steel frameworks for manufacturing plants and industrial complexes",
  },
  {
    icon: Warehouse,
    title: "Warehouses & Storage",
    description: "Efficient and cost-effective steel warehouse structures with maximum space utilization",
  },
  {
    icon: Boxes,
    title: "Custom Solutions",
    description: "Tailored steel structure designs to meet your specific project requirements",
  },
];

export const Services = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive steel structure solutions for every industrial and commercial need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
