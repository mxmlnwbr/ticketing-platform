import { notFound } from "next/navigation"
import Image from "next/image"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon } from "lucide-react"
import { getEventById } from "~/lib/data"
import BuyTicketForm from "~/components/buy-ticket-form"
import { formatDate, formatTime, formatCurrency } from "~/lib/utils"

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={event.image!}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{formatTime(event.date)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <UsersIcon className="h-5 w-5 mr-2" />
              <span>{event.availableTickets} tickets available</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this event</h2>
            <p>{event.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map would be displayed here</p>
            </div>
            <p className="mt-2 text-muted-foreground">{event.location}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-background rounded-lg shadow-sm p-6 sticky top-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{formatCurrency(event.price)}</h2>
              <p className="text-muted-foreground">per ticket</p>
            </div>

            <BuyTicketForm eventId={event.id} availableTickets={event.availableTickets} />

            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">• Secure payment processing</p>
              <p className="mb-2">• Instant ticket delivery</p>
              <p>• Unique QR code for each ticket</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
