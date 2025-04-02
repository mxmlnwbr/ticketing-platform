import Link from "next/link"
import { Button } from "~/components/ui/button"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import FeaturedEvents from "~/components/featured-events"
import { getEvents } from "~/lib/data"

export default async function Home() {
  const events = await getEvents()
  const featuredEvents = events.filter((event) => event.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary py-20 px-4 sm:px-6 lg:px-8 text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Discover and book amazing events
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Find the best concerts, workshops, sports events and more. Purchase tickets securely and get instant
              access.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/events">
                  Browse Events
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/my-tickets">My Tickets</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
            <Button asChild variant="outline">
              <Link href="/events">View all events</Link>
            </Button>
          </div>
          <FeaturedEvents events={featuredEvents} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Events</h3>
              <p className="text-muted-foreground">
                Browse through our curated list of events or search for specific ones.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Purchase Tickets</h3>
              <p className="text-muted-foreground">
                Securely buy tickets for your favorite events with just a few clicks.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your QR Code</h3>
              <p className="text-muted-foreground">
                Receive a unique QR code for each ticket that can be scanned at the venue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Concerts", "Sports", "Workshops", "Conferences", "Theater", "Comedy", "Festivals", "Exhibitions"].map(
              (category) => (
                <Link
                  key={category}
                  href={`/events?category=${category.toLowerCase()}`}
                  className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-6 text-center"
                >
                  <h3 className="text-lg font-medium">{category}</h3>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

