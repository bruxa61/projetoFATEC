import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Building, Handshake } from "lucide-react";

export default function SDGSection() {
  const sdgs = [
    {
      number: 4,
      title: "Educação de Qualidade",
      description: "Ampliar a aprendizagem prática e estimular competências digitais, empreendedoras e colaborativas.",
      icon: GraduationCap,
      color: "bg-blue-500"
    },
    {
      number: 8,
      title: "Trabalho Decente",
      description: "Gerar oportunidades de trabalho freelancer e fomentar o empreendedorismo para estudantes e autônomos.",
      icon: Briefcase,
      color: "bg-red-500"
    },
    {
      number: 9,
      title: "Inovação e Infraestrutura",
      description: "Promover inovação tecnológica e apoiar pequenas empresas, autônomos e startups locais.",
      icon: Building,
      color: "bg-orange-500"
    },
    {
      number: 17,
      title: "Parcerias e Meios",
      description: "Criar rede de colaboração entre academia e comunidade, fortalecendo parcerias sustentáveis.",
      icon: Handshake,
      color: "bg-blue-600"
    }
  ];

  return (
    <section id="ods" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Objetivos de Desenvolvimento Sustentável</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nossa plataforma contribui diretamente para o alcance dos ODS da ONU, promovendo educação de qualidade, 
            trabalho decente e parcerias para o desenvolvimento sustentável.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sdgs.map((sdg) => {
            const IconComponent = sdg.icon;
            return (
              <Card key={sdg.number} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-sdg-${sdg.number}`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${sdg.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">ODS {sdg.number}</h3>
                  <h4 className="text-sm font-medium mb-3 text-primary">{sdg.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {sdg.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
