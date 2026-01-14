"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AIChatProps {
  petData: any
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChat({ petData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Olá! Sou o assistente virtual do PetFit+. Posso ajudar com dúvidas sobre ${petData.name}. Como posso ajudar você hoje?`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Respostas pré-programadas baseadas em palavras-chave
  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase()

    // Vômito
    if (msg.includes("vomit") || msg.includes("vômit")) {
      return `Sobre vômito em ${petData.species === "dog" ? "cães" : "gatos"}:

🔍 **Causas comuns:**
• Comer muito rápido
• Mudança brusca de alimentação
• Ingestão de algo inadequado
• Bola de pelo (gatos)

⚠️ **Quando se preocupar:**
• Vômitos frequentes (mais de 2x em 24h)
• Presença de sangue
• Acompanhado de diarreia ou letargia
• Abdômen inchado ou dolorido

✅ **O que fazer:**
1. Jejum de 12h (apenas água)
2. Depois, ofereça pequenas porções de comida leve
3. Se persistir, consulte veterinário

⚠️ **IMPORTANTE:** Se houver sangue, convulsões ou sinais de dor intensa, procure veterinário IMEDIATAMENTE.`
    }

    // Não está comendo
    if (msg.includes("não com") || msg.includes("nao com") || msg.includes("não está comendo")) {
      return `Sobre perda de apetite:

🔍 **Causas possíveis:**
• Estresse ou ansiedade
• Mudança de ambiente
• Problemas dentários
• Doenças subjacentes
• Comida estragada ou desagradável

⚠️ **Sinais de alerta:**
• Mais de 24h sem comer
• Letargia ou fraqueza
• Vômitos ou diarreia
• Perda de peso visível

✅ **O que tentar:**
1. Aqueça levemente a comida (libera aroma)
2. Ofereça petiscos saudáveis favoritos
3. Verifique se a ração está fresca
4. Tente comida úmida (mais palatável)

⚠️ **IMPORTANTE:** ${petData.species === "cat" ? "Gatos não devem ficar mais de 24h sem comer (risco de lipidose hepática)." : "Cães podem ficar até 48h, mas consulte veterinário se houver outros sintomas."}`
    }

    // Pode dar X alimento
    if (msg.includes("pode dar") || msg.includes("pode comer")) {
      if (msg.includes("banana")) {
        return `✅ **Banana:** SIM, pode dar com moderação!

🍌 **Benefícios:**
• Rica em potássio
• Boa fonte de fibras
• Vitaminas B6 e C

⚠️ **Cuidados:**
• Pequenas quantidades (1-2 rodelas)
• Remova a casca
• Não exagere (alto teor de açúcar)
• Pode causar prisão de ventre em excesso

💡 **Dica:** Congele rodelas de banana para um petisco refrescante no verão!`
      }
      
      return `Para saber se um alimento é seguro:

✅ **Alimentos SEGUROS:**
• Carnes magras cozidas (frango, peixe, carne)
• Cenoura, abóbora, batata doce (cozidas)
• Maçã, banana, melancia (sem sementes)
• Arroz, aveia

❌ **NUNCA DÊ:**
• Chocolate, café, chá
• Cebola, alho
• Uva, passas
• Abacate
• Álcool
• Ossos cozidos
• Xilitol (adoçante)

💡 **Dica:** Sempre introduza novos alimentos gradualmente e em pequenas quantidades. Consulte a aba "Alimentação" para mais informações!`
    }

    // Diarreia
    if (msg.includes("diarr") || msg.includes("diarreia") || msg.includes("fezes")) {
      return `Sobre diarreia:

🔍 **Causas comuns:**
• Mudança de alimentação
• Intolerância alimentar
• Parasitas intestinais
• Estresse
• Infecções

⚠️ **Quando se preocupar:**
• Diarreia com sangue
• Mais de 24h de duração
• Acompanhada de vômitos
• Letargia ou desidratação
• Febre

✅ **Primeiros cuidados:**
1. Mantenha hidratação (água fresca sempre disponível)
2. Jejum de 12h
3. Depois, dieta leve: frango cozido + arroz branco
4. Probióticos podem ajudar

⚠️ **IMPORTANTE:** Filhotes e idosos desidratam rapidamente. Se persistir por mais de 12h, consulte veterinário.`
    }

    // Tosse
    if (msg.includes("toss") || msg.includes("tosse") || msg.includes("engasgo")) {
      return `Sobre tosse em ${petData.species === "dog" ? "cães" : "gatos"}:

🔍 **Causas possíveis:**
• Tosse dos canis (cães)
• Problemas cardíacos
• Alergias
• Corpo estranho na garganta
• Infecções respiratórias
• Bola de pelo (gatos)

⚠️ **Sinais de alerta:**
• Tosse persistente por mais de 2 dias
• Dificuldade para respirar
• Gengivas azuladas
• Tosse com sangue
• Febre ou letargia

✅ **O que fazer:**
• Mantenha ambiente úmido (vaporizador)
• Evite coleiras apertadas
• Reduza exercícios intensos
• Observe se há evolução

⚠️ **IMPORTANTE:** Tosse pode indicar problemas sérios. Se persistir ou piorar, consulte veterinário imediatamente.`
    }

    // Comportamento
    if (msg.includes("comportamento") || msg.includes("agressiv") || msg.includes("ansied")) {
      return `Sobre comportamento:

🐕 **Problemas comuns:**
• Ansiedade de separação
• Agressividade
• Destruição de objetos
• Latidos/miados excessivos
• Medo de barulhos

✅ **Dicas gerais:**
1. **Exercícios regulares** - reduzem ansiedade
2. **Rotina consistente** - traz segurança
3. **Enriquecimento ambiental** - evita tédio
4. **Reforço positivo** - recompense bons comportamentos
5. **Socialização** - desde filhote

💡 **Quando buscar ajuda:**
• Agressividade súbita
• Mudanças drásticas de comportamento
• Comportamentos compulsivos
• Ansiedade severa

🎓 **Considere:** Adestrador profissional ou veterinário comportamentalista para casos persistentes.`
    }

    // Resposta padrão
    return `Entendo sua dúvida sobre ${petData.name}. 

Posso ajudar com informações sobre:
• 🤢 Vômitos e náuseas
• 🍽️ Alimentação e dieta
• 💊 Sintomas comuns
• 🏃 Exercícios e comportamento
• 🚨 Situações de emergência

**Pergunte algo como:**
• "Meu ${petData.species === "dog" ? "cachorro" : "gato"} está vomitando, o que fazer?"
• "Pode dar banana para ${petData.species === "dog" ? "cachorro" : "gato"}?"
• "${petData.name} não está comendo"
• "O que fazer em caso de diarreia?"

⚠️ **LEMBRE-SE:** Sou apenas um assistente informativo. Em caso de dúvidas sérias ou emergências, SEMPRE consulte um veterinário!`
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simula delay de resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Alerta */}
      <Alert className="border-cyan-500 bg-cyan-50 dark:bg-cyan-950">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Este chat oferece orientações gerais. <strong>NÃO substitui consulta veterinária.</strong> Em emergências, procure atendimento profissional imediatamente.
        </AlertDescription>
      </Alert>

      {/* Chat Card */}
      <Card className="border-2 border-cyan-200 dark:border-cyan-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-600" />
            Chat com IA Veterinária
          </CardTitle>
          <CardDescription>Tire dúvidas sobre a saúde e cuidados com {petData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages Area */}
          <ScrollArea className="h-[500px] w-full rounded-lg border bg-gray-50 dark:bg-gray-900 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-cyan-600 text-white"
                        : "bg-white dark:bg-gray-800 border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === "user" ? "text-cyan-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder={`Pergunte sobre ${petData.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Sugestões */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Perguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Meu pet está vomitando",
                "Pode dar banana?",
                "Não está comendo",
                "O que fazer com diarreia?"
              ].map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(suggestion)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200 dark:border-cyan-800">
        <CardHeader>
          <CardTitle className="text-lg">⚠️ Importante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Este chat oferece orientações gerais baseadas em conhecimento veterinário comum</p>
          <p>✓ NÃO substitui diagnóstico ou tratamento profissional</p>
          <p>✓ Em caso de sintomas graves ou emergências, procure veterinário imediatamente</p>
          <p>✓ Sempre consulte um profissional antes de administrar medicamentos</p>
          <p>✓ Use as informações como complemento, não como única fonte</p>
        </CardContent>
      </Card>
    </div>
  )
}
