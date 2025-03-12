"use client"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, ScanLineIcon } from "lucide-react"
import { validateTicket } from "~/lib/actions"
import type { Ticket } from "~/lib/types"

// Define a type for the validation result
type ValidationResult = {
  valid: boolean;
  message: string;
  ticket?: {
    id: string;
    event?: {
      title?: string;
      date?: string;
    };
  };
}

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [camera, setCamera] = useState<MediaStream | null>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (camera) {
        camera.getTracks().forEach((track) => track.stop())
      }
    }
  }, [camera])

  const startScanner = async () => {
    setResult(null)
    setScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      setCamera(stream)
      setHasCameraPermission(true)

      // In a real app, we would initialize a QR code scanner library here
      // For demo purposes, we'll simulate a scan after 3 seconds
      setTimeout(() => {
        void simulateScan()
      }, 3000)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setHasCameraPermission(false)
      setScanning(false)
    }
  }

  const stopScanner = () => {
    setScanning(false)
    if (camera) {
      camera.getTracks().forEach((track) => track.stop())
      setCamera(null)
    }
  }

  const simulateScan = async () => {
    // Simulate scanning a QR code
    const ticketId = Math.random() > 0.3 ? "valid-ticket-id" : "invalid-ticket-id"

    try {
      // Simulate a validation result
      if (ticketId === "valid-ticket-id") {
        setResult({
          valid: true,
          message: "Ticket successfully validated!",
          ticket: {
            id: ticketId,
            event: {
              title: "Summer Music Festival",
              date: "2025-07-15T18:00:00Z"
            }
          }
        });
      } else {
        setResult({
          valid: false,
          message: "Invalid ticket. This ticket has already been used or is not recognized."
        });
      }
    } catch (err) {
      setResult({
        valid: false,
        message: "Error validating ticket. Please try again.",
      })
    }

    stopScanner()
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Ticket Scanner</h1>

      <Card>
        <CardHeader>
          <CardTitle>Scan Ticket QR Code</CardTitle>
          <CardDescription>Point the camera at the ticket QR code to validate</CardDescription>
        </CardHeader>
        <CardContent>
          {scanning ? (
            <div className="relative aspect-square bg-muted rounded-md overflow-hidden mb-4">
              {camera && <video autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary rounded-md animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white bg-black/50 py-1">
                Scanning...
              </div>
            </div>
          ) : (
            <div className="aspect-square bg-muted rounded-md flex flex-col items-center justify-center mb-4">
              <ScanLineIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {hasCameraPermission === false
                  ? "Camera access denied. Please enable camera permissions."
                  : "Press the button below to start scanning"}
              </p>
            </div>
          )}

          {result && (
            <Alert variant={result.valid ? "default" : "destructive"} className="mb-4">
              {result.valid ? <CheckCircle2Icon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
              <AlertTitle>{result.valid ? "Valid Ticket" : "Invalid Ticket"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>

              {result.valid && result.ticket && (
                <div className="mt-4 text-sm">
                  <p>
                    <strong>Event:</strong> {result.ticket.event?.title ?? "Unknown Event"}
                  </p>
                  <p>
                    <strong>Date:</strong> {result.ticket.event?.date 
                      ? new Date(result.ticket.event.date).toLocaleDateString() 
                      : "Unknown Date"}
                  </p>
                  <p>
                    <strong>Ticket ID:</strong> {result.ticket.id ? result.ticket.id.substring(0, 8) : "Unknown ID"}
                  </p>
                </div>
              )}
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {scanning ? (
            <Button variant="outline" className="w-full" onClick={stopScanner}>
              Cancel
            </Button>
          ) : (
            <Button className="w-full" onClick={startScanner} disabled={hasCameraPermission === false}>
              Start Scanning
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
