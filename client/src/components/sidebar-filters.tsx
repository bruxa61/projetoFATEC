import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface Filters {
  projectType: string;
  businessArea: string;
  deadline: string;
  complexity: string;
}

interface SidebarFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

export default function SidebarFilters({ filters, onFilterChange, onClearFilters }: SidebarFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <aside className="lg:w-80">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="ml-auto text-xs"
                data-testid="button-clear-filters"
              >
                Limpar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Tipo de Projeto */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Tipo de Projeto</Label>
            <div className="space-y-2">
              {[
                { value: 'web_system', label: 'Sistema Web' },
                { value: 'mobile_app', label: 'Aplicativo Mobile' },
                { value: 'landing_page', label: 'Landing Page' },
                { value: 'ecommerce', label: 'E-commerce' }
              ].map(type => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type.value}`}
                    checked={filters.projectType === type.value}
                    onCheckedChange={(checked) => 
                      onFilterChange('projectType', checked ? type.value : '')
                    }
                    data-testid={`checkbox-type-${type.value}`}
                  />
                  <Label 
                    htmlFor={`type-${type.value}`} 
                    className="text-sm cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Área de Negócio */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Área de Negócio</Label>
            <Select 
              value={filters.businessArea} 
              onValueChange={(value) => onFilterChange('businessArea', value)}
            >
              <SelectTrigger data-testid="select-business-area">
                <SelectValue placeholder="Todas as áreas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as áreas</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="comercio">Comércio</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Prazo */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Prazo de Entrega</Label>
            <Select 
              value={filters.deadline} 
              onValueChange={(value) => onFilterChange('deadline', value)}
            >
              <SelectTrigger data-testid="select-deadline">
                <SelectValue placeholder="Qualquer prazo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer prazo</SelectItem>
                <SelectItem value="1_month">Até 1 mês</SelectItem>
                <SelectItem value="1_3_months">1-3 meses</SelectItem>
                <SelectItem value="3_6_months">3-6 meses</SelectItem>
                <SelectItem value="6_plus_months">Mais de 6 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Complexidade */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Complexidade</Label>
            <RadioGroup 
              value={filters.complexity} 
              onValueChange={(value) => onFilterChange('complexity', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="complexity-all" />
                <Label htmlFor="complexity-all" className="text-sm cursor-pointer">
                  Todas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="complexity-basic" data-testid="radio-complexity-basic" />
                <Label htmlFor="complexity-basic" className="text-sm cursor-pointer">
                  Básica
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="complexity-intermediate" data-testid="radio-complexity-intermediate" />
                <Label htmlFor="complexity-intermediate" className="text-sm cursor-pointer">
                  Intermediária
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="complexity-advanced" data-testid="radio-complexity-advanced" />
                <Label htmlFor="complexity-advanced" className="text-sm cursor-pointer">
                  Avançada
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            className="w-full" 
            disabled={!hasActiveFilters}
            data-testid="button-apply-filters"
          >
            <Search className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
