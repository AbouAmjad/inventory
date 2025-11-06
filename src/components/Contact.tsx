import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="relative py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4 md:mb-6">
            <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">Let's Build Together</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
            Ready to start your project? Contact us today for a consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Card className="relative gradient-steel border-border/50 shadow-card overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
              
              <CardContent className="p-6 md:p-8 lg:p-10 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+966 XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project requirements, timeline, and budget..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none text-sm md:text-base"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full text-base md:text-lg py-5 md:py-6 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Email Card */}
            <div className="group gradient-steel rounded-xl md:rounded-2xl p-6 md:p-8 border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 hover:shadow-glow md:hover:-translate-x-2">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 md:group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">Email Us</h3>
                  <a 
                    href="mailto:miskandar@aicsco.com"
                    className="text-sm md:text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors block break-all"
                  >
                    miskandar@aicsco.com
                  </a>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group gradient-steel rounded-xl md:rounded-2xl p-6 md:p-8 border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 hover:shadow-glow md:hover:-translate-x-2">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 md:group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">Call Us</h3>
                  <a 
                    href="tel:+966560054242"
                    className="text-sm md:text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors block"
                  >
                    +966 56 005 4242
                  </a>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group gradient-steel rounded-xl md:rounded-2xl p-6 md:p-8 border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 hover:shadow-glow md:hover:-translate-x-2">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 md:group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">Visit Us</h3>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Saudi Arabia</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Advanced Industrial Construction Steel</p>
                </div>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="relative group overflow-hidden rounded-xl md:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-glow" />
              <div className="relative bg-background/95 m-[2px] rounded-xl md:rounded-2xl p-6 md:p-8">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">Emergency Services?</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  We offer 24/7 emergency support for urgent projects and critical situations.
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full group/btn text-sm md:text-base"
                >
                  <span className="flex items-center justify-center gap-2">
                    Call Emergency Hotline
                    <Phone className="h-4 w-4 md:h-5 md:w-5 group-hover/btn:animate-pulse" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
