import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Tag, Info, Users } from "lucide-react";
import type { ProjectWithEntrepreneur } from "@shared/schema";

interface ProjectCardProps {
  project: ProjectWithEntrepreneur;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const technologies = JSON.parse(project.technologies || '[]');
  
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-accent/10 text-accent';
      case 'intermediate': return 'bg-accent/10 text-accent';
      case 'advanced': return 'bg-primary/10 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'Básico';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return complexity;
    }
  };

  const getDeadlineLabel = (deadline: string) => {
    switch (deadline) {
      case '1_month': return 'Até 1 mês';
      case '1_3_months': return '1-3 meses';
      case '3_6_months': return '3-6 meses';
      case '6_plus_months': return 'Mais de 6 meses';
      default: return deadline;
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'web_system': return 'Sistema Web';
      case 'mobile_app': return 'Aplicativo Mobile';
      case 'landing_page': return 'Landing Page';
      case 'ecommerce': return 'E-commerce';
      default: return type;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`card-project-${project.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1" data-testid={`text-title-${project.id}`}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span data-testid={`text-entrepreneur-${project.id}`}>{project.entrepreneur.fullName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span data-testid={`text-deadline-${project.id}`}>{getDeadlineLabel(project.deadline)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span data-testid={`text-type-${project.id}`}>{getProjectTypeLabel(project.projectType)}</span>
                  </span>
                </div>
              </div>
              <Badge className={getComplexityColor(project.complexity)} data-testid={`badge-complexity-${project.id}`}>
                {getComplexityLabel(project.complexity)}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-description-${project.id}`}>
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4" data-testid={`technologies-${project.id}`}>
              {technologies.slice(0, 4).map((tech: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
              {technologies.length > 4 && (
                <Badge variant="secondary">+{technologies.length - 4}</Badge>
              )}
            </div>
          </div>
          
          <div className="lg:w-48 flex flex-col gap-2">
            <Button 
              className="w-full"
              data-testid={`button-interest-${project.id}`}
            >
              <Users className="h-4 w-4 mr-2" />
              Manifestar Interesse
            </Button>
            <Link href={`/projetos/${project.id}`}>
              <Button 
                variant="outline" 
                className="w-full"
                data-testid={`button-details-${project.id}`}
              >
                <Info className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
