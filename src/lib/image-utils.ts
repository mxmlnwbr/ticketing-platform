/**
 * Utility functions for generating random event images
 */

// Array of event categories with corresponding image keywords
const eventCategories = [
  { name: "concert", keywords: ["concert", "music", "band", "performance", "stage"] },
  { name: "sports", keywords: ["sports", "stadium", "game", "match", "athlete"] },
  { name: "workshop", keywords: ["workshop", "seminar", "classroom", "learning", "education"] },
  { name: "conference", keywords: ["conference", "business", "meeting", "presentation", "convention"] },
  { name: "theater", keywords: ["theater", "play", "drama", "stage", "performance"] },
  { name: "comedy", keywords: ["comedy", "standup", "laugh", "microphone", "performer"] },
  { name: "festival", keywords: ["festival", "celebration", "outdoor", "crowd", "party"] },
  { name: "exhibition", keywords: ["exhibition", "gallery", "museum", "art", "display"] },
];

/**
 * Generates a random Unsplash image URL for a given event category
 * @param category Optional category name to get relevant images
 * @param width Image width
 * @param height Image height
 * @returns URL to a random image
 */
export function getRandomEventImage(category?: string, width = 600, height = 400): string {
  // Find the category object that matches the provided category name (case insensitive)
  const matchedCategory = category 
    ? eventCategories.find(c => c.name.toLowerCase() === category.toLowerCase())
    : null;
  
  // Get keywords for the matched category or select a random category if none provided
  const keywords = matchedCategory?.keywords 
    ?? eventCategories[Math.floor(Math.random() * eventCategories.length)]?.keywords ?? ["event"];
  
  // Select a random keyword from the category
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  
  // Generate a random seed to ensure we get different images
  const randomSeed = Math.floor(Math.random() * 1000);
  
  // Return an Unsplash source URL with the keyword and dimensions
  return `https://source.unsplash.com/random/${width}x${height}?${keyword}&sig=${randomSeed}`;
}

/**
 * Gets a consistent image for a specific event based on its ID
 * @param eventId The unique ID of the event
 * @param category Optional category name to get relevant images
 * @param width Image width
 * @param height Image height
 * @returns URL to a deterministic image based on event ID
 */
export function getEventImage(eventId: string, category?: string, width = 600, height = 400): string {
  // Use the event ID as a seed to get a consistent image for the same event
  const seed = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Find the category object that matches the provided category name (case insensitive)
  const matchedCategory = category 
    ? eventCategories.find(c => c.name.toLowerCase() === category.toLowerCase())
    : null;
  
  // Get keywords for the matched category or select a deterministic category based on event ID
  const keywords = matchedCategory?.keywords 
    ?? eventCategories[seed % eventCategories.length]?.keywords ?? ["event"];
  
  // Select a keyword based on the event ID
  const keyword = keywords[seed % keywords.length];
  
  // Return an Unsplash source URL with the keyword and dimensions
  return `https://source.unsplash.com/random/${width}x${height}?${keyword}&sig=${seed}`;
}
