export type Burst = 'small' | 'medium' | 'grand';

export async function burst(kind: Burst, origin: { x: number; y: number }): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { default: confetti } = await import('canvas-confetti');
  if (kind === 'small') confetti({ particleCount: 28, spread: 55, startVelocity: 25, ticks: 90, origin });
  else if (kind === 'medium') confetti({ particleCount: 110, spread: 85, startVelocity: 35, origin });
  else
    [0.2, 0.5, 0.8].forEach((x, i) =>
      window.setTimeout(() => confetti({ particleCount: 160, spread: 110, startVelocity: 45, origin: { x, y: 0.45 } }), i * 250),
    );
}
