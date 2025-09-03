import { Button } from "@/components/ui/button";
import { Rocket, Users } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-gradient text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Conectamos <span className="text-accent">Empreendedores</span> com 
            <span className="text-accent"> Estudantes de Tecnologia</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90">
            Plataforma que une demandas reais de negócios com projetos acadêmicos da Fatec Zona Leste, 
            criando oportunidades de aprendizado prático e soluções inovadoras.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={() => scrollToSection('cadastro')}
              data-testid="button-publicar-projeto"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Publicar Projeto
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              onClick={() => scrollToSection('cadastro')}
              data-testid="button-formar-equipe"
            >
              <Users className="h-5 w-5 mr-2" />
              Formar Equipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
