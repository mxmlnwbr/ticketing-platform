import type { Event, Ticket } from "./types"

// Mock data for events
const events: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description:
      "Join us for a weekend of amazing music performances from top artists across multiple genres. Food, drinks, and unforgettable memories guaranteed!",
    date: "2025-07-15T18:00:00Z",
    location: "Central Park, New York",
    price: 89.99,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Concerts",
    featured: true,
    availableTickets: 250,
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description:
      "The biggest tech conference of the year featuring keynotes from industry leaders, workshops, networking opportunities, and the latest in technology innovations.",
    date: "2025-05-20T09:00:00Z",
    location: "Convention Center, San Francisco",
    price: 299.99,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Conferences",
    featured: true,
    availableTickets: 500,
  },
  {
    id: "3",
    title: "Basketball Championship Finals",
    description:
      "Witness the thrilling conclusion to this year's basketball championship as the top two teams battle for the trophy.",
    date: "2025-06-10T19:30:00Z",
    location: "Sports Arena, Chicago",
    price: 120,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Sports",
    featured: true,
    availableTickets: 100,
  },
  {
    id: "4",
    title: "Comedy Night",
    description:
      "A night of laughter with performances from top stand-up comedians. Prepare for an evening of hilarious entertainment!",
    date: "2025-04-25T20:00:00Z",
    location: "Laugh Factory, Los Angeles",
    price: 45,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Comedy",
    featured: false,
    availableTickets: 150,
  },
  {
    id: "5",
    title: "Broadway Musical: The Phantom",
    description:
      "Experience the magic of Broadway with this award-winning musical production featuring stunning performances and unforgettable music.",
    date: "2025-08-05T19:00:00Z",
    location: "Broadway Theater, New York",
    price: 150,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Theater",
    featured: false,
    availableTickets: 200,
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    description:
      "Indulge in culinary delights from renowned chefs and taste exceptional wines from around the world at this premier gastronomic event.",
    date: "2025-09-12T12:00:00Z",
    location: "Waterfront Park, San Diego",
    price: 75,
    image: "https://as1.ftcdn.net/v2/jpg/06/80/27/34/1000_F_680273497_LaxrfsJKrEovGIXDxOmg8AqtEg1Q6cld.jpg",
    category: "Festivals",
    featured: false,
    availableTickets: 300,
  },
]

// Mock data for tickets
const tickets: Ticket[] = [
  {
    id: "t1",
    eventId: "1",
    userId: "user1",
    purchaseDate: "2025-03-10T14:30:00Z",
    used: false,
    event: events[0]!,
  },
  {
    id: "t2",
    eventId: "3",
    userId: "user1",
    purchaseDate: "2025-02-20T10:15:00Z",
    used: false,
    event: events[2]!,
  },
  {
    id: "t3",
    eventId: "4",
    userId: "user1",
    purchaseDate: "2025-01-05T16:45:00Z",
    used: true,
    event: {
      ...events[3]!,
      date: "2025-01-25T20:00:00Z", // Past date for this ticket
    },
  },
]

// Simulated API functions
export async function getEvents(): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return events
}

export async function getEventById(id: string): Promise<Event | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return events.find((event) => event.id === id) ?? null
}

export async function getTickets(): Promise<Ticket[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))
  return tickets
}

export async function getTicketById(id: string): Promise<Ticket | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return tickets.find((ticket) => ticket.id === id) ?? null
}
