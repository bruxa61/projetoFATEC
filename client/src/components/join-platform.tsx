import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, GraduationCap } from "lucide-react";

export default function JoinPlatform() {
  const scrollToRegister = () => {
    const element = document.getElementById('cadastro');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faca-parte" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Faça Parte da Plataforma</h2>
          <p className="text-lg text-muted-foreground">Escolha como deseja participar do ecossistema ConectaTech</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Empreendedor Card */}
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">Sou Empreendedor</CardTitle>
              <p className="text-muted-foreground">Tenho uma demanda e preciso de uma solução digital</p>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground text-sm space-y-2 mb-6">
                <li>• Publique seus projetos na plataforma</li>
                <li>• Receba propostas de grupos qualificados</li>
                <li>• Acompanhe o desenvolvimento do projeto</li>
                <li>• Acesso a estudantes especializados</li>
              </ul>
              <Button 
                onClick={scrollToRegister}
                className="w-full font-semibold"
              >
                Cadastrar como Empreendedor
              </Button>
            </CardContent>
          </Card>
          
          {/* Estudante Card */}
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl">Sou Estudante</CardTitle>
              <p className="text-muted-foreground">Quero participar de projetos reais e ganhar experiência</p>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground text-sm space-y-2 mb-6">
                <li>• Trabalhe em projetos reais do mercado</li>
                <li>• Ganhe experiência prática</li>
                <li>• Forme uma rede de contatos</li>
                <li>• Desenvolva seu portfólio</li>
              </ul>
              <Button 
                onClick={scrollToRegister}
                variant="secondary"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                Cadastrar como Estudante
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}