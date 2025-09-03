import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">ConectaTech</h1>
              <p className="text-sm text-muted-foreground">Fatec Zona Leste</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('projetos')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-projetos"
            >
              Projetos
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-como-funciona"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection('ods')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-ods"
            >
              ODS
            </button>
            <button 
              onClick={() => scrollToSection('eventos')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-eventos"
            >
              Eventos
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              data-testid="button-login"
            >
              Login
            </Button>
            <Button data-testid="button-cadastrar">
              Cadastrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('projetos')}
                className="text-left text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-projetos"
              >
                Projetos
              </button>
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="text-left text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-como-funciona"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('ods')}
                className="text-left text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-ods"
              >
                ODS
              </button>
              <button 
                onClick={() => scrollToSection('eventos')}
                className="text-left text-foreground hover:text-primary transition-colors"
                data-testid="nav-mobile-eventos"
              >
                Eventos
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" data-testid="button-mobile-login">
                  Login
                </Button>
                <Button data-testid="button-mobile-cadastrar">
                  Cadastrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
