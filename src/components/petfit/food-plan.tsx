"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Clock, AlertCircle, ChefHat, Apple, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FoodPlanProps {
  petData: any
}

export function FoodPlan({ petData }: FoodPlanProps) {
  // Cálculo da quantidade diária de ração
  const getDailyFood = () => {
    const baseAmounts: any = {
      dog: { mini: 60, small: 120, medium: 250, large: 400, giant: 600 },
      cat: { mini: 40, small: 60, medium: 80, large: 100, giant: 120 }
    }
    return baseAmounts[petData.species]?.[petData.size] || 150
  }

  const dailyAmount = getDailyFood()
  const mealsPerDay = petData.size === "mini" || petData.size === "small" ? 3 : 2
  const amountPerMeal = Math.round(dailyAmount / mealsPerDay)

  // Tipo de ração recomendado
  const getFoodType = () => {
    if (petData.age === "puppy") return "Filhote (Puppy/Kitten)"
    if (petData.age === "senior") return "Sênior (7+ anos)"
    if (petData.size === "mini" || petData.size === "small") return "Raças Pequenas"
    if (petData.size === "giant") return "Raças Gigantes"
    return "Adulto Premium"
  }

  // Horários sugeridos
  const getMealTimes = () => {
    if (mealsPerDay === 3) {
      return ["07:00", "13:00", "19:00"]
    }
    return ["08:00", "18:00"]
  }

  const mealTimes = getMealTimes()

  // Alimentos proibidos
  const forbiddenFoods = [
    { name: "Chocolate", danger: "Altamente tóxico" },
    { name: "Cebola e Alho", danger: "Danifica glóbulos vermelhos" },
    { name: "Uva e Passas", danger: "Insuficiência renal" },
    { name: "Abacate", danger: "Tóxico para pets" },
    { name: "Café e Chá", danger: "Estimulante perigoso" },
    { name: "Álcool", danger: "Extremamente tóxico" },
    { name: "Ossos Cozidos", danger: "Risco de perfuração" },
    { name: "Massa Crua", danger: "Fermentação no estômago" },
    { name: "Nozes de Macadâmia", danger: "Toxicidade neurológica" },
    { name: "Xilitol (adoçante)", danger: "Hipoglicemia severa" }
  ]

  // Receitas caseiras
  const healthyRecipes = [
    {
      name: "Frango com Batata Doce",
      ingredients: ["200g peito de frango cozido", "100g batata doce cozida", "50g cenoura cozida", "1 colher de azeite"],
      instructions: "Cozinhe todos os ingredientes sem sal e temperos. Desfie o frango e amasse os legumes. Misture tudo."
    },
    {
      name: "Carne com Arroz Integral",
      ingredients: ["200g carne moída magra", "100g arroz integral cozido", "50g abóbora cozida", "1 colher de óleo de coco"],
      instructions: "Cozinhe a carne sem temperos. Misture com arroz e abóbora amassada. Adicione óleo de coco."
    },
    {
      name: "Peixe com Legumes",
      ingredients: ["200g filé de peixe (tilápia/merluza)", "100g batata cozida", "50g brócolis cozido", "1 colher de azeite"],
      instructions: "Cozinhe o peixe no vapor. Amasse batata e brócolis. Misture tudo com azeite."
    }
  ]

  return (
    <div className="space-y-6">
      {/* Alerta Importante */}
      <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Este plano é uma orientação geral. Consulte sempre um veterinário para um plano alimentar personalizado.
        </AlertDescription>
      </Alert>

      {/* Plano Alimentar Principal */}
      <Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-600" />
            Plano Alimentar Personalizado
          </CardTitle>
          <CardDescription>Baseado nas características de {petData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quantidade Diária */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quantidade Diária</p>
              <p className="text-3xl font-bold text-orange-600">{dailyAmount}g</p>
              <p className="text-xs text-gray-500 mt-1">de ração seca</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Refeições por Dia</p>
              <p className="text-3xl font-bold text-green-600">{mealsPerDay}x</p>
              <p className="text-xs text-gray-500 mt-1">{amountPerMeal}g por refeição</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tipo Recomendado</p>
              <p className="text-lg font-bold text-blue-600">{getFoodType()}</p>
              <Badge className="mt-2" variant="secondary">Premium/Super Premium</Badge>
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Horários Ideais de Alimentação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mealTimes.map((time, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Refeição {index + 1}</p>
                  <p className="text-2xl font-bold text-orange-600">{time}</p>
                  <p className="text-xs text-gray-500 mt-1">{amountPerMeal}g</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas de Alimentação */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200">💡 Dicas Importantes</h3>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>✓ Sempre deixe água fresca e limpa disponível</li>
              <li>✓ Petiscos não devem ultrapassar 10% da dieta diária</li>
              <li>✓ Evite alimentar logo após exercícios intensos</li>
              <li>✓ Mantenha os horários regulares das refeições</li>
              <li>✓ Guarde a ração em local seco e fechado</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Receitas e Alimentos Proibidos */}
      <Tabs defaultValue="recipes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recipes">
            <ChefHat className="w-4 h-4 mr-2" />
            Receitas Caseiras
          </TabsTrigger>
          <TabsTrigger value="forbidden">
            <XCircle className="w-4 h-4 mr-2" />
            Alimentos Proibidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipes" className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Receitas caseiras devem ser usadas ocasionalmente e com orientação veterinária. Não substitua a ração completa.
            </AlertDescription>
          </Alert>
          {healthyRecipes.map((recipe, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Ingredientes:</h4>
                  <ul className="text-sm space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>• {ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Modo de Preparo:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{recipe.instructions}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="forbidden" className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              NUNCA ofereça estes alimentos ao seu pet. Podem causar intoxicação grave ou morte.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {forbiddenFoods.map((food, index) => (
              <Card key={index} className="border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-600">{food.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{food.danger}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
