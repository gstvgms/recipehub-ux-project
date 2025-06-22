"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  src?: string
  youtubeId?: string
  title?: string
  className?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
}

export function VideoPlayer({
  src,
  youtubeId,
  title,
  className,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  // If we have a YouTube ID, we'll use the YouTube embed
  const isYouTube = Boolean(youtubeId)

  // Handle video events for direct video files
  useEffect(() => {
    if (isYouTube || !videoRef.current) return

    const video = videoRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleVolumeChange = () => {
      setIsMuted(video.muted)
      setVolume(video.volume)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (loop) {
        video.play().catch(() => {})
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("volumechange", handleVolumeChange)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("volumechange", handleVolumeChange)
      video.removeEventListener("ended", handleEnded)
    }
  }, [isYouTube, loop])

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Auto-hide controls
  useEffect(() => {
    if (!controls) return

    const handleMouseMove = () => {
      setShowControls(true)

      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }

      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)

      setControlsTimeout(timeout)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setShowControls(false)
        }
      })
      container.addEventListener("mouseenter", () => {
        setShowControls(true)
      })
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [controls, isPlaying, controlsTimeout])

  // Play/pause
  const togglePlay = () => {
    if (!videoRef.current || isYouTube) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(() => {})
    }
  }

  // Mute/unmute
  const toggleMute = () => {
    if (!videoRef.current || isYouTube) return

    videoRef.current.muted = !isMuted
  }

  // Set volume
  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current || isYouTube) return

    const newVolume = value[0]
    videoRef.current.volume = newVolume
    if (newVolume === 0) {
      videoRef.current.muted = true
    } else if (isMuted) {
      videoRef.current.muted = false
    }
  }

  // Seek
  const handleSeek = (value: number[]) => {
    if (!videoRef.current || isYouTube) return

    videoRef.current.currentTime = value[0]
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {})
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-black aspect-video",
        isFullscreen && "fixed inset-0 z-50 h-screen w-screen rounded-none",
        className,
      )}
    >
      {isYouTube ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${
            loop ? 1 : 0
          }&controls=${controls ? 1 : 0}`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          className="absolute inset-0 h-full w-full object-contain"
          onClick={togglePlay}
        />
      )}

      {!isYouTube && controls && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
            !showControls && "opacity-0 pointer-events-none",
            showControls && "opacity-100",
          )}
        >
          {/* Progress bar */}
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="h-1"
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleMute}
                aria-label={isMuted ? "Ativar som" : "Desativar som"}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="h-1"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
