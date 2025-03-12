import { Suspense } from "react"
import { getTickets } from "~/lib/data"
import TicketCard from "~/components/ticket-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Skeleton } from "~/components/ui/skeleton"

export default async function MyTicketsPage() {
  const tickets = await getTickets()

  const upcomingTickets = tickets.filter((ticket) => new Date(ticket.event.date) >= new Date())

  const pastTickets = tickets.filter((ticket) => new Date(ticket.event.date) < new Date())

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingTickets.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastTickets.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<TicketsLoadingSkeleton count={3} />}>
            {upcomingTickets.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h2 className="text-xl font-medium mb-2">No upcoming tickets</h2>
                <p className="text-muted-foreground mb-4">You don't have any upcoming events</p>
                <a href="/events" className="text-primary hover:underline">
                  Browse events
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<TicketsLoadingSkeleton count={3} />}>
            {pastTickets.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h2 className="text-xl font-medium mb-2">No past tickets</h2>
                <p className="text-muted-foreground">You haven't attended any events yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} isPast />
                ))}
              </div>
            )}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TicketsLoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-background rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-40 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
    </div>
  )
}

