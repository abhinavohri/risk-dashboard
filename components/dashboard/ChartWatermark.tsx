import Image from 'next/image';
import darkLogo from "@/public/LlamaRisk-logo-dark.svg";

export function ChartWatermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 50 }}>
      <Image
        src={darkLogo}
        alt=""
        className="w-40 h-40 opacity-20 dark:invert"
        width={160}
        height={160}
      />
    </div>
  );
}
