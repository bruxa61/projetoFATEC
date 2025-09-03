import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Tag, Clock, MapPin, Users } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  
  const { data: project, isLoading } = useQuery({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  }) as { data: any, isLoading: boolean };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado</h1>
              <p className="text-muted-foreground">O projeto que você está procurando não existe ou foi removido.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const technologies = project ? JSON.parse(project.technologies || '[]') : [];
  
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {project.entrepreneur?.fullName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {getDeadlineLabel(project.deadline)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {getProjectTypeLabel(project.projectType)}
                    </span>
                  </div>
                  <Badge className={getComplexityColor(project.complexity)}>
                    {getComplexityLabel(project.complexity)}
                  </Badge>
                </div>
                
                <div className="lg:w-48 flex flex-col gap-2">
                  <Button 
                    data-testid="button-manifest-interest" 
                    className="w-full"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manifestar Interesse
                  </Button>
                  <Button 
                    variant="outline" 
                    data-testid="button-contact-entrepreneur"
                    className="w-full"
                  >
                    Entrar em Contato
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Project Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descrição do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{project.description}</p>
            </CardContent>
          </Card>

          {/* Technologies and Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tecnologias Necessárias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área de Negócio:</span>
                  <span className="font-medium">{project.businessArea}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prazo:</span>
                  <span className="font-medium">{getDeadlineLabel(project.deadline)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexidade:</span>
                  <span className="font-medium">{getComplexityLabel(project.complexity)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline">
                    {project.status === 'available' ? 'Disponível' : project.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entrepreneur Information */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Empreendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="font-medium">{project.entrepreneur?.fullName}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Empresa:</span>
                  <span className="font-medium">{project.entrepreneur?.company}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{project.entrepreneur?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interest Information */}
          {project && project.interests && project.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Grupos Interessados ({project.interests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.interests.map((interest: any) => (
                    <div key={interest.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{interest.studentGroup.representativeName}</h4>
                        <Badge variant="outline">
                          {interest.status === 'pending' ? 'Pendente' : interest.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {interest.studentGroup.semester}º Semestre - RA: {interest.studentGroup.ra}
                      </p>
                      {interest.message && (
                        <p className="text-sm">{interest.message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
