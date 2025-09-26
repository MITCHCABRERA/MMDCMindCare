import { useState, useRef, useEffect, useCallback } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

export function useWellnessSession(currentSession: any) {
  const [watchSeconds, setWatchSeconds] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Record<string | number, number>>({});
  const [countingStatus, setCountingStatus] = useState<"counting" | "paused" | "waiting">("paused");

  const playerRef = useRef<any>(null);
  const lastSequentialRef = useRef<number>(0); 
  const isPausedRef = useRef<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    const saved = getLocalStorage<Record<string | number, number>>(
      "wellness-completed-sessions",
      {}
    );
    setCompletedSessions(saved);
  }, []);

  const markOnceGuard = (key: string) => {
    const marker = `wellness-${key}`;
    if (localStorage.getItem(marker)) return false;
    localStorage.setItem(marker, "1");
    setTimeout(() => localStorage.removeItem(marker), 1000);
    return true;
  };

  const completeSession = (programId: number | string) => {
    if (!markOnceGuard(programId.toString())) return;

    const newCompleted = {
      ...completedSessions,
      [programId]: (completedSessions[programId] || 0) + 1,
    };
    setCompletedSessions(newCompleted);
    setLocalStorage("wellness-completed-sessions", newCompleted);

    const sessions = getLocalStorage<string[]>("sessions-completed", []);
    sessions.push(new Date().toISOString());
    setLocalStorage("sessions-completed", sessions);
    
    // Stop tracking when session is complete
    stopTracking();
  };

  const getSessionDurationSeconds = (session: any) => {
    if (!session || !session.duration) return 60;
    const m = session.duration.match(/(\d+)\s*min/i);
    if (m) return Number(m[1]) * 60;
    const s = session.duration.match(/(\d+)\s*s(ec)?/i);
    if (s) return Number(s[1]);
    return 60;
  };

  const resetSequential = () => {
    lastSequentialRef.current = 0;
    setWatchSeconds(0);
    isPausedRef.current = true;
    setCountingStatus("paused");
    stopTracking();
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPausedRef.current = true;
    setCountingStatus("paused");
  };

  const startTracking = useCallback(() => {
    // Clear any existing interval
    stopTracking();
    
    isPausedRef.current = false;
    lastUpdateTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (!playerRef.current || isPausedRef.current || !currentSession) return;

      try {
        const currentTime = Math.floor(playerRef.current.getCurrentTime());
        const lastSequential = lastSequentialRef.current;
        
        if (currentTime > lastSequential + 1) {
          setCountingStatus("waiting");
          return; 
        }
        
        if (currentTime <= lastSequential) {
          setCountingStatus("waiting");
          return;
        }
        
        if (currentTime === lastSequential + 1) {
          const newSequential = lastSequential + 1;
          lastSequentialRef.current = newSequential;
          setWatchSeconds(newSequential);
          setCountingStatus("counting");
          
          // Check for completion
          const sessionDuration = getSessionDurationSeconds(currentSession);
          const completionThreshold = Math.floor(sessionDuration * 0.95);
          
          if (newSequential >= completionThreshold) {
            completeSession(currentSession.id);
          }
        }
      } catch (error) {
        console.error('Error tracking video progress:', error);
      }
    }, 100); 
  }, [currentSession, completeSession]);

  const handlePlayerStateChange = (state: number, currentTime: number) => {
    if (state === 1) { // Playing
      startTracking();
      const currentTimeFloor = Math.floor(currentTime);
      if (currentTimeFloor <= lastSequentialRef.current) {
        setCountingStatus("counting");
      } else {
        setCountingStatus("waiting");
      }
    } else { 
      stopTracking();
    }
  };

  const handleTimeUpdate = (currentTime: number, sessionId: string | number) => {
    
    if (!currentSession || isPausedRef.current) return;

    const currentTimeFloor = Math.floor(currentTime);
    const lastSequential = lastSequentialRef.current;
    
    if (currentTimeFloor > lastSequential + 1) {
      setCountingStatus("waiting");
      return; // User has skipped ahead 
    }
    
    if (currentTimeFloor <= lastSequential) {
      setCountingStatus("waiting");
      return; // User went backwards 
    }
    
    if (currentTimeFloor === lastSequential + 1) {
      const newSequential = lastSequential + 1;
      lastSequentialRef.current = newSequential;
      setWatchSeconds(newSequential);
      setCountingStatus("counting");
      
      // Check for completion
      const sessionDuration = getSessionDurationSeconds(currentSession);
      const completionThreshold = Math.floor(sessionDuration * 0.95);
      
      if (newSequential >= completionThreshold) {
        completeSession(sessionId);
      }
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset when session changes
  useEffect(() => {
    if (currentSession) {
      resetSequential();
    }
  }, [currentSession]);

  return {
    watchSeconds,
    completedSessions,
    countingStatus,
    completeSession,
    handleTimeUpdate,
    resetSequential,
    playerRef,
    handlePlayerStateChange,
  };
}