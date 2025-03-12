export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  image?: string
  category: string
  featured: boolean
  availableTickets: number
}

export interface Ticket {
  id: string
  eventId: string
  userId: string
  purchaseDate: string
  used: boolean
  event: Event
}

