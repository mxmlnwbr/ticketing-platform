"use client"

import Image from "next/image"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { CalendarIcon, MapPinIcon, ClockIcon, DownloadIcon } from "lucide-react"
import { formatDate, formatTime } from "~/lib/utils"
import { getEventImage } from "~/lib/image-utils"
import type { Ticket } from "~/lib/types"

export default function TicketCard({ ticket, isPast = false }: { ticket: Ticket; isPast?: boolean }) {
  const downloadTicket = () => {
    // In a real app, this would generate a PDF ticket
    alert("Downloading ticket...")
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video">
        <Image
          src={ticket.event.image ?? getEventImage(ticket.event.id, ticket.event.category, 600, 300)}
          alt={ticket.event.title}
          fill
          className="object-cover"
        />
        {isPast && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg rotate-[-20deg] border-2 border-white px-4 py-1 rounded">
              ATTENDED
            </span>
          </div>
        )}
      </div>
      <CardContent className="pt-6 flex-grow">
        <h3 className="font-semibold text-lg mb-2">{ticket.event.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(ticket.event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{formatTime(ticket.event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{ticket.event.location}</span>
        </div>

        {!isPast && (
          <div className="bg-muted p-4 rounded-lg flex flex-col items-center mb-4">
            <p className="text-xs text-center text-muted-foreground mb-2">Present this QR code at the event entrance</p>
            <div className="bg-white p-2 rounded">
              <QRCodeSVG value={ticket.id} size={150} level="H" includeMargin />
            </div>
            <p className="text-xs text-center mt-2 font-mono">{ticket.id.substring(0, 8).toUpperCase()}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        {!isPast && (
          <Button variant="outline" className="flex-1" onClick={downloadTicket}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        )}
        <Button asChild variant={isPast ? "default" : "secondary"} className="flex-1">
          <Link href={`/events/${ticket.event.id}`}>Event Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
