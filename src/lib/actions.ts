"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { getEventById } from "./data"

export async function buyTicket(eventId: string, quantity: number) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get the event
    const event = await getEventById(eventId)

    if (!event) {
      return { success: false, message: "Event not found" }
    }

    if (event.availableTickets < quantity) {
      return { success: false, message: "Not enough tickets available" }
    }

    // In a real app, we would:
    // 1. Process payment
    // 2. Create ticket records in the database
    // 3. Update available tickets count
    // 4. Send confirmation email

    // For demo purposes, we'll just simulate success
    const ticketIds = Array(quantity)
      .fill(0)
      .map(() => uuidv4())

    // Revalidate the events and tickets pages
    revalidatePath("/events")
    revalidatePath("/my-tickets")

    return {
      success: true,
      message: "Tickets purchased successfully",
      ticketIds,
    }
  } catch (error) {
    console.error("Error buying ticket:", error)
    return { success: false, message: "Failed to purchase tickets" }
  }
}

export async function validateTicket(ticketId: string) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, we would:
    // 1. Verify the ticket exists in the database
    // 2. Check if the ticket has already been used
    // 3. Mark the ticket as used if valid

    // For demo purposes, we'll simulate validation
    if (ticketId === "valid-ticket-id") {
      // Simulate a valid ticket
      return {
        valid: true,
        message: "Ticket validated successfully",
        ticket: {
          id: ticketId,
          event: {
            title: "Summer Music Festival",
            date: "2025-07-15T18:00:00Z",
          },
        },
      }
    } else {
      // Simulate an invalid ticket
      return {
        valid: false,
        message: "Invalid ticket or ticket has already been used",
      }
    }
  } catch (error) {
    console.error("Error validating ticket:", error)
    return { valid: false, message: "Error validating ticket" }
  }
}

