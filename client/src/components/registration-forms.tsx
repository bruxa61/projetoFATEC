import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, GraduationCap, Send, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertEntrepreneurSchema, insertStudentGroupSchema } from "@shared/schema";

const entrepreneurFormSchema = insertEntrepreneurSchema.extend({
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  projectDescription: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
});

const studentGroupFormSchema = insertStudentGroupSchema.extend({
  interests: z.array(z.string()).min(1, "Selecione pelo menos uma área de interesse"),
});

type EntrepreneurFormData = z.infer<typeof entrepreneurFormSchema>;
type StudentGroupFormData = z.infer<typeof studentGroupFormSchema>;

export default function RegistrationForms() {
  const [activeForm, setActiveForm] = useState<'entrepreneur' | 'student'>('entrepreneur');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const entrepreneurForm = useForm<EntrepreneurFormData>({
    resolver: zodResolver(entrepreneurFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      projectDescription: "",
    },
  });

  const studentGroupForm = useForm<StudentGroupFormData>({
    resolver: zodResolver(studentGroupFormSchema),
    defaultValues: {
      representativeName: "",
      email: "",
      ra: "",
      semester: 1,
      members: "",
      interests: [],
    },
  });

  const entrepreneurMutation = useMutation({
    mutationFn: async (data: EntrepreneurFormData) => {
      const { projectType, projectDescription, ...entrepreneurData } = data;
      return apiRequest('POST', '/api/entrepreneurs', entrepreneurData);
    },
    onSuccess: () => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu cadastro foi criado. Você pode agora publicar projetos.",
      });
      entrepreneurForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
    onError: () => {
      toast({
        title: "Erro ao realizar cadastro",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const studentGroupMutation = useMutation({
    mutationFn: async (data: StudentGroupFormData) => {
      const formattedData = {
        ...data,
        interests: JSON.stringify(data.interests),
      };
      return apiRequest('POST', '/api/student-groups', formattedData);
    },
    onSuccess: () => {
      toast({
        title: "Grupo cadastrado com sucesso!",
        description: "Seu grupo foi registrado. Vocês podem agora manifestar interesse em projetos.",
      });
      studentGroupForm.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao cadastrar grupo",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onEntrepreneurSubmit = (data: EntrepreneurFormData) => {
    entrepreneurMutation.mutate(data);
  };

  const onStudentSubmit = (data: StudentGroupFormData) => {
    studentGroupMutation.mutate(data);
  };

  return (
    <section id="cadastro" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Faça Parte da Plataforma</h2>
          <p className="text-lg text-muted-foreground">Escolha como deseja participar do ecossistema ConectaTech</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Empreendedor Form */}
          <Card className={`transition-all ${activeForm === 'entrepreneur' ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Sou Empreendedor</CardTitle>
                <p className="text-muted-foreground">Tenho uma demanda e preciso de uma solução digital</p>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...entrepreneurForm}>
                <form onSubmit={entrepreneurForm.handleSubmit(onEntrepreneurSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={entrepreneurForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} data-testid="input-entrepreneur-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={entrepreneurForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-entrepreneur-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={entrepreneurForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(11) 99999-9999" {...field} data-testid="input-entrepreneur-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={entrepreneurForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa/Negócio</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da empresa" {...field} data-testid="input-entrepreneur-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={entrepreneurForm.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Projeto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-entrepreneur-project-type">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web_system">Sistema Web</SelectItem>
                            <SelectItem value="mobile_app">Aplicativo Mobile</SelectItem>
                            <SelectItem value="landing_page">Landing Page</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={entrepreneurForm.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição da Demanda</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva detalhadamente seu projeto, objetivos e requisitos..." 
                            className="h-24"
                            {...field} 
                            data-testid="textarea-entrepreneur-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full font-semibold"
                    disabled={entrepreneurMutation.isPending}
                    data-testid="button-submit-entrepreneur"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {entrepreneurMutation.isPending ? 'Cadastrando...' : 'Cadastrar Demanda'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Estudante Form */}
          <Card className={`transition-all ${activeForm === 'student' ? 'ring-2 ring-accent' : ''}`}>
            <CardHeader>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Sou Estudante</CardTitle>
                <p className="text-muted-foreground">Quero participar de projetos reais e ganhar experiência</p>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...studentGroupForm}>
                <form onSubmit={studentGroupForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                  <FormField
                    control={studentGroupForm.control}
                    name="representativeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Representante</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do líder do grupo" {...field} data-testid="input-student-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={studentGroupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-student-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={studentGroupForm.control}
                      name="ra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RA (Registro Acadêmico)</FormLabel>
                          <FormControl>
                            <Input placeholder="1111392521XXX" {...field} data-testid="input-student-ra" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={studentGroupForm.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semestre Atual</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-student-semester">
                              <SelectValue placeholder="Selecione o semestre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1º Semestre</SelectItem>
                            <SelectItem value="2">2º Semestre</SelectItem>
                            <SelectItem value="3">3º Semestre</SelectItem>
                            <SelectItem value="4">4º Semestre</SelectItem>
                            <SelectItem value="5">5º Semestre</SelectItem>
                            <SelectItem value="6">6º Semestre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={studentGroupForm.control}
                    name="members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membros do Grupo</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Nome e RA de cada membro (separados por linha)" 
                            className="h-20"
                            {...field} 
                            data-testid="textarea-student-members"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={studentGroupForm.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Áreas de Interesse</FormLabel>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            { value: 'frontend', label: 'Frontend' },
                            { value: 'backend', label: 'Backend' },
                            { value: 'mobile', label: 'Mobile' },
                            { value: 'uiux', label: 'UI/UX' }
                          ].map(interest => (
                            <div key={interest.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`interest-${interest.value}`}
                                checked={field.value.includes(interest.value)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked 
                                    ? [...field.value, interest.value]
                                    : field.value.filter(v => v !== interest.value);
                                  field.onChange(newValue);
                                }}
                                data-testid={`checkbox-interest-${interest.value}`}
                              />
                              <label 
                                htmlFor={`interest-${interest.value}`}
                                className="text-sm cursor-pointer"
                              >
                                {interest.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    disabled={studentGroupMutation.isPending}
                    data-testid="button-submit-student"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {studentGroupMutation.isPending ? 'Cadastrando...' : 'Cadastrar Grupo'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
