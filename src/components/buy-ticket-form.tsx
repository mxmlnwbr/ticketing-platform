"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { buyTicket } from "~/lib/actions"

export default function BuyTicketForm({
  eventId,
  availableTickets,
}: {
  eventId: string
  availableTickets: number
}) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (isNaN(value) || value < 1) {
      setQuantity(1)
    } else if (value > availableTickets) {
      setQuantity(availableTickets)
    } else {
      setQuantity(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await buyTicket(eventId, quantity)
      if (result.success) {
        router.push(`/my-tickets`)
      } else {
        setError(result.message || "Failed to purchase ticket")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <Label htmlFor="quantity">Number of tickets</Label>
        <div className="flex items-center mt-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={quantity <= 1}
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </Button>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={availableTickets}
            value={quantity}
            onChange={handleQuantityChange}
            className="mx-2 text-center"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={quantity >= availableTickets}
            onClick={() => setQuantity((prev) => Math.min(availableTickets, prev + 1))}
          >
            +
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{availableTickets} tickets available</p>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Buy Ticket"}
      </Button>
    </form>
  )
}

