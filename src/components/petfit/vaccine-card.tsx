"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Syringe, CheckCircle2, Clock, AlertTriangle, Plus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VaccineCardProps {
  petData: any
}

interface Vaccine {
  id: string
  name: string
  description: string
  ageRecommendation: string
  frequency: string
  applied: boolean
  lastDate?: string
  nextDate?: string
}

export function VaccineCard({ petData }: VaccineCardProps) {
  const isDog = petData.species === "dog"

  const initialDogVaccines: Vaccine[] = [
    {
      id: "v8v10",
      name: "V8 ou V10 (Polivalente)",
      description: "Protege contra cinomose, parvovirose, hepatite, leptospirose, parainfluenza, coronavírus",
      ageRecommendation: "6-8 semanas (1ª dose)",
      frequency: "Anual",
      applied: false
    },
    {
      id: "raiva",
      name: "Antirrábica",
      description: "Proteção contra raiva",
      ageRecommendation: "12-16 semanas",
      frequency: "Anual",
      applied: false
    },
    {
      id: "giardia",
      name: "Giárdia",
      description: "Proteção contra giardíase",
      ageRecommendation: "8 semanas",
      frequency: "Anual",
      applied: false
    },
    {
      id: "tosse",
      name: "Tosse dos Canis (Bordetella)",
      description: "Proteção contra traqueobronquite infecciosa",
      ageRecommendation: "8 semanas",
      frequency: "Anual",
      applied: false
    },
    {
      id: "leish",
      name: "Leishmaniose",
      description: "Proteção contra leishmaniose visceral",
      ageRecommendation: "4 meses",
      frequency: "Anual",
      applied: false
    }
  ]

  const initialCatVaccines: Vaccine[] = [
    {
      id: "v3v4v5",
      name: "V3, V4 ou V5 (Polivalente)",
      description: "Protege contra rinotraqueíte, calicivirose, panleucopenia, clamidiose, leucemia",
      ageRecommendation: "6-8 semanas (1ª dose)",
      frequency: "Anual",
      applied: false
    },
    {
      id: "raiva",
      name: "Antirrábica",
      description: "Proteção contra raiva",
      ageRecommendation: "12-16 semanas",
      frequency: "Anual",
      applied: false
    },
    {
      id: "felv",
      name: "FeLV (Leucemia Felina)",
      description: "Proteção contra leucemia felina",
      ageRecommendation: "8 semanas",
      frequency: "Anual",
      applied: false
    }
  ]

  const [vaccines, setVaccines] = useState<Vaccine[]>(isDog ? initialDogVaccines : initialCatVaccines)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null)
  const [vaccineDate, setVaccineDate] = useState("")

  const toggleVaccine = (id: string) => {
    setSelectedVaccine(id)
    setIsAddDialogOpen(true)
  }

  const saveVaccineDate = () => {
    if (selectedVaccine && vaccineDate) {
      setVaccines(vaccines.map(v => {
        if (v.id === selectedVaccine) {
          const lastDate = new Date(vaccineDate)
          const nextDate = new Date(lastDate)
          nextDate.setFullYear(nextDate.getFullYear() + 1)
          
          return {
            ...v,
            applied: true,
            lastDate: lastDate.toLocaleDateString('pt-BR'),
            nextDate: nextDate.toLocaleDateString('pt-BR')
          }
        }
        return v
      }))
      setIsAddDialogOpen(false)
      setVaccineDate("")
      setSelectedVaccine(null)
    }
  }

  const appliedCount = vaccines.filter(v => v.applied).length
  const totalCount = vaccines.length
  const progress = (appliedCount / totalCount) * 100

  // Verificar vacinas próximas do vencimento (30 dias)
  const upcomingVaccines = vaccines.filter(v => {
    if (!v.nextDate) return false
    const next = new Date(v.nextDate.split('/').reverse().join('-'))
    const today = new Date()
    const diffDays = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  })

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {upcomingVaccines.length > 0 && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Atenção!</strong> {upcomingVaccines.length} vacina(s) próxima(s) do vencimento nos próximos 30 dias.
          </AlertDescription>
        </Alert>
      )}

      {/* Card Principal */}
      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="w-6 h-6 text-purple-600" />
            Carteira de Vacinas Digital
          </CardTitle>
          <CardDescription>Controle completo das vacinas de {petData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progresso da Vacinação</span>
              <span className="font-semibold text-purple-600">{appliedCount} de {totalCount} aplicadas</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Lista de Vacinas */}
          <div className="space-y-3">
            {vaccines.map((vaccine) => (
              <div 
                key={vaccine.id} 
                className={`border rounded-lg p-4 transition-all ${
                  vaccine.applied 
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={vaccine.applied}
                    onCheckedChange={() => !vaccine.applied && toggleVaccine(vaccine.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {vaccine.name}
                          {vaccine.applied && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{vaccine.description}</p>
                      </div>
                      <Badge variant={vaccine.applied ? "default" : "secondary"} className="flex-shrink-0">
                        {vaccine.frequency}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Idade: {vaccine.ageRecommendation}</span>
                      </div>
                      {vaccine.applied && vaccine.lastDate && (
                        <>
                          <div className="text-green-600 dark:text-green-400">
                            Última: {vaccine.lastDate}
                          </div>
                          <div className="text-purple-600 dark:text-purple-400">
                            Próxima: {vaccine.nextDate}
                          </div>
                        </>
                      )}
                    </div>

                    {!vaccine.applied && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleVaccine(vaccine.id)}
                        className="mt-2"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Registrar Aplicação
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-lg">💉 Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Filhotes precisam de múltiplas doses (geralmente 3-4 doses com intervalo de 21-30 dias)</p>
          <p>✓ Mantenha o cartão de vacinação sempre atualizado</p>
          <p>✓ Vacinas devem ser aplicadas por veterinário</p>
          <p>✓ Após vacinação, evite banhos por 7 dias</p>
          <p>✓ Reações leves (sonolência, falta de apetite) são normais nas primeiras 24h</p>
          <p>✓ Consulte o veterinário se houver reações graves</p>
        </CardContent>
      </Card>

      {/* Dialog para Registrar Data */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Vacinação</DialogTitle>
            <DialogDescription>
              Informe a data em que a vacina foi aplicada
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="vaccineDate">Data da Aplicação</Label>
              <Input
                id="vaccineDate"
                type="date"
                value={vaccineDate}
                onChange={(e) => setVaccineDate(e.target.value)}
              />
            </div>
            <Button onClick={saveVaccineDate} className="w-full">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
