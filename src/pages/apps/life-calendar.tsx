import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const CELL_SPACE = 14;
const RADIUS = 4.5;
const OFFSET_X = 60;
const OFFSET_Y = 60;

const COLORS = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#1f2937', // Dark Gray
];

export default function LifeCalendar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- State ---
  const [dob, setDob] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 25);
    return defaultDate.toISOString().split('T')[0];
  });
  const [lifeYears, setLifeYears] = useState(90);
  const [selectedColor, setSelectedColor] = useState(COLORS[5]); // Default Blue
  const [customRanges, setCustomRanges] = useState<{ start: number; end: number; color: string }[]>([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [rangeColor, setRangeColor] = useState(COLORS[0]);
  const [modalError, setModalError] = useState('');

  // Drag interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null);
  const [dragCurrentIdx, setDragCurrentIdx] = useState<number | null>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, week: 0, startDate: '', endDate: '' });

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // --- Calculations ---
  const totalWeeks = lifeYears * 52;

  const weeksLived = useMemo(() => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    if (birthDate > today) return 0;

    // Calculate difference in exact weeks
    const msLived = today.getTime() - birthDate.getTime();
    return Math.floor(msLived / (1000 * 60 * 60 * 24 * 7));
  }, [dob]);

  // Logical dimensions of the canvas
  const canvasWidth = OFFSET_X + 52 * CELL_SPACE + 20;
  const canvasHeight = OFFSET_Y + lifeYears * CELL_SPACE + 20;

  // --- Canvas Drawing Logic ---
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dark mode colors
    const axisColor = isDarkMode ? '#9ca3af' : '#6b7280'; // gray-400 vs gray-500
    const titleColor = isDarkMode ? '#e5e7eb' : '#374151'; // gray-200 vs gray-700
    const livedColor = isDarkMode ? '#475569' : '#94a3b8'; // slate-600 vs slate-400
    const emptyBorderColor = isDarkMode ? '#1a2238' : '#cbd5e1'; // Ajustado para armonizar con #050817

    // Draw Axis Labels
    ctx.fillStyle = axisColor;
    ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textBaseline = 'middle';

    // X-axis (Weeks)
    ctx.textAlign = 'center';
    for (let w = 5; w <= 52; w += 5) {
      const cx = OFFSET_X + (w - 1) * CELL_SPACE + CELL_SPACE / 2;
      ctx.fillText(w.toString(), cx, OFFSET_Y - 15);
    }
    ctx.fillText('WEEKS', OFFSET_X + (52 * CELL_SPACE) / 2, OFFSET_Y - 35);

    // Y-axis (Years)
    ctx.textAlign = 'right';
    for (let y = 5; y <= lifeYears; y += 5) {
      const cy = OFFSET_Y + (y - 1) * CELL_SPACE + CELL_SPACE / 2;
      ctx.fillText(y.toString(), OFFSET_X - 15, cy);
    }

    // Side Title
    ctx.save();
    ctx.translate(15, OFFSET_Y + (lifeYears * CELL_SPACE) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = titleColor;
    ctx.fillText(`LIFE CALENDAR IN WEEKS (${lifeYears} YEARS)`.toUpperCase(), 0, 0);
    ctx.restore();

    // Draw Grid Cells
    for (let i = 0; i < totalWeeks; i++) {
      const col = i % 52;
      const row = Math.floor(i / 52);
      const cx = OFFSET_X + col * CELL_SPACE + CELL_SPACE / 2;
      const cy = OFFSET_Y + row * CELL_SPACE + CELL_SPACE / 2;

      let cellColor = null;

      // 1. Check Custom Ranges (drawn on top)
      for (let j = customRanges.length - 1; j >= 0; j--) {
        if (i >= customRanges[j].start && i <= customRanges[j].end) {
          cellColor = customRanges[j].color;
          break;
        }
      }

      // 2. Check Drag Preview
      if (!cellColor && isDragging && dragStartIdx !== null && dragCurrentIdx !== null) {
        const minIdx = Math.min(dragStartIdx, dragCurrentIdx);
        const maxIdx = Math.max(dragStartIdx, dragCurrentIdx);
        if (i >= minIdx && i <= maxIdx) {
          cellColor = selectedColor;
        }
      }

      // 3. Check Base Lived Auto-Color
      if (!cellColor && i < weeksLived) {
        cellColor = livedColor;
      }

      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);

      if (cellColor) {
        ctx.fillStyle = cellColor;
        ctx.fill();
        ctx.strokeStyle = cellColor;
      } else {
        ctx.strokeStyle = emptyBorderColor;
      }

      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [lifeYears, weeksLived, customRanges, isDragging, dragStartIdx, dragCurrentIdx, selectedColor, canvasWidth, canvasHeight, totalWeeks, isDarkMode]);

  // Redraw when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // --- Interaction Handlers ---
  const getIndexFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - OFFSET_X;
    const y = e.clientY - rect.top - OFFSET_Y;

    if (x < 0 || y < 0 || x >= 52 * CELL_SPACE || y >= lifeYears * CELL_SPACE) {
      return null; // Out of grid bounds
    }

    const col = Math.floor(x / CELL_SPACE);
    const row = Math.floor(y / CELL_SPACE);
    return row * 52 + col;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const idx = getIndexFromEvent(e);
    if (idx !== null) {
      setIsDragging(true);
      setDragStartIdx(idx);
      setDragCurrentIdx(idx);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const idx = getIndexFromEvent(e);

    if (idx !== null && dob) {
      // Calculate tooltip dates
      const start = new Date(`${dob}T00:00:00`);
      start.setDate(start.getDate() + idx * 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);

      const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        week: idx + 1,
        startDate: formatDate(start),
        endDate: formatDate(end)
      });

      // Handle dragging
      if (isDragging && idx !== dragCurrentIdx) {
        setDragCurrentIdx(idx);
      }
    } else {
      setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStartIdx !== null && dragCurrentIdx !== null) {
      const minIdx = Math.min(dragStartIdx, dragCurrentIdx);
      const maxIdx = Math.max(dragStartIdx, dragCurrentIdx);

      setCustomRanges((prev) => [
        ...prev,
        { start: minIdx, end: maxIdx, color: selectedColor }
      ]);
    }
    setIsDragging(false);
    setDragStartIdx(null);
    setDragCurrentIdx(null);
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
    if (isDragging) {
      handleMouseUp(); // Complete the range if dragging out of bounds
    }
  };

  const clearCustomRanges = () => setCustomRanges([]);

  // Utility to convert date to week index
  const dateToWeekIndex = (targetDateStr: string, dobStr: string) => {
    if (!targetDateStr || !dobStr) return -1;
    // Add 'T00:00:00' to prevent time zone offset issues if input is YYYY-MM-DD
    const birthDate = new Date(`${dobStr}T00:00:00`);
    const target = new Date(`${targetDateStr}T00:00:00`);
    if (target < birthDate) return -1;
    const msDiff = target.getTime() - birthDate.getTime();
    return Math.floor(msDiff / (1000 * 60 * 60 * 24 * 7));
  };

  const handleAddDateRange = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!rangeStart || !rangeEnd) {
      setModalError('Please select both dates.');
      return;
    }

    const startIdx = dateToWeekIndex(rangeStart, dob);
    const endIdx = dateToWeekIndex(rangeEnd, dob);

    if (startIdx === -1 || endIdx === -1) {
      setModalError('Dates must be after your date of birth.');
      return;
    }

    if (startIdx > endIdx) {
      setModalError('Start date cannot be after end date.');
      return;
    }

    setCustomRanges((prev) => [
      ...prev,
      { start: startIdx, end: endIdx, color: rangeColor }
    ]);
    setIsModalOpen(false);
    setRangeStart('');
    setRangeEnd('');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#050817] font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">

        {/* Control Panel */}
        <header className="bg-white dark:bg-[#0a0f26] border-b border-slate-200 dark:border-white/10 px-6 py-4 shadow-sm z-10 flex flex-wrap items-end gap-6 shrink-0 transition-colors duration-300">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Life Calendar</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Visualize your life in weeks.</p>
          </div>

          <div className="flex items-center gap-6 ml-auto">

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mb-1 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition shadow-sm border border-slate-200 dark:border-white/10"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <div className="flex flex-col gap-1.5 group">
              <label htmlFor="dob" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="px-3 py-2 bg-slate-50 hover:bg-white dark:bg-black/20 dark:hover:bg-black/40 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20 rounded-lg text-sm font-medium shadow-sm focus:bg-white dark:focus:bg-black/60 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer text-slate-900 dark:text-white dark:[color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-1.5 group">
              <label htmlFor="lifeYears" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Est. Life Years
              </label>
              <input
                id="lifeYears"
                type="number"
                min="10"
                max="120"
                value={lifeYears}
                onChange={(e) => setLifeYears(Number(e.target.value) || 90)}
                className="w-28 px-3 py-2 bg-slate-50 hover:bg-white dark:bg-black/20 dark:hover:bg-black/40 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20 rounded-lg text-sm font-medium shadow-sm focus:bg-white dark:focus:bg-black/60 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="flex flex-col gap-1.5 border-l border-slate-200 dark:border-white/10 pl-6">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Paint Color
              </span>
              <div className="flex gap-1.5">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full shadow-sm border-2 transition-all ${selectedColor === color ? 'border-slate-800 dark:border-white scale-110' : 'border-transparent hover:scale-105'
                      }`}
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end h-full pt-6 gap-2 sm:flex-row">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md text-sm font-medium transition shadow-sm border border-blue-200 dark:border-blue-800 whitespace-nowrap"
              >
                + Date Range
              </button>
              <button
                onClick={clearCustomRanges}
                className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium transition shadow-sm border border-slate-200 dark:border-white/10 whitespace-nowrap"
              >
                Clear Drawing
              </button>
            </div>
          </div>
        </header>

        {/* Canvas Area */}
        <main className="flex-1 overflow-auto bg-slate-100 dark:bg-[#050817] p-8 flex justify-center items-start transition-colors duration-300">
          <div className="bg-white dark:bg-[#0a0f26] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 transition-colors duration-300">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="cursor-crosshair touch-none"
              style={{
                display: 'block',
              }}
            />
          </div>
        </main>

        {/* Modal for adding date range */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 dark:bg-[#050817]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0a0f26] rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-white/10 transition-colors duration-300">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Color Date Range</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddDateRange} className="p-6 space-y-4">
                {modalError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-100 dark:border-red-900/50">
                    {modalError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Start Date</label>
                    <input
                      type="date"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      className="px-3 py-2 bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white dark:[color-scheme:dark]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">End Date</label>
                    <input
                      type="date"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      className="px-3 py-2 bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white dark:[color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Range Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setRangeColor(color)}
                        className={`w-8 h-8 rounded-full shadow-sm border-2 transition-all ${rangeColor === color ? 'border-slate-800 dark:border-white scale-110' : 'border-transparent hover:scale-105'
                          }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-md transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-md shadow-sm transition"
                  >
                    Apply Color
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tooltip Overlay */}
        {tooltip.visible && (
          <div
            className="fixed pointer-events-none z-[100] bg-slate-800 dark:bg-[#0a0f26] border border-transparent dark:border-white/10 text-white dark:text-slate-100 text-xs rounded py-1.5 px-2.5 shadow-lg transform -translate-x-1/2 -translate-y-full transition-opacity duration-75"
            style={{ left: tooltip.x, top: tooltip.y - 15 }}
          >
            <div className="font-bold text-slate-100 mb-0.5">Week {tooltip.week}</div>
            <div className="text-slate-300">{tooltip.startDate} &mdash; {tooltip.endDate}</div>
          </div>
        )}

      </div>
    </div>
  );
}