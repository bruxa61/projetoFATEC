import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ShowcaseSection() {
  const projects = [
    {
      id: 1,
      title: "Sistema de Gestão Escolar",
      description: "Plataforma completa para gestão de escola técnica, desenvolvida por estudantes do 4º semestre para uma instituição de ensino local.",
      technologies: ["React", "Node.js"],
      status: "Concluído",
      statusColor: "text-accent",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "App de Delivery Sustentável",
      description: "Aplicativo mobile que conecta produtores locais com consumidores, promovendo consumo consciente e sustentável na região.",
      technologies: ["Flutter", "Firebase"],
      status: "Concluído",
      statusColor: "text-accent",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "E-commerce de Artesanato",
      description: "Plataforma de vendas online para artesãos locais, incluindo sistema de pagamento e gestão de estoque integrado.",
      technologies: ["Vue.js", "Laravel"],
      status: "Em Desenvolvimento",
      statusColor: "text-orange-500",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground">Conheça alguns dos projetos desenvolvidos através da nossa plataforma</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-showcase-${project.id}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid={`text-showcase-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm" data-testid={`text-showcase-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1" data-testid={`technologies-showcase-${project.id}`}>
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${project.statusColor}`} data-testid={`status-showcase-${project.id}`}>
                    {project.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
