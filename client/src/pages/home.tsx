import Header from "@/components/header";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-section";
import RegistrationForms from "@/components/registration-forms";
import SDGSection from "@/components/sdg-section";
import ShowcaseSection from "@/components/showcase-section";
import EventsSection from "@/components/events-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProjectsSection />
      <section id="como-funciona" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Como Funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e eficiente para conectar demandas reais com estudantes talentosos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-plus text-2xl text-primary-foreground"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">1. Cadastro</h3>
              <p className="text-muted-foreground">Empreendedores se cadastram e descrevem suas demandas com detalhes do projeto</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-2xl text-accent-foreground"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">2. Descoberta</h3>
              <p className="text-muted-foreground">Estudantes exploram projetos usando filtros avançados para encontrar oportunidades ideais</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-handshake text-2xl text-secondary-foreground"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">3. Conexão</h3>
              <p className="text-muted-foreground">Grupos de alunos manifestam interesse e iniciam diálogo com empreendedores</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-2xl text-primary-foreground"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">4. Execução</h3>
              <p className="text-muted-foreground">Desenvolvimento colaborativo do projeto com acompanhamento e mentoria</p>
            </div>
          </div>
        </div>
      </section>
      <RegistrationForms />
      <SDGSection />
      <ShowcaseSection />
      <EventsSection />
      <Footer />
    </div>
  );
}
