export function CircleText({ text, radius }: { text: string; radius: number }) {
    const characters = text.split("");
    return (
      <div className="relative w-full h-full">
        {characters.map((char, i) => {
          const angle = (i / characters.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90}deg)`,
                transformOrigin: "center",
              }}
              className="text-2xl text-[#691C32] font-bold text-[40px]"
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  }