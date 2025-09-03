import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SidebarFilters from "./sidebar-filters";
import ProjectCard from "./project-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface Filters {
  projectType: string;
  businessArea: string;
  deadline: string;
  complexity: string;
}

export default function ProjectsSection() {
  const [filters, setFilters] = useState<Filters>({
    projectType: '',
    businessArea: '',
    deadline: '',
    complexity: ''
  });
  
  const [sortBy, setSortBy] = useState('recent');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['/api/projects', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') params.append(key, value);
      });
      
      const response = await fetch(`/api/projects?${params}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? '' : value }));
  };

  const clearFilters = () => {
    setFilters({
      projectType: '',
      businessArea: '',
      deadline: '',
      complexity: ''
    });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        const deadlineOrder = ['1_month', '1_3_months', '3_6_months', '6_plus_months'];
        return deadlineOrder.indexOf(a.deadline) - deadlineOrder.indexOf(b.deadline);
      case 'complexity_high':
        const complexityOrder = ['advanced', 'intermediate', 'basic'];
        return complexityOrder.indexOf(a.complexity) - complexityOrder.indexOf(b.complexity);
      case 'complexity_low':
        const complexityOrderLow = ['basic', 'intermediate', 'advanced'];
        return complexityOrderLow.indexOf(a.complexity) - complexityOrderLow.indexOf(b.complexity);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <section id="projetos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <SidebarFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
          
          <main className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Projetos Disponíveis</h2>
                <p className="text-muted-foreground" data-testid="text-projects-count">
                  {isLoading ? 'Carregando...' : `${sortedProjects.length} projetos encontrados`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48" data-testid="select-sort">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="deadline">Prazo mais próximo</SelectItem>
                    <SelectItem value="complexity_high">Maior complexidade</SelectItem>
                    <SelectItem value="complexity_low">Menor complexidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-6 mb-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-card rounded-lg border border-border p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-16 w-full" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-14" />
                        </div>
                      </div>
                      <div className="lg:w-48 space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : sortedProjects.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum projeto encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Não encontramos projetos que correspondam aos filtros selecionados.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                    data-testid="button-clear-filters-inline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                sortedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
            
            {/* Pagination would go here in a real app */}
            {sortedProjects.length > 0 && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors opacity-50 cursor-not-allowed">
                    ‹
                  </button>
                  <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md">1</button>
                  <button className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors opacity-50 cursor-not-allowed">
                    ›
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
