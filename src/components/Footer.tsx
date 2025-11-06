export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              <span className="text-primary">AICS</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Arabian Integrated Construction Company
            </p>
          </div>
          
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AICS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
