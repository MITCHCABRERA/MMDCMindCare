export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  meetLink?: string;
  timestamp?: string;
}
