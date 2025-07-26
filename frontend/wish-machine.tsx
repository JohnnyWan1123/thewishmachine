"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Sparkles, Star, Heart, Moon, Wand2, Send, Eye } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [wish, setWish] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wishSent, setWishSent] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleSubmitWish = async () => {
    if (!wish.trim()) return

    setIsSubmitting(true)

    // Create sparkle animation
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setSparkles(newSparkles)

    try {
      // Send wish to backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anonymous', // You can add a name input field later
          wish: wish.trim()
        })
      })

      if (response.ok) {
        setWishSent(true)
        setWish("")
      } else {
        console.error('Failed to send wish')
      }
    } catch (error) {
      console.error('Error sending wish:', error)
    } finally {
      setIsSubmitting(false)
      
      // Clear sparkles and reset after 3 seconds
      setTimeout(() => {
        setSparkles([])
        setWishSent(false)
      }, 3000)
    }
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
          <Moon className="w-8 h-8" />
        </div>
        <div className="absolute top-1/2 right-10 text-purple-300 animate-spin">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-32 right-1/3 text-yellow-400 animate-pulse">
          <Star className="w-4 h-4" />
        </div>

        {/* Floating sparkles during wish submission */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-yellow-300 animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.id * 0.1}s`,
            }}
          >
            <Sparkles className="w-3 h-3" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl bg-gradient-to-b from-purple-800/90 to-indigo-800/90 backdrop-blur-sm border-2 border-yellow-400/50 shadow-2xl shadow-purple-500/25">
          <div className="p-8 text-center">
            {/* Machine Header */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Wand2 className="w-8 h-8 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  魔法小狗许愿机
                </h1>
                <Wand2 className="w-8 h-8 text-yellow-400 scale-x-[-1]" />
              </div>
              <p className="text-purple-200 text-lg font-medium">{"✨ 许下心愿，见证奇迹发生 ✨"}</p>
            </div>

            {/* Machine Display */}
            <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-2xl p-6 mb-6 border border-yellow-400/30 shadow-inner">
              <div className="bg-black/40 rounded-xl p-4 mb-4 min-h-[120px] flex items-center justify-center">
                {wishSent ? (
                  <div className="text-center animate-fade-in">
                    <div className="text-6xl mb-2">🌟</div>
                    <p className="text-yellow-300 text-xl font-semibold">您的愿望已送达星空！</p>
                  </div>
                ) : isSubmitting ? (
                  <div className="text-center">
                    <div className="animate-spin text-4xl mb-2">✨</div>
                    <p className="text-purple-300 text-lg">正在将您的愿望传送至宇宙深处...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔮</div>
                    <p className="text-purple-300 text-lg">水晶球正在等待您的心愿...</p>
                  </div>
                )}
              </div>

              {/* Wish Input */}
              <div className="space-y-4">
                <Textarea
                  placeholder="在此输入您最深的心愿... ✨"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="min-h-[100px] bg-purple-900/50 border-2 border-yellow-400/50 text-white placeholder:text-purple-300 text-lg resize-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/25"
                  disabled={isSubmitting || wishSent}
                />

                <Button
                  onClick={handleSubmitWish}
                  disabled={!wish.trim() || isSubmitting || wishSent}
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-400 hover:to-pink-400 text-purple-900 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      正在施展您的愿望...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      将愿望送往星空
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Machine Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div
                className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Machine Footer */}
            <div className="text-purple-300 text-sm">
              <p className="mb-2">{"🌙 由古老魔法与星尘驱动 🌙"}</p>
              <p className="text-xs opacity-75 mb-4">{"每个愿望都珍贵无比，将被送达只属于你的魔法小狗"}</p>
              
              {/* Navigation to wishes page */}
              <Link 
                href="/wishes" 
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Eye className="w-4 h-4" />
                查看所有愿望
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional magical background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-900/20 pointer-events-none"></div>
    </div>
  )
}
