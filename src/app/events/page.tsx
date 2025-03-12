import { getEvents } from "~/lib/data"
import EventCard from "~/components/event-card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { SearchIcon, FilterIcon } from "lucide-react"

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { query?: string; category?: string; sort?: string }
}) {
  const events = await getEvents()
  const { query, category, sort } = searchParams

  let filteredEvents = [...events]

  // Filter by search query
  if (query) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Filter by category
  if (category) {
    filteredEvents = filteredEvents.filter((event) => event.category.toLowerCase() === category.toLowerCase())
  }

  // Sort events
  if (sort) {
    switch (sort) {
      case "date-asc":
        filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "date-desc":
        filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "price-asc":
        filteredEvents.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredEvents.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
  }

  const categories = [...new Set(events.map((event) => event.category))]

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>

      {/* Filters */}
      <div className="mb-8 bg-background p-4 rounded-lg shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input name="query" placeholder="Search events..." defaultValue={query ?? ""} className="pl-10" />
          </div>

          <Select name="category" defaultValue={category ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name="sort" defaultValue={sort ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date-asc">Date (Ascending)</SelectItem>
              <SelectItem value="date-desc">Date (Descending)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">
            <FilterIcon className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </form>
      </div>

      {/* Results */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No events found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
