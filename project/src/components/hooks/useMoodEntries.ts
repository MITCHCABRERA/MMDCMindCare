import { useState, useEffect } from 'react';
import { MoodEntry } from '../types/MoodEntry';

const useMoodEntries = () => {
  const [currentMood, setCurrentMood] = useState('😊');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedEntries: MoodEntry[] = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    setMoodEntries(storedEntries);

    const todayEntry = storedEntries.find(entry => entry.date === today);
    if (todayEntry) setCurrentMood(todayEntry.mood);
  }, []);

  const saveMood = (selectedMood: string) => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    const moodOptions = ['😢', '😐', '😊', '😄', '🤗'];
    const moodValue = moodOptions.indexOf(selectedMood) + 1;

    const newEntry: MoodEntry = {
      id: Date.now(),
      date: today,
      mood: selectedMood,
      value: moodValue,
      note: `Quick mood check-in at ${currentTime}`,
    };

    const updatedEntries = [newEntry, ...moodEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));
    setMoodEntries(updatedEntries);
    setCurrentMood(selectedMood);
    alert(`Mood ${selectedMood} saved successfully!`);
  };

  return { currentMood, moodEntries, saveMood };
};

export default useMoodEntries;
