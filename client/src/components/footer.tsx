import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">ConectaTech</h3>
                <p className="text-sm text-secondary-foreground/70">Fatec Zona Leste</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Conectando empreendedores com estudantes de tecnologia para criar soluções inovadoras e gerar oportunidades.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#projetos" className="text-secondary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-projetos">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-secondary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-como-funciona">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#ods" className="text-secondary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-ods">
                  ODS
                </a>
              </li>
              <li>
                <a href="#eventos" className="text-secondary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-eventos">
                  Eventos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="text-accent mr-2">@</span>
                <span className="text-secondary-foreground/80" data-testid="footer-email">contato@conectatech.fatec.sp.gov.br</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">📞</span>
                <span className="text-secondary-foreground/80" data-testid="footer-phone">(11) 2024-8000</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">📍</span>
                <span className="text-secondary-foreground/80" data-testid="footer-address">Fatec Zona Leste, São Paulo - SP</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-accent rounded flex items-center justify-center hover:bg-accent/80 transition-colors"
                data-testid="footer-social-linkedin"
              >
                <span className="text-accent-foreground text-sm">in</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-accent rounded flex items-center justify-center hover:bg-accent/80 transition-colors"
                data-testid="footer-social-instagram"
              >
                <span className="text-accent-foreground text-sm">ig</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-accent rounded flex items-center justify-center hover:bg-accent/80 transition-colors"
                data-testid="footer-social-youtube"
              >
                <span className="text-accent-foreground text-sm">yt</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/60 text-sm" data-testid="footer-copyright">
            © 2024 ConectaTech - Fatec Zona Leste. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors text-sm" data-testid="footer-terms">
              Termos de Uso
            </a>
            <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors text-sm" data-testid="footer-privacy">
              Privacidade
            </a>
            <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors text-sm" data-testid="footer-support">
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
