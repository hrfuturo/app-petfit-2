"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Camera, FileText, AlertCircle, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PetDiaryProps {
  petData: any
}

interface DiaryEntry {
  id: string
  date: string
  type: "comportamento" | "saude" | "foto" | "outro"
  title: string
  content: string
  severity?: "normal" | "atencao" | "urgente"
}

export function PetDiary({ petData }: PetDiaryProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: "2024-02-01",
      type: "comportamento",
      title: "Muito animado hoje",
      content: "Brincou bastante no parque, interagiu bem com outros pets",
      severity: "normal"
    },
    {
      id: "2",
      date: "2024-02-05",
      type: "saude",
      title: "Vômito pela manhã",
      content: "Vomitou uma vez após comer muito rápido. Observar nas próximas refeições.",
      severity: "atencao"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEntry, setNewEntry] = useState({
    type: "comportamento" as const,
    title: "",
    content: "",
    severity: "normal" as const
  })

  const typeColors: Record<string, string> = {
    comportamento: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    saude: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    foto: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    outro: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const typeLabels: Record<string, string> = {
    comportamento: "Comportamento",
    saude: "Saúde",
    foto: "Foto/Memória",
    outro: "Outro"
  }

  const severityColors: Record<string, string> = {
    normal: "border-green-200 dark:border-green-800",
    atencao: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950",
    urgente: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950"
  }

  const severityLabels: Record<string, string> = {
    normal: "Normal",
    atencao: "Atenção",
    urgente: "Urgente"
  }

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: newEntry.type,
        title: newEntry.title,
        content: newEntry.content,
        severity: newEntry.severity
      }
      setEntries([entry, ...entries])
      setNewEntry({ type: "comportamento", title: "", content: "", severity: "normal" })
      setIsAddDialogOpen(false)
    }
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  // Agrupar por mês
  const groupedEntries = entries.reduce((acc, entry) => {
    const monthYear = new Date(entry.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    if (!acc[monthYear]) {
      acc[monthYear] = []
    }
    acc[monthYear].push(entry)
    return acc
  }, {} as Record<string, DiaryEntry[]>)

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <Card className="border-2 border-pink-200 dark:border-pink-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-pink-600" />
                Diário de {petData.name}
              </CardTitle>
              <CardDescription>Registre comportamentos, sintomas e momentos especiais</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Entrada
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Entrada no Diário</DialogTitle>
                  <DialogDescription>Registre observações sobre {petData.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Select value={newEntry.type} onValueChange={(value: any) => setNewEntry({ ...newEntry, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comportamento">Comportamento</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="foto">Foto/Memória</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Nível</Label>
                      <Select value={newEntry.severity} onValueChange={(value: any) => setNewEntry({ ...newEntry, severity: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="atencao">Atenção</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Tosse persistente, Brincou muito, Novo truque..."
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Descrição Detalhada</Label>
                    <Textarea
                      id="content"
                      placeholder="Descreva o que aconteceu, sintomas observados, comportamentos anormais..."
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                      rows={6}
                    />
                  </div>
                  <Button onClick={addEntry} className="w-full">
                    Salvar Entrada
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Nenhuma entrada ainda</p>
              <p className="text-sm">Comece a registrar o dia a dia de {petData.name}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
                <div key={monthYear} className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 capitalize">
                    {monthYear}
                  </h3>
                  <div className="space-y-3">
                    {monthEntries.map((entry) => (
                      <Card key={entry.id} className={`${severityColors[entry.severity || 'normal']}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={typeColors[entry.type]}>
                                  {typeLabels[entry.type]}
                                </Badge>
                                {entry.severity && entry.severity !== "normal" && (
                                  <Badge variant="outline" className={
                                    entry.severity === "urgente" 
                                      ? "border-red-500 text-red-700 dark:text-red-300" 
                                      : "border-orange-500 text-orange-700 dark:text-orange-300"
                                  }>
                                    {severityLabels[entry.severity]}
                                  </Badge>
                                )}
                                <span className="text-sm text-gray-500">
                                  {new Date(entry.date).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <h4 className="font-semibold text-lg">{entry.title}</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {entry.content}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEntry(entry.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 border-pink-200 dark:border-pink-800">
        <CardHeader>
          <CardTitle className="text-lg">📝 O que registrar no diário?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold text-red-600 mb-1">🚨 Sintomas de Saúde (Urgente/Atenção):</h4>
            <ul className="space-y-1 ml-4">
              <li>• Vômitos, diarreia, tosse, espirros</li>
              <li>• Perda de apetite ou sede excessiva</li>
              <li>• Letargia, apatia, comportamento estranho</li>
              <li>• Dificuldade para respirar ou andar</li>
              <li>• Feridas, coceiras, queda de pelo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-1">😊 Comportamentos (Normal):</h4>
            <ul className="space-y-1 ml-4">
              <li>• Novos truques aprendidos</li>
              <li>• Interações sociais positivas</li>
              <li>• Brincadeiras favoritas</li>
              <li>• Mudanças de humor ou rotina</li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 pt-2 border-t">
            💡 Dica: Mantenha registros detalhados. Isso ajuda o veterinário a identificar padrões e diagnosticar problemas mais rapidamente.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
