import React, { useState, useRef } from 'react';

interface PhoneNumber {
  label: string;
  number: string;
}

const phoneNumbers: PhoneNumber[] = [
  { label: 'Landline', number: '(02) 8804-4673' },
  { label: 'Globe', number: '0917-558-4673' },
  { label: 'Smart', number: '0918-873-4673' },
];

const EmergencySupport: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClickedNumber = useRef<string | null>(null);
  const clickCount = useRef<number>(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage(`Copied ${text} to clipboard!`);
      setTimeout(() => setMessage(null), 2000);
    });
  };

  const handleClick = (number: string) => {
    clickCount.current += 1;

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    if (clickCount.current === 1) {
      // Single click: copy number
      copyToClipboard(number);
      lastClickedNumber.current = number;

      // Wait to see if double click happens
      clickTimeout.current = setTimeout(() => {
        clickCount.current = 0;
      }, 400); // 400ms threshold for double click
    } else if (clickCount.current === 2) {
      // Double click: ask for confirmation to call
      if (lastClickedNumber.current === number) {
        clickCount.current = 0;
        if (window.confirm(`Do you want to call ${number}?`)) {
          // Initiate call
          window.location.href = `tel:${number.replace(/[^0-9+]/g, '')}`;
        }
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <p>Click a number to copy it. Double click to call (mobile only).</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {phoneNumbers.map(({ label, number }) => (
          <li
            key={number}
            onClick={() => handleClick(number)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              border: '1px solid #ccc',
              marginBottom: '0.5rem',
              borderRadius: '4px',
              userSelect: 'none',
            }}
            title="Click to copy, double click to call"
          >
            <strong>{label}:</strong> {number}
          </li>
        ))}
      </ul>
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  );
};

export default EmergencySupport;