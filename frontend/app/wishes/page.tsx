"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Star, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Wish {
  id: number
  name: string
  wish: string
  created_at: string
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchWishes()
  }, [])

  const fetchWishes = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/wishes`)
      if (response.ok) {
        const data = await response.json()
        setWishes(data)
      } else {
        setError('Failed to fetch wishes')
      }
    } catch (error) {
      setError('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const deleteWish = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/wishes/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setWishes(wishes.filter(wish => wish.id !== id))
      }
    } catch (error) {
      console.error('Error deleting wish:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">✨</div>
          <p className="text-purple-200 text-xl">正在加载愿望...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background magical elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-yellow-300 animate-pulse">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-32 right-20 text-pink-300 animate-bounce">
          <Heart className="w-4 h-4" />
        </div>
        <div className="absolute bottom-20 left-16 text-blue-300 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-200 hover:text-yellow-400 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回许愿机
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            愿望星空
          </h1>
          <p className="text-purple-200 text-lg">✨ 所有美好的愿望都在这里 ✨</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Wishes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishes.map((wish) => (
            <Card key={wish.id} className="bg-gradient-to-b from-purple-800/90 to-indigo-800/90 backdrop-blur-sm border-2 border-yellow-400/50 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <span className="text-purple-200 font-medium">{wish.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteWish(wish.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-white text-lg leading-relaxed">"{wish.wish}"</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-purple-300">
                  <span>✨ {formatDate(wish.created_at)}</span>
                  <span className="text-yellow-400">#{wish.id}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {wishes.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-purple-200 text-xl mb-2">还没有愿望</p>
            <p className="text-purple-300">成为第一个许愿的人吧！</p>
          </div>
        )}

        {/* Stats */}
        {wishes.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-purple-200">
              共有 <span className="text-yellow-400 font-bold">{wishes.length}</span> 个愿望在星空中闪耀 ✨
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 