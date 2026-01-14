"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Plus, Pill, Scissors, Stethoscope, Bug, Bell } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface HealthAgendaProps {
  petData: any
}

interface HealthEvent {
  id: string
  type: "vermifugo" | "antipulgas" | "consulta" | "banho" | "tosa" | "outro"
  title: string
  date: string
  notes?: string
  completed: boolean
}

export function HealthAgenda({ petData }: HealthAgendaProps) {
  const [events, setEvents] = useState<HealthEvent[]>([
    {
      id: "1",
      type: "vermifugo",
      title: "Vermífugo",
      date: "2024-02-15",
      notes: "Dose conforme peso",
      completed: false
    },
    {
      id: "2",
      type: "antipulgas",
      title: "Antipulgas e Carrapatos",
      date: "2024-02-10",
      completed: false
    },
    {
      id: "3",
      type: "banho",
      title: "Banho e Tosa",
      date: "2024-02-20",
      completed: false
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    type: "consulta" as const,
    title: "",
    date: "",
    notes: ""
  })

  const typeIcons: Record<string, any> = {
    vermifugo: Pill,
    antipulgas: Bug,
    consulta: Stethoscope,
    banho: Scissors,
    tosa: Scissors,
    outro: Calendar
  }

  const typeColors: Record<string, string> = {
    vermifugo: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    antipulgas: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    consulta: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    banho: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    tosa: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    outro: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const typeLabels: Record<string, string> = {
    vermifugo: "Vermífugo",
    antipulgas: "Antipulgas",
    consulta: "Consulta",
    banho: "Banho",
    tosa: "Tosa",
    outro: "Outro"
  }

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: HealthEvent = {
        id: Date.now().toString(),
        type: newEvent.type,
        title: newEvent.title,
        date: newEvent.date,
        notes: newEvent.notes,
        completed: false
      }
      setEvents([...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      setNewEvent({ type: "consulta", title: "", date: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  const toggleComplete = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e))
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  // Separar eventos por status
  const upcomingEvents = events.filter(e => !e.completed && new Date(e.date) >= new Date())
  const pastEvents = events.filter(e => !e.completed && new Date(e.date) < new Date())
  const completedEvents = events.filter(e => e.completed)

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Agenda de Saúde
              </CardTitle>
              <CardDescription>Controle de cuidados e consultas de {petData.name}</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Evento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Evento</DialogTitle>
                  <DialogDescription>Registre um novo compromisso de saúde</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vermifugo">Vermífugo</SelectItem>
                        <SelectItem value="antipulgas">Antipulgas</SelectItem>
                        <SelectItem value="consulta">Consulta Veterinária</SelectItem>
                        <SelectItem value="banho">Banho</SelectItem>
                        <SelectItem value="tosa">Tosa</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Consulta de rotina"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Adicione detalhes importantes..."
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                    />
                  </div>
                  <Button onClick={addEvent} className="w-full">
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Eventos Atrasados */}
          {pastEvents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-600">Atrasados ({pastEvents.length})</h3>
              </div>
              <div className="space-y-2">
                {pastEvents.map((event) => {
                  const Icon = typeIcons[event.type]
                  return (
                    <div key={event.id} className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={event.completed}
                          onCheckedChange={() => toggleComplete(event.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <h4 className="font-semibold">{event.title}</h4>
                            </div>
                            <Badge className={typeColors[event.type]}>
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </p>
                          {event.notes && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{event.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Próximos Eventos */}
          {upcomingEvents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Próximos Eventos ({upcomingEvents.length})</h3>
              <div className="space-y-2">
                {upcomingEvents.map((event) => {
                  const Icon = typeIcons[event.type]
                  return (
                    <div key={event.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={event.completed}
                          onCheckedChange={() => toggleComplete(event.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <h4 className="font-semibold">{event.title}</h4>
                            </div>
                            <Badge className={typeColors[event.type]}>
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </p>
                          {event.notes && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{event.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Eventos Concluídos */}
          {completedEvents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">Concluídos ({completedEvents.length})</h3>
              <div className="space-y-2">
                {completedEvents.map((event) => {
                  const Icon = typeIcons[event.type]
                  return (
                    <div key={event.id} className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 rounded-lg p-4 opacity-75">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={event.completed}
                          onCheckedChange={() => toggleComplete(event.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <h4 className="font-semibold line-through">{event.title}</h4>
                            </div>
                            <Badge className={typeColors[event.type]}>
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum evento agendado</p>
              <p className="text-sm">Clique em "Novo Evento" para começar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lembretes Automáticos */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Frequência Recomendada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Vermífugo:</strong> A cada 3-6 meses (conforme orientação veterinária)</p>
          <p><strong>Antipulgas/Carrapatos:</strong> Mensal (conforme produto)</p>
          <p><strong>Consulta de Rotina:</strong> Anual (sênior: semestral)</p>
          <p><strong>Banho:</strong> A cada 15-30 dias (conforme necessidade)</p>
          <p><strong>Tosa:</strong> A cada 1-3 meses (conforme raça)</p>
        </CardContent>
      </Card>
    </div>
  )
}
