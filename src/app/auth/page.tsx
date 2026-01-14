"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Sparkles, Mail, Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      if (error) throw error

      setMessage({ type: 'success', text: 'Login realizado com sucesso!' })
      setTimeout(() => router.push('/'), 1000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao fazer login' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (signupData.password !== signupData.confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' })
      setLoading(false)
      return
    }

    if (signupData.password.length < 6) {
      setMessage({ type: 'error', text: 'A senha deve ter no mínimo 6 caracteres' })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            name: signupData.name
          }
        }
      })

      if (error) throw error

      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu email.' })
      setTimeout(() => {
        setSignupData({ name: "", email: "", password: "", confirmPassword: "" })
      }, 2000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao criar conta' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 animate-bounce">
            <PawPrint className="w-16 h-16 text-white drop-shadow-2xl" />
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">
              PetFit+
            </h1>
            <Sparkles className="w-12 h-12 text-yellow-300 drop-shadow-2xl" />
          </div>
          <p className="text-xl font-bold text-white drop-shadow-lg">
            🐾 Saúde completa do seu pet! 🐾
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-4 border-white/50 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-black">Bem-vindo!</CardTitle>
            <CardDescription className="text-white/90">
              Entre ou crie sua conta para começar
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-bold">Entrar</TabsTrigger>
                <TabsTrigger value="signup" className="font-bold">Cadastrar</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2 font-bold">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2 font-bold">
                      <Lock className="w-4 h-4" />
                      Senha
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-sm font-bold ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                        : 'bg-red-100 text-red-800 border-2 border-red-300'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg h-12 shadow-lg"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center gap-2 font-bold">
                      <User className="w-4 h-4" />
                      Nome
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2 font-bold">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2 font-bold">
                      <Lock className="w-4 h-4" />
                      Senha
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="flex items-center gap-2 font-bold">
                      <Lock className="w-4 h-4" />
                      Confirmar Senha
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-sm font-bold ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                        : 'bg-red-100 text-red-800 border-2 border-red-300'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg h-12 shadow-lg"
                  >
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-white text-sm drop-shadow-md">
          Ao continuar, você concorda com nossos termos de uso
        </p>
      </div>
    </div>
  )
}
