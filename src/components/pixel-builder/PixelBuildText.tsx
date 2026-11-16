import React from 'react';

export interface TextSegment {
  text: string;
  className?: string;
}

interface PixelBuildTextProps {
  segments: TextSegment[];
  revealedUpTo: number;
  done: boolean;
}

/**
 * Renders text character-by-character with `data-build-idx` while waiting/building,
 * then switches cleanly to normal DOM text once completed.
 */
export const PixelBuildText: React.FC<PixelBuildTextProps> = ({
  segments,
  revealedUpTo,
  done,
}) => {
  if (done) {
    return (
      <>
        {segments.map((seg, sIdx) => (
          <span key={sIdx} className={seg.className}>
            {seg.text}
          </span>
        ))}
      </>
    );
  }

  let globalIdx = 0;
  return (
    <>
      {segments.map((seg, sIdx) => {
        const chars = Array.from(seg.text);
        return (
          <span key={sIdx} className={seg.className}>
            {chars.map((ch, cIdx) => {
              const idx = globalIdx++;
              const isWhitespace = /\s/.test(ch);
              const visible = isWhitespace || idx <= revealedUpTo;
              return (
                <span
                  key={`${sIdx}-${cIdx}`}
                  data-build-idx={idx}
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};
