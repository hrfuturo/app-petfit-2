"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Minus, Plus, Scale, AlertTriangle, Target, Award } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WeightControlProps {
  petData: any
}

export function WeightControl({ petData }: WeightControlProps) {
  const [weightHistory, setWeightHistory] = useState<any[]>([])
  const [newWeight, setNewWeight] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (petData?.id) {
      loadWeightHistory()
    }
  }, [petData?.id])

  const loadWeightHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('weight_records')
        .select('*')
        .eq('pet_id', petData.id)
        .order('date', { ascending: true })

      if (error) throw error

      const formattedData = data?.map(record => ({
        date: new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        weight: parseFloat(record.weight),
        fullDate: record.date
      })) || []

      setWeightHistory(formattedData)
    } catch (error) {
      console.error('Error loading weight history:', error)
    }
  }

  // Cálculo do peso ideal baseado em porte e espécie
  const getIdealWeight = () => {
    const ranges: any = {
      dog: {
        small: { min: 5, max: 10 },
        medium: { min: 10, max: 25 },
        large: { min: 25, max: 45 }
      },
      cat: {
        small: { min: 3, max: 4 },
        medium: { min: 4, max: 6 },
        large: { min: 6, max: 8 }
      }
    }
    return ranges[petData.species]?.[petData.size] || { min: 10, max: 15 }
  }

  const idealWeight = getIdealWeight()
  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || petData.weight || 0
  const weightDiff = weightHistory.length > 1 ? currentWeight - weightHistory[0]?.weight : 0
  const isOverweight = currentWeight > idealWeight.max
  const isUnderweight = currentWeight < idealWeight.min
  const progressPercentage = ((currentWeight - idealWeight.min) / (idealWeight.max - idealWeight.min)) * 100

  const addWeight = async () => {
    if (!newWeight || loading) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('weight_records')
        .insert([{
          pet_id: petData.id,
          weight: parseFloat(newWeight),
          date: new Date().toISOString().split('T')[0]
        }])

      if (error) throw error

      await loadWeightHistory()
      setNewWeight("")
    } catch (error) {
      console.error('Error adding weight:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Alerta de Peso */}
      {(isOverweight || isUnderweight) && (
        <Alert className="border-4 border-red-500 bg-gradient-to-r from-red-100 to-orange-100 shadow-2xl">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <AlertDescription className="text-lg font-bold text-red-900">
            {isOverweight && `⚠️ Atenção! ${petData.name} está acima do peso ideal. Consulte um veterinário para ajustar a alimentação.`}
            {isUnderweight && `⚠️ Atenção! ${petData.name} está abaixo do peso ideal. Consulte um veterinário para avaliação.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Card Principal - Peso Atual */}
      <Card className="border-4 border-blue-400 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl font-black">
            <Scale className="w-8 h-8" />
            ⚖️ Controle de Peso
          </CardTitle>
          <CardDescription className="text-white/90 text-lg font-semibold">Acompanhe a evolução do peso do seu pet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Peso Atual vs Ideal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-6 rounded-2xl text-center shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-sm font-bold text-white/90 mb-2">Peso Atual</p>
              <p className="text-4xl font-black text-white drop-shadow-lg">{currentWeight.toFixed(1)} kg</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-400 p-6 rounded-2xl text-center shadow-xl transform hover:scale-105 transition-all duration-300">
              <Target className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm font-bold text-white/90 mb-2">Peso Ideal</p>
              <p className="text-4xl font-black text-white drop-shadow-lg">{idealWeight.min}-{idealWeight.max} kg</p>
            </div>
            <div className={`p-6 rounded-2xl text-center shadow-xl transform hover:scale-105 transition-all duration-300 ${
              weightDiff > 0 
                ? 'bg-gradient-to-br from-orange-500 to-red-400' 
                : weightDiff < 0 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-400' 
                : 'bg-gradient-to-br from-gray-500 to-gray-400'
            }`}>
              <p className="text-sm font-bold text-white/90 mb-2">Variação</p>
              <div className="flex items-center justify-center gap-2">
                {weightDiff > 0 ? (
                  <TrendingUp className="w-6 h-6 text-white" />
                ) : weightDiff < 0 ? (
                  <TrendingDown className="w-6 h-6 text-white" />
                ) : (
                  <Minus className="w-6 h-6 text-white" />
                )}
                <p className="text-4xl font-black text-white drop-shadow-lg">
                  {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-3 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-red-600">⬇️ Abaixo</span>
              <span className="text-green-600">✅ Ideal</span>
              <span className="text-orange-600">⬆️ Acima</span>
            </div>
            <Progress value={progressPercentage} className="h-4 bg-gray-200" />
          </div>

          {/* Adicionar Novo Peso */}
          <div className="flex gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl">
            <div className="flex-1">
              <Label htmlFor="newWeight" className="text-lg font-bold mb-2 block">📊 Registrar novo peso (kg)</Label>
              <Input
                id="newWeight"
                type="number"
                step="0.1"
                placeholder="Ex: 13.5"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="border-2 border-blue-300 text-lg"
              />
            </div>
            <Button 
              onClick={addWeight} 
              disabled={loading}
              className="mt-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-6 shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              {loading ? "Salvando..." : "Adicionar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Evolução */}
      {weightHistory.length > 0 && (
        <Card className="border-4 border-purple-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-black">📈 Evolução do Peso</CardTitle>
            <CardDescription className="text-white/90 text-lg font-semibold">Histórico dos últimos registros</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis domain={[idealWeight.min - 2, idealWeight.max + 2]} stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={4} dot={{ fill: '#8b5cf6', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Dicas */}
      <Card className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 border-4 border-orange-500 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-8 h-8" />
            💡 Dicas para Manter o Peso Ideal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-white">
          <p className="text-lg font-bold">✅ Pese seu pet semanalmente, sempre no mesmo horário</p>
          <p className="text-lg font-bold">✅ Ajuste a quantidade de ração conforme orientação veterinária</p>
          <p className="text-lg font-bold">✅ Evite petiscos em excesso (máximo 10% da dieta diária)</p>
          <p className="text-lg font-bold">✅ Mantenha exercícios regulares adequados ao porte e idade</p>
          <p className="text-lg font-bold">✅ Consulte o veterinário se houver variação brusca de peso</p>
        </CardContent>
      </Card>
    </div>
  )
}
