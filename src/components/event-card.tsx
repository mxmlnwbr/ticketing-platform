import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { formatDate, formatCurrency } from "~/lib/utils"
import { getEventImage } from "~/lib/image-utils"
import type { Event } from "~/lib/types"

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video">
        <Image
          src={event.image || getEventImage(event.id, event.category, 600, 300)}
          alt={event.title}
          fill
          className="object-cover"
        />
        {event.featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
          <div className="text-right font-medium text-primary">{formatCurrency(event.price)}</div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{event.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/events/${event.id}`}>View Event</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

