import { useEffect } from 'react';

const useMonthlyReset = () => {
  useEffect(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

    const lastResetMonth = localStorage.getItem("last-reset-month");

    if (lastResetMonth !== currentMonth) {
      localStorage.setItem("wellness-completed-sessions", JSON.stringify([]));
      localStorage.setItem("journal-entries", JSON.stringify([]));
      localStorage.setItem("mood-entries", JSON.stringify([]));
      localStorage.setItem("sessions-completed", JSON.stringify([]));
      localStorage.setItem("last-reset-month", currentMonth);
    }
  }, []);
};

export default useMonthlyReset;
