import { im } from "mathjs"
import { useEffect, useState } from "react"

export default function AnimatedScore() {
  const [score, setScore] = useState(42)
  const [isAnimating, setIsAnimating] = useState(false)
  const targetScore = 98

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true)
    }, 800)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    const duration = 2000
    const startTime = Date.now()
    const startScore = 42

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentScore = Math.round(startScore + (targetScore - startScore) * easeOutQuart)
      
      setScore(currentScore)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isAnimating])

  const getScoreColor = (value: number) => {
    if (value < 50) return "text-red-600"
    if (value < 75) return "text-amber-500"
    return "text-green-600"
  }

  const getScoreGradient = (value: number) => {
    if (value < 50) return "from-red-600 to-red-600"
    if (value < 75) return "from-amber-500 to-amber-400"
    return "from-green-600 to-emerald-400"
  }

  // Calculate the stroke dash for the circular progress
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-transparent/20"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={`transition-all duration-100 ${score < 50 ? "stroke-red-600" : score < 75 ? "stroke-amber-500" : "stroke-green-600"}`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold tabular-nums ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-white/80 font-medium">/100</span>
      </div>
    </div>
  )
}