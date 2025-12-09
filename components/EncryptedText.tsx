import React, { useEffect, useState } from 'react';

interface EncryptedTextProps {
    text: string;
    initialColor?: string; // e.g., 'text-purple-500'
    finalColor?: string;   // e.g., 'text-orange-500'
    duration?: number;     // ms
    className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const EncryptedText: React.FC<EncryptedTextProps> = ({
    text,
    initialColor = 'text-purple-500',
    finalColor = 'text-orange-500',
    duration = 3000,
    className = '',
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [colorClass, setColorClass] = useState(initialColor);
    const [scrambleActive, setScrambleActive] = useState(true);

    useEffect(() => {
        let iteration = 0;
        // Calculate steps based on duration and text length
        // We want to finish revealing by 'duration'.
        // Total steps ~ length of text.
        // Interval delay = duration / (text.length * 2) (since we increment by 0.5)
        const intervalDelay = duration / (text.length * 2);

        // Start color transition
        // detailed color interpolation is hard with tailwind classes, 
        // but we can just switch the class at the end or use specific logic.
        // User asked "slowly decrypts... to become neon orange".
        // I'll assume they want the scramble effect to happen while the color transitions.
        // Tailwind 'transition-colors' handles the smooth color change if we change the class.

        // Set final color immediately on mount to trigger transition? 
        // Or wait? If we want it to "become" orange, we should start purple and transition to orange during the effect.
        setTimeout(() => setColorClass(finalColor), 100);

        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setScrambleActive(false);
            }

            iteration += 1 / 2; // Slower reveal for more scramble effect? No, let's do 1.
            // actually let's increment by a fraction to make it look "scrambly" longer for short text?
            // "Innovative Business Visionary" is long enough. 
            // Let's increment by 1 each tick of calculated delay.
        }, intervalDelay);

        // Cleanup
        return () => clearInterval(interval);
    }, [text, duration, finalColor]);

    return (
        <span
            className={`font-mono transition-colors ease-in-out ${className} ${colorClass}`}
            style={{ transitionDuration: `${duration}ms` }}
        >
            {displayText}
        </span>
    );
};

export default EncryptedText;
