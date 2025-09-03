import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, FileText, Ticket } from "lucide-react";

export default function EventsSection() {
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['/api/events/upcoming'],
  }) as { data: any[] };

  const pastEvents = [
    {
      id: 1,
      title: "Pitch Day - 2º Semestre 2023",
      description: "Apresentação de ideias de projetos por empreendedores e seleção pelos grupos de estudantes.",
      date: "20 de Dezembro, 2023",
      participants: 45,
      projects: 12
    },
    {
      id: 2,
      title: "Workshop de Metodologias Ágeis",
      description: "Capacitação para estudantes em metodologias de desenvolvimento ágil aplicadas a projetos reais.",
      date: "15 de Setembro, 2023",
      participants: 60,
      duration: "4 horas"
    }
  ];

  return (
    <section id="eventos" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Eventos Presenciais</h2>
          <p className="text-lg text-muted-foreground">
            Participe dos nossos encontros semestrais para networking e apresentação de projetos
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Próximo Evento */}
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-foreground p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-accent rounded-full text-accent-foreground text-sm font-medium">Próximo Evento</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{upcomingEvents[0].title}</h3>
                  <p className="text-primary-foreground/90 mb-4">
                    {upcomingEvents[0].description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(upcomingEvents[0].date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {upcomingEvents[0].startTime} às {upcomingEvents[0].endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {upcomingEvents[0].location}
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    data-testid="button-register-event"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Inscrever-se
                  </Button>
                  <p className="text-sm mt-2 text-primary-foreground/70">Evento gratuito</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Fallback para quando não há eventos próximos */}
          {(!upcomingEvents || upcomingEvents.length === 0) && (
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-foreground p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-accent rounded-full text-accent-foreground text-sm font-medium">Próximo Evento</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">Demo Day - 1º Semestre 2024</h3>
                  <p className="text-primary-foreground/90 mb-4">
                    Apresentação dos projetos desenvolvidos durante o semestre e networking entre 
                    empreendedores, estudantes e profissionais da área.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      15 de Junho, 2024
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      14h às 18h
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Auditório Fatec Zona Leste
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    data-testid="button-register-event"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Inscrever-se
                  </Button>
                  <p className="text-sm mt-2 text-primary-foreground/70">Evento gratuito</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Eventos Anteriores */}
          <h3 className="text-xl font-semibold mb-6 text-foreground">Eventos Anteriores</h3>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id} data-testid={`card-past-event-${event.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground" data-testid={`text-past-event-title-${event.id}`}>
                        {event.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-2" data-testid={`text-past-event-description-${event.id}`}>
                        {event.description}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants} participantes
                        </span>
                        {event.projects && (
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {event.projects} projetos apresentados
                          </span>
                        )}
                        {event.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-view-summary-${event.id}`}
                    >
                      Ver Resumo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
