const SESSION_KEY = 'levser_session_id';
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

interface SessionData {
  id: string;
  created: number;
  lastActive: number;
}

const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

export const getSessionId = (): string => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    
    if (stored) {
      const session: SessionData = JSON.parse(stored);
      const now = Date.now();
      
      // Check if session is still valid
      if (now - session.created < SESSION_TTL) {
        // Update last active
        session.lastActive = now;
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session.id;
      }
    }
    
    // Create new session
    const newSession: SessionData = {
      id: generateSessionId(),
      created: Date.now(),
      lastActive: Date.now(),
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return newSession.id;
  } catch (e) {
    // Fallback if localStorage is unavailable
    return generateSessionId();
  }
};

export const getSessionData = (): SessionData | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    void e;
  }
  return null;
};

export const updateSessionActivity = (): void => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const session: SessionData = JSON.parse(stored);
      session.lastActive = Date.now();
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  } catch (e) {
    void e;
  }
};
