"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dog, Cat, Sparkles } from "lucide-react"

interface PetProfileProps {
  onComplete: (data: any) => void
}

export function PetProfile({ onComplete }: PetProfileProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    size: "",
    weight: ""
  })

  const dogBreeds = [
    "Labrador", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Pastor Alemão",
    "Rottweiler", "Yorkshire", "Boxer", "Dachshund", "Shih Tzu", "Pug", "Chihuahua",
    "Border Collie", "Husky Siberiano", "Doberman", "Schnauzer", "Cocker Spaniel",
    "Pitbull", "Maltês", "SRD (Sem Raça Definida)", "Outro"
  ]

  const catBreeds = [
    "Persa", "Siamês", "Maine Coon", "Bengal", "Ragdoll", "British Shorthair",
    "Sphynx", "Abissínio", "Scottish Fold", "Angorá", "Exótico", "Birmanês",
    "SRD (Sem Raça Definida)", "Outro"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.species && formData.breed && formData.age && formData.size) {
      onComplete(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome do Pet */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-bold">🐾 Nome do Pet</Label>
        <Input
          id="name"
          placeholder="Ex: Rex, Mimi, Thor..."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border-2 border-purple-300 focus:border-purple-500 text-lg"
        />
      </div>

      {/* Espécie */}
      <div className="space-y-3">
        <Label className="text-lg font-bold">🐶 Espécie 🐱</Label>
        <RadioGroup
          value={formData.species}
          onValueChange={(value) => setFormData({ ...formData, species: value, breed: "" })}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="dog" id="dog" className="peer sr-only" />
            <Label
              htmlFor="dog"
              className="flex flex-col items-center justify-center rounded-2xl border-4 border-orange-300 bg-gradient-to-br from-orange-100 to-yellow-100 p-8 hover:from-orange-200 hover:to-yellow-200 peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:from-orange-400 peer-data-[state=checked]:to-yellow-400 peer-data-[state=checked]:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <Dog className="w-16 h-16 mb-3 text-orange-700" />
              <span className="text-2xl font-black text-orange-900">Cão</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="cat" id="cat" className="peer sr-only" />
            <Label
              htmlFor="cat"
              className="flex flex-col items-center justify-center rounded-2xl border-4 border-pink-300 bg-gradient-to-br from-pink-100 to-purple-100 p-8 hover:from-pink-200 hover:to-purple-200 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:from-pink-400 peer-data-[state=checked]:to-purple-400 peer-data-[state=checked]:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <Cat className="w-16 h-16 mb-3 text-pink-700" />
              <span className="text-2xl font-black text-pink-900">Gato</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Raça */}
      {formData.species && (
        <div className="space-y-2">
          <Label htmlFor="breed" className="text-lg font-bold">🏆 Raça</Label>
          <Select value={formData.breed} onValueChange={(value) => setFormData({ ...formData, breed: value })}>
            <SelectTrigger className="border-2 border-purple-300 text-lg">
              <SelectValue placeholder="Selecione a raça" />
            </SelectTrigger>
            <SelectContent>
              {(formData.species === "dog" ? dogBreeds : catBreeds).map((breed) => (
                <SelectItem key={breed} value={breed} className="text-lg">
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Idade */}
      <div className="space-y-2">
        <Label htmlFor="age" className="text-lg font-bold">🎂 Idade</Label>
        <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
          <SelectTrigger className="border-2 border-purple-300 text-lg">
            <SelectValue placeholder="Selecione a idade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="puppy" className="text-lg">🍼 Filhote (0-1 ano)</SelectItem>
            <SelectItem value="young" className="text-lg">⚡ Jovem (1-3 anos)</SelectItem>
            <SelectItem value="adult" className="text-lg">💪 Adulto (3-7 anos)</SelectItem>
            <SelectItem value="senior" className="text-lg">👴 Sênior (7+ anos)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Porte */}
      <div className="space-y-2">
        <Label htmlFor="size" className="text-lg font-bold">📏 Porte</Label>
        <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
          <SelectTrigger className="border-2 border-purple-300 text-lg">
            <SelectValue placeholder="Selecione o porte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mini" className="text-lg">🐭 Mini (até 5kg)</SelectItem>
            <SelectItem value="small" className="text-lg">🐕 Pequeno (5-10kg)</SelectItem>
            <SelectItem value="medium" className="text-lg">🐶 Médio (10-25kg)</SelectItem>
            <SelectItem value="large" className="text-lg">🦮 Grande (25-45kg)</SelectItem>
            <SelectItem value="giant" className="text-lg">🐻 Gigante (45kg+)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Peso Atual */}
      <div className="space-y-2">
        <Label htmlFor="weight" className="text-lg font-bold">⚖️ Peso Atual (kg) - Opcional</Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          placeholder="Ex: 12.5"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="border-2 border-purple-300 focus:border-purple-500 text-lg"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white text-xl font-black py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        <Sparkles className="w-6 h-6 mr-2" />
        Começar a Usar o PetFit+
        <Sparkles className="w-6 h-6 ml-2" />
      </Button>
    </form>
  )
}
