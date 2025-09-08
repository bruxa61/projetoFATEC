import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupsSection() {
  return (
    <section id="grupos" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Grupos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os grupos de estudantes e suas especialidades
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-code text-primary"></i>
                Desenvolvimento Web
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">React</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Node.js</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">TypeScript</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-mobile-alt text-primary"></i>
                Desenvolvimento Mobile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Criação de aplicativos móveis nativos e híbridos para iOS e Android, focando em experiência do usuário.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">React Native</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Flutter</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Swift</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-chart-bar text-primary"></i>
                Análise de Dados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Especialistas em análise de dados, machine learning e business intelligence para insights estratégicos.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Python</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">R</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">SQL</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-paint-brush text-primary"></i>
                Design e UX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Criação de interfaces intuitivas e experiências de usuário memoráveis, focando em usabilidade e design visual.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Figma</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Adobe XD</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Prototyping</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-bullhorn text-primary"></i>
                Marketing Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Estratégias de marketing digital, gestão de redes sociais e campanhas de divulgação para startups.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">SEO</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Social Media</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Analytics</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <i className="fas fa-cogs text-primary"></i>
                Engenharia e IoT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Desenvolvimento de soluções em IoT, automação e projetos de engenharia para inovações tecnológicas.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Arduino</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">Raspberry Pi</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">C++</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}