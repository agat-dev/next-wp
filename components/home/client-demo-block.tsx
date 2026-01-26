"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-16 overflow-hidden">
        {/* Animated background blur */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="max-w-6xl w-full space-y-8">
          {/* Header with animation */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-slide-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Nouveau : Découvrez notre démo interactive
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-foreground animate-slide-up delay-100">
              Découvrez notre{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                solution
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-slide-up delay-200">
              Une expérience unique qui transforme votre façon de travailler avec une interface intuitive et puissante
            </p>
          </div>

          {/* Video container with animations */}
          <div
            className="relative group animate-scale-in delay-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Video wrapper */}
            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
              {/* Video placeholder */}
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <video className="w-full h-full object-cover" poster="/modern-dashboard.png" loop muted playsInline>
                  <source src="/demo-video.mp4" type="video/mp4" />
                </video>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Play/Pause button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={handlePlayPause}
                    className={`
                      relative h-20 w-20 rounded-full bg-background/90 backdrop-blur-sm 
                      hover:bg-background hover:scale-110 
                      shadow-2xl border-2 border-primary/20
                      transition-all duration-300
                      ${isHovered ? "scale-100 opacity-100" : "scale-90 opacity-80"}
                    `}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-foreground" />
                    ) : (
                      <Play className="h-8 w-8 text-foreground ml-1" />
                    )}
                    <span className="sr-only">{isPlaying ? "Mettre en pause" : "Lire la vidéo"}</span>
                  </Button>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  2:34
                </div>
              </div>

              {/* Info bar */}
              <div className="p-6 bg-card/50 backdrop-blur-sm border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground">Présentation complète de la plateforme</h3>
                    <p className="text-sm text-muted-foreground">Découvrez toutes les fonctionnalités en détail</p>
                  </div>
                  <Button variant="default" className="group/btn" onClick={() => setIsModalOpen(true)}>
                    Essayer gratuitement
                    <svg
                      className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-fade-in delay-500">
            {[
              { title: "Interface intuitive", desc: "Design moderne et facile à utiliser" },
              { title: "Performance optimale", desc: "Rapidité et fluidité garanties" },
              { title: "Support 24/7", desc: "Assistance disponible à tout moment" },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
