"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Phone, MapPin, Clock, Heart, Zap, Droplets, Thermometer, Pill, ExternalLink } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function EmergencyArea() {
  const emergencies = [
    {
      id: "1",
      title: "Envenenamento",
      icon: Pill,
      severity: "critical",
      symptoms: ["Vômitos intensos", "Convulsões", "Salivação excessiva", "Tremores", "Dificuldade respiratória"],
      actions: [
        "NÃO induza vômito sem orientação veterinária",
        "Ligue IMEDIATAMENTE para veterinário ou centro de controle de intoxicações",
        "Se possível, identifique a substância ingerida",
        "Leve a embalagem do produto ao veterinário",
        "Mantenha o pet aquecido e calmo"
      ]
    },
    {
      id: "2",
      title: "Dificuldade Respiratória",
      icon: Zap,
      severity: "critical",
      symptoms: ["Respiração ofegante", "Língua/gengivas azuladas", "Tosse intensa", "Engasgos", "Desmaio"],
      actions: [
        "Mantenha o pet calmo e em local ventilado",
        "Verifique se há obstrução na boca/garganta",
        "NÃO force nada pela garganta",
        "Procure veterinário IMEDIATAMENTE",
        "Se possível, aplique oxigênio"
      ]
    },
    {
      id: "3",
      title: "Hemorragia Intensa",
      icon: Droplets,
      severity: "critical",
      symptoms: ["Sangramento que não para", "Feridas profundas", "Sangue nas fezes/urina", "Palidez", "Fraqueza"],
      actions: [
        "Aplique pressão direta no ferimento com pano limpo",
        "Mantenha pressão por 5-10 minutos",
        "NÃO remova o pano se encharcar, coloque outro por cima",
        "Eleve o membro ferido se possível",
        "Vá IMEDIATAMENTE ao veterinário"
      ]
    },
    {
      id: "4",
      title: "Convulsões",
      icon: Zap,
      severity: "critical",
      symptoms: ["Tremores descontrolados", "Perda de consciência", "Salivação", "Movimentos involuntários", "Desorientação"],
      actions: [
        "Afaste objetos que possam machucar o pet",
        "NÃO coloque mão na boca do animal",
        "Cronometre a duração da convulsão",
        "Mantenha ambiente escuro e silencioso",
        "Procure veterinário após a convulsão cessar"
      ]
    },
    {
      id: "5",
      title: "Insolação/Hipertermia",
      icon: Thermometer,
      severity: "high",
      symptoms: ["Ofegância excessiva", "Temperatura corporal elevada", "Vômitos", "Fraqueza", "Gengivas vermelhas"],
      actions: [
        "Leve o pet para local fresco e ventilado",
        "Aplique água FRESCA (não gelada) no corpo",
        "Ofereça água fresca para beber",
        "Use ventilador ou ar condicionado",
        "Procure veterinário se sintomas persistirem"
      ]
    },
    {
      id: "6",
      title: "Fraturas/Traumas",
      icon: AlertCircle,
      severity: "high",
      symptoms: ["Dor intensa", "Inchaço", "Membro em posição anormal", "Incapacidade de andar", "Choro/gemidos"],
      actions: [
        "NÃO tente reposicionar ossos",
        "Imobilize o membro com cuidado",
        "Minimize movimentos do pet",
        "Transporte com cuidado (use tábua/maca improvisada)",
        "Vá ao veterinário imediatamente"
      ]
    }
  ]

  const commonIssues = [
    {
      title: "Vômito Isolado",
      severity: "low",
      advice: "Se vomitou apenas uma vez e está ativo, observe. Se repetir ou houver outros sintomas, consulte veterinário."
    },
    {
      title: "Diarreia Leve",
      severity: "low",
      advice: "Ofereça água, jejum de 12h, depois dieta leve (frango cozido + arroz). Se persistir por 24h, consulte veterinário."
    },
    {
      title: "Coceira/Alergia",
      severity: "low",
      advice: "Banho com shampoo hipoalergênico pode ajudar. Se houver feridas ou coceira intensa, consulte veterinário."
    },
    {
      title: "Perda de Apetite",
      severity: "medium",
      advice: "Se recusar comida por mais de 24h ou apresentar outros sintomas, consulte veterinário."
    }
  ]

  const severityColors = {
    critical: "border-red-500 bg-red-50 dark:bg-red-950",
    high: "border-orange-500 bg-orange-50 dark:bg-orange-950",
    medium: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
    low: "border-green-500 bg-green-50 dark:bg-green-950"
  }

  const severityLabels = {
    critical: "EMERGÊNCIA",
    high: "URGENTE",
    medium: "ATENÇÃO",
    low: "OBSERVAR"
  }

  return (
    <div className="space-y-6">
      {/* Alerta Principal */}
      <Alert variant="destructive" className="border-2">
        <AlertCircle className="h-5 w-5" />
        <AlertDescription className="text-base">
          <strong>EM CASO DE EMERGÊNCIA:</strong> Ligue imediatamente para seu veterinário ou clínica de emergência 24h. 
          Esta área é apenas informativa e NÃO substitui atendimento profissional.
        </AlertDescription>
      </Alert>

      {/* Contatos de Emergência */}
      <Card className="border-2 border-red-500">
        <CardHeader className="bg-red-50 dark:bg-red-950">
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <Phone className="w-6 h-6" />
            Contatos de Emergência
          </CardTitle>
          <CardDescription>Tenha sempre esses números salvos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                Seu Veterinário
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cadastre o número do seu veterinário de confiança
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Adicionar Contato
              </Button>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                Clínica 24h Mais Próxima
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Buscar clínicas veterinárias de emergência
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Buscar no Mapa
              </Button>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Centro de Controle de Intoxicações Animal
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Em caso de envenenamento, consulte centros especializados da sua região
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Situações de Emergência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Situações de Emergência
          </CardTitle>
          <CardDescription>O que fazer em cada situação crítica</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            {emergencies.map((emergency) => {
              const Icon = emergency.icon
              return (
                <AccordionItem 
                  key={emergency.id} 
                  value={emergency.id}
                  className={`border-2 rounded-lg px-4 ${severityColors[emergency.severity as keyof typeof severityColors]}`}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-red-600" />
                      <span className="font-semibold">{emergency.title}</span>
                      <Badge variant="destructive" className="ml-auto mr-2">
                        {severityLabels[emergency.severity as keyof typeof severityLabels]}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">🚨 Sintomas:</h4>
                      <ul className="space-y-1 text-sm">
                        {emergency.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">✅ O que fazer:</h4>
                      <ol className="space-y-2 text-sm">
                        {emergency.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold text-red-600">{i + 1}.</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Problemas Comuns */}
      <Card>
        <CardHeader>
          <CardTitle>Problemas Comuns (Não Emergenciais)</CardTitle>
          <CardDescription>Situações que requerem observação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonIssues.map((issue, index) => (
              <div 
                key={index} 
                className={`border-2 rounded-lg p-4 space-y-2 ${severityColors[issue.severity as keyof typeof severityColors]}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{issue.title}</h4>
                  <Badge variant="outline">
                    {severityLabels[issue.severity as keyof typeof severityLabels]}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{issue.advice}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Alerta */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-lg text-red-700 dark:text-red-300">
            ⚠️ Quando Procurar Veterinário IMEDIATAMENTE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Dificuldade para respirar ou respiração muito rápida</p>
          <p>• Convulsões ou tremores descontrolados</p>
          <p>• Sangramento que não para após 5 minutos de pressão</p>
          <p>• Vômitos ou diarreia com sangue</p>
          <p>• Incapacidade de urinar ou defecar</p>
          <p>• Ingestão de substâncias tóxicas</p>
          <p>• Trauma grave (atropelamento, queda de altura)</p>
          <p>• Abdômen inchado e rígido (possível torção gástrica)</p>
          <p>• Perda de consciência ou desmaio</p>
          <p>• Temperatura corporal muito alta (&gt;40°C) ou muito baixa (&lt;37°C)</p>
        </CardContent>
      </Card>
    </div>
  )
}
