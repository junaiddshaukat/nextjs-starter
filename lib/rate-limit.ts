// Simple in-memory rate limiter (for dev/demo)
// For production, use Redis or a distributed store

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (entry) {
    if (now - entry.lastRequest > windowMs) {
      // Reset window
      rateLimitMap.set(key, { count: 1, lastRequest: now });
      return { success: true, remaining: limit - 1 };
    } else {
      if (entry.count >= limit) {
        return { success: false, remaining: 0 };
      } else {
        entry.count++;
        entry.lastRequest = now;
        rateLimitMap.set(key, entry);
        return { success: true, remaining: limit - entry.count };
      }
    }
  } else {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
    return { success: true, remaining: limit - 1 };
  }
} 