import { Building2, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail, Phone } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-card/20 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 lg:mb-16">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              <span className="text-xl md:text-2xl font-black text-primary">AICS</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Arabian Integrated Construction Company - Your trusted partner in steel structure solutions.
            </p>
            <div className="flex gap-3 md:gap-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group p-2 md:p-2.5 rounded-lg bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              {["Services", "Projects", "About Us", "Careers"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-foreground">Services</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                "Commercial Buildings",
                "Industrial Facilities",
                "Infrastructure",
                "Custom Fabrication",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-foreground">Contact</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:miskandar@aicsco.com"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  miskandar@aicsco.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+966560054242"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  +966 56 005 4242
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
            © 2024 AICS. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 md:p-4 rounded-full bg-primary hover:bg-accent transition-all duration-300 shadow-glow hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6 text-background group-hover:animate-bounce" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
