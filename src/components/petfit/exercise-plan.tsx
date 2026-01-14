"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Brain, Footprints, Play, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface ExercisePlanProps {
  petData: any
}

export function ExercisePlan({ petData }: ExercisePlanProps) {
  // Recomendações baseadas em espécie, porte e idade
  const getExerciseRecommendations = () => {
    const isDog = petData.species === "dog"
    const isPuppy = petData.age === "puppy"
    const isSenior = petData.age === "senior"
    const size = petData.size

    if (isDog) {
      if (isPuppy) {
        return {
          walk: { duration: "15-20 min", frequency: "3x ao dia", intensity: "Leve" },
          play: { duration: "20-30 min", frequency: "4-5x ao dia", type: "Brincadeiras curtas" },
          mental: { duration: "10-15 min", frequency: "2x ao dia", type: "Jogos de descoberta" }
        }
      } else if (isSenior) {
        return {
          walk: { duration: "20-30 min", frequency: "2x ao dia", intensity: "Leve a moderada" },
          play: { duration: "15-20 min", frequency: "2-3x ao dia", type: "Brincadeiras calmas" },
          mental: { duration: "15-20 min", frequency: "2x ao dia", type: "Jogos de memória" }
        }
      } else {
        // Adulto
        const durations: any = {
          mini: "20-30 min",
          small: "30-45 min",
          medium: "45-60 min",
          large: "60-90 min",
          giant: "45-60 min"
        }
        return {
          walk: { duration: durations[size] || "45 min", frequency: "2x ao dia", intensity: "Moderada a intensa" },
          play: { duration: "30-45 min", frequency: "2-3x ao dia", type: "Brincadeiras ativas" },
          mental: { duration: "15-20 min", frequency: "1-2x ao dia", type: "Jogos de inteligência" }
        }
      }
    } else {
      // Gato
      return {
        walk: { duration: "N/A", frequency: "N/A", intensity: "Gatos não precisam de passeios" },
        play: { duration: "20-30 min", frequency: "3-4x ao dia", type: "Caça simulada" },
        mental: { duration: "15-20 min", frequency: "2-3x ao dia", type: "Enriquecimento ambiental" }
      }
    }
  }

  const recommendations = getExerciseRecommendations()
  const isDog = petData.species === "dog"

  // Atividades específicas
  const activities = isDog ? [
    { name: "Caminhada", icon: Footprints, description: "Passeio em ritmo constante", benefits: "Saúde cardiovascular, socialização" },
    { name: "Corrida", icon: Activity, description: "Para raças ativas", benefits: "Queima de energia, condicionamento" },
    { name: "Buscar Bolinha", icon: Play, description: "Jogo clássico", benefits: "Exercício físico e mental" },
    { name: "Natação", icon: Activity, description: "Excelente para articulações", benefits: "Baixo impacto, fortalecimento" },
    { name: "Agility", icon: Activity, description: "Circuito de obstáculos", benefits: "Coordenação, obediência" },
    { name: "Esconde-esconde", icon: Brain, description: "Com petiscos ou brinquedos", benefits: "Estimulação mental, faro" }
  ] : [
    { name: "Varinha com Penas", icon: Play, description: "Simula caça de pássaros", benefits: "Instinto de caça, exercício" },
    { name: "Laser Pointer", icon: Play, description: "Perseguição de luz", benefits: "Agilidade, diversão" },
    { name: "Caixa de Papelão", icon: Brain, description: "Exploração e esconderijo", benefits: "Curiosidade, segurança" },
    { name: "Arranhador", icon: Activity, description: "Escalada e alongamento", benefits: "Unhas saudáveis, músculos" },
    { name: "Bolinhas e Ratinhos", icon: Play, description: "Caça simulada", benefits: "Instinto natural, exercício" },
    { name: "Prateleiras Altas", icon: Activity, description: "Ambiente vertical", benefits: "Escalada, território" }
  ]

  // Jogos mentais
  const mentalGames = isDog ? [
    "Esconder petiscos pela casa",
    "Brinquedos interativos (Kong, quebra-cabeças)",
    "Ensinar novos comandos",
    "Jogos de farejar",
    "Circuitos de obstáculos caseiros"
  ] : [
    "Caixas com buracos e petiscos dentro",
    "Brinquedos com catnip",
    "Túneis e esconderijos",
    "Comedouros interativos",
    "Janelas com vista para pássaros"
  ]

  return (
    <div className="space-y-6">
      {/* Alerta */}
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <Activity className="h-4 w-4" />
        <AlertDescription>
          Exercícios regulares são essenciais para a saúde física e mental do seu pet. Sempre respeite os limites de {petData.name}.
        </AlertDescription>
      </Alert>

      {/* Plano de Exercícios */}
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-600" />
            Plano de Exercícios Personalizado
          </CardTitle>
          <CardDescription>Recomendações para {petData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Caminhadas (apenas para cães) */}
          {isDog && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Footprints className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Caminhadas Diárias</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duração</p>
                  <p className="text-2xl font-bold text-green-600">{recommendations.walk.duration}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Frequência</p>
                  <p className="text-2xl font-bold text-green-600">{recommendations.walk.frequency}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Intensidade</p>
                  <p className="text-lg font-bold text-green-600">{recommendations.walk.intensity}</p>
                </div>
              </div>
            </div>
          )}

          {/* Brincadeiras */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Brincadeiras e Atividades</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duração</p>
                <p className="text-2xl font-bold text-blue-600">{recommendations.play.duration}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Frequência</p>
                <p className="text-2xl font-bold text-blue-600">{recommendations.play.frequency}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tipo</p>
                <p className="text-sm font-bold text-blue-600">{recommendations.play.type}</p>
              </div>
            </div>
          </div>

          {/* Exercícios Mentais */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Estimulação Mental</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duração</p>
                <p className="text-2xl font-bold text-purple-600">{recommendations.mental.duration}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Frequência</p>
                <p className="text-2xl font-bold text-purple-600">{recommendations.mental.frequency}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tipo</p>
                <p className="text-sm font-bold text-purple-600">{recommendations.mental.type}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atividades Recomendadas */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recomendadas</CardTitle>
          <CardDescription>Exercícios ideais para {petData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                  <activity.icon className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">{activity.name}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                <Badge variant="secondary" className="text-xs">{activity.benefits}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enriquecimento Mental */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Enriquecimento Ambiental
          </CardTitle>
          <CardDescription>Jogos mentais para estimular {petData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mentalGames.map((game, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span className="text-sm">{game}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lembretes */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-orange-600" />
            Lembretes Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Evite exercícios em horários de calor intenso</p>
          <p>✓ Sempre leve água fresca durante passeios</p>
          <p>✓ Respeite os sinais de cansaço do seu pet</p>
          <p>✓ Aumente a intensidade gradualmente</p>
          <p>✓ Pets idosos precisam de exercícios mais leves</p>
          {isDog && <p>✓ Use coleira e guia adequadas ao porte</p>}
        </CardContent>
      </Card>
    </div>
  )
}
