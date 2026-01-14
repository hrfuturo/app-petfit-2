"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Weight, Utensils, Activity, Syringe, Calendar, BookOpen, AlertCircle, MessageSquare, Plus, Sparkles, LogOut } from "lucide-react"
import { PetProfile } from "@/components/petfit/pet-profile"
import { WeightControl } from "@/components/petfit/weight-control"
import { FoodPlan } from "@/components/petfit/food-plan"
import { ExercisePlan } from "@/components/petfit/exercise-plan"
import { VaccineCard } from "@/components/petfit/vaccine-card"
import { HealthAgenda } from "@/components/petfit/health-agenda"
import { PetDiary } from "@/components/petfit/pet-diary"
import { EmergencyArea } from "@/components/petfit/emergency-area"
import { AIChat } from "@/components/petfit/ai-chat"

export default function PetFitPlus() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState<any[]>([])
  const [selectedPet, setSelectedPet] = useState<any>(null)
  const [showPetForm, setShowPetForm] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)
      await loadPets(user.id)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  const loadPets = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setPets(data || [])
      if (data && data.length > 0) {
        setSelectedPet(data[0])
      }
    } catch (error) {
      console.error('Error loading pets:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const handlePetCreated = async (petData: any) => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .insert([{
          user_id: user.id,
          name: petData.name,
          species: petData.species,
          breed: petData.breed,
          age: petData.age,
          size: petData.size,
          weight: petData.weight
        }])
        .select()
        .single()

      if (error) throw error

      await loadPets(user.id)
      setShowPetForm(false)
      setSelectedPet(data)
    } catch (error) {
      console.error('Error creating pet:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center">
        <div className="text-center space-y-4">
          <PawPrint className="w-20 h-20 text-white animate-bounce mx-auto" />
          <p className="text-2xl font-bold text-white">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!selectedPet || showPetForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4 animate-bounce">
                <PawPrint className="w-20 h-20 text-white drop-shadow-2xl" />
                <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
                  PetFit+
                </h1>
                <Sparkles className="w-16 h-16 text-yellow-300 drop-shadow-2xl" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                🐾 Saúde completa do seu pet em um só lugar! 🐾
              </p>
              <p className="text-xl text-white/90 max-w-xl drop-shadow-md">
                Controle peso, alimentação, exercícios, vacinas e muito mais com IA
              </p>
            </div>

            <Card className="w-full max-w-2xl shadow-2xl border-4 border-white/50 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-black">🐶 Cadastre seu Pet 🐱</CardTitle>
                <CardDescription className="text-white/90 text-lg">Vamos começar conhecendo seu melhor amigo!</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <PetProfile 
                  onComplete={handlePetCreated} 
                />
              </CardContent>
            </Card>

            {pets.length > 0 && (
              <Button
                onClick={() => setShowPetForm(false)}
                variant="outline"
                className="border-3 border-white text-white bg-white/20 hover:bg-white hover:text-purple-600 font-bold backdrop-blur-sm"
              >
                Voltar para meus pets
              </Button>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl">
              {[
                { icon: Weight, label: "Controle de Peso", gradient: "from-blue-500 to-cyan-400" },
                { icon: Utensils, label: "Alimentação", gradient: "from-orange-500 to-yellow-400" },
                { icon: Activity, label: "Exercícios", gradient: "from-green-500 to-emerald-400" },
                { icon: Syringe, label: "Vacinas", gradient: "from-purple-500 to-pink-400" },
              ].map((feature, i) => (
                <div key={i} className={`flex flex-col items-center gap-3 p-6 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-12 h-12 text-white drop-shadow-lg" />
                  <span className="text-sm font-bold text-center text-white drop-shadow-md">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-600 shadow-2xl sticky top-0 z-50 border-b-4 border-white/30">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <PawPrint className="w-10 h-10 text-white drop-shadow-lg" />
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-2">
                  PetFit+
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-white/90 drop-shadow-md">
                    🐾 {selectedPet?.name} • {selectedPet?.species === "dog" ? "🐶 Cão" : "🐱 Gato"} • {selectedPet?.breed}
                  </p>
                  {pets.length > 1 && (
                    <select
                      value={selectedPet?.id}
                      onChange={(e) => {
                        const pet = pets.find(p => p.id === e.target.value)
                        setSelectedPet(pet)
                      }}
                      className="text-xs bg-white/20 text-white border-2 border-white/50 rounded-lg px-2 py-1 font-bold backdrop-blur-sm"
                    >
                      {pets.map(pet => (
                        <option key={pet.id} value={pet.id} className="text-gray-900">
                          {pet.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowPetForm(true)}
                className="border-3 border-white text-white bg-white/20 hover:bg-white hover:text-purple-600 font-bold backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Novo Pet
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleLogout}
                className="border-3 border-white text-white bg-white/20 hover:bg-white hover:text-red-600 font-bold backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="weight" className="space-y-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-3 h-auto bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl border-2 border-white/50">
            <TabsTrigger 
              value="weight" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Weight className="w-5 h-5" />
              <span className="text-xs md:text-sm">Peso</span>
            </TabsTrigger>
            <TabsTrigger 
              value="food" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-yellow-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Utensils className="w-5 h-5" />
              <span className="text-xs md:text-sm">Alimentação</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exercise" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Activity className="w-5 h-5" />
              <span className="text-xs md:text-sm">Exercícios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vaccines" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Syringe className="w-5 h-5" />
              <span className="text-xs md:text-sm">Vacinas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-blue-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs md:text-sm">Agenda</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diary" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-rose-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs md:text-sm">Diário</span>
            </TabsTrigger>
            <TabsTrigger 
              value="emergency" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-orange-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-xs md:text-sm">Emergência</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-teal-400 data-[state=active]:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs md:text-sm">Chat IA</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <WeightControl petData={selectedPet} />
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            <FoodPlan petData={selectedPet} />
          </TabsContent>

          <TabsContent value="exercise" className="space-y-4">
            <ExercisePlan petData={selectedPet} />
          </TabsContent>

          <TabsContent value="vaccines" className="space-y-4">
            <VaccineCard petData={selectedPet} />
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <HealthAgenda petData={selectedPet} />
          </TabsContent>

          <TabsContent value="diary" className="space-y-4">
            <PetDiary petData={selectedPet} />
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <EmergencyArea />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <AIChat petData={selectedPet} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
