import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';



interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  business: string;
  message: string;
  status: string;
  createdAt: string;
}

interface WhatsAppLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  source: string;
  createdAt: string;
}

export default function Admin() {
  const queryClient = useQueryClient();

  // Fetch contacts
  const { data: contactsData, isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    }
  });

  // Fetch WhatsApp leads
  const { data: whatsappData, isLoading: whatsappLoading } = useQuery({
    queryKey: ['/api/whatsapp-leads'],
    queryFn: async () => {
      const response = await fetch('/api/whatsapp-leads');
      if (!response.ok) throw new Error('Failed to fetch WhatsApp leads');
      return response.json();
    }
  });

  // Update appointment status
  const updateAppointmentStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
    }
  });

  // Update contact status
  const updateContactStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/contacts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    }
  });

  const contacts: Contact[] = contactsData?.contacts || [];
  const whatsappLeads: WhatsAppLead[] = whatsappData?.leads || [];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      new: { label: 'Novo', variant: 'secondary' as const },
      contacted: { label: 'Contatado', variant: 'default' as const },
      converted: { label: 'Convertido', variant: 'default' as const }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPlanBadge = (plan: string) => {
    const planMap = {
      start: { label: 'Start', variant: 'outline' as const },
      plus: { label: 'Plus', variant: 'secondary' as const },
      master: { label: 'Master', variant: 'default' as const },
      atendimento: { label: 'Atendimento', variant: 'destructive' as const }
    };
    
    const config = planMap[plan as keyof typeof planMap] || { label: plan, variant: 'outline' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Gerencie contatos e leads</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Contatos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leads WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{whatsappLeads.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contatos Novos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.status === 'new').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Convertidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.status === 'converted').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Management Tabs */}
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">Contatos ({contacts.length})</TabsTrigger>
            <TabsTrigger value="whatsapp">Leads WhatsApp ({whatsappLeads.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Contatos</CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="text-center py-8">Carregando contatos...</div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum contato encontrado
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Negócio</TableHead>
                          <TableHead>Mensagem</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone || 'Não informado'}</TableCell>
                            <TableCell>{contact.business}</TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate" title={contact.message}>
                                {contact.message}
                              </div>
                            </TableCell>
                            <TableCell>
                              {format(new Date(contact.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(contact.status)}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={contact.status}
                                onValueChange={(status) => updateContactStatus.mutate({ id: contact.id, status })}
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">Novo</SelectItem>
                                  <SelectItem value="contacted">Contatado</SelectItem>
                                  <SelectItem value="converted">Convertido</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leads WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                {whatsappLoading ? (
                  <div className="text-center py-8">Carregando leads do WhatsApp...</div>
                ) : whatsappLeads.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum lead do WhatsApp encontrado
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Plano</TableHead>
                          <TableHead>Origem</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {whatsappLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{getPlanBadge(lead.plan)}</TableCell>
                            <TableCell>{lead.source}</TableCell>
                            <TableCell>
                              {format(new Date(lead.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}