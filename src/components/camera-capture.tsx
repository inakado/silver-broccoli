"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RotateCcw, Check } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, []) // Added stream to dependencies

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        setCapturedImage(imageData)
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
  }

  const savePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage)
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-1">
        {capturedImage ? (
          <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-contain" />
        ) : (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        )}
      </div>
      <div className="bg-black p-4 flex justify-center items-center gap-4">
        {capturedImage ? (
          <>
            <Button variant="outline" size="icon" onClick={retakePhoto}>
              <RotateCcw className="h-6 w-6" />
            </Button>
            <Button size="icon" onClick={savePhoto}>
              <Check className="h-6 w-6" />
            </Button>
          </>
        ) : (
          <Button size="icon" onClick={capturePhoto}>
            <Camera className="h-6 w-6" />
          </Button>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

