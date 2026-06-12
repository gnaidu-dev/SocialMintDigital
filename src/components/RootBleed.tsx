/**
 * RootBleed — Lavender vein network that adapts to page lighting.
 * TWO fixed layers, same SVG paths:
 *   Layer 1: mix-blend-mode: multiply  → dark veins on light Hero bg
 *   Layer 2: mix-blend-mode: screen    → glowing veins on dark Services/Footer bg
 * Zero JS. Zero scroll listeners. Single paint each, never repaints.
 */

const PATHS = `
  M720 0 C718 90, 712 180, 707 270 C702 360, 696 450, 691 540 C686 630, 682 720, 678 900
  M714 90 C674 140, 608 172, 522 218 C436 264, 328 298, 200 348 C72 398, 10 422, -10 448
  M707 210 C662 258, 584 290, 478 336 C372 382, 248 412, 110 460 C-10 500, -20 522, -10 558
  M698 378 C648 428, 562 460, 444 506 C326 552, 192 578, 60 618 C-18 642, -28 658, -10 682
  M692 528 C636 578, 544 608, 418 652 C292 696, 152 720, 20 758
  M684 688 C626 736, 532 764, 398 804 C264 844, 118 864, -10 892
  M726 90 C766 140, 832 172, 918 218 C1004 264, 1112 298, 1240 348 C1368 398, 1430 422, 1450 448
  M733 210 C778 258, 856 290, 962 336 C1068 382, 1192 412, 1330 460 C1450 500, 1470 522, 1450 558
  M742 378 C792 428, 878 460, 996 506 C1114 552, 1248 578, 1380 618 C1458 642, 1468 658, 1450 682
  M748 528 C804 578, 896 608, 1022 652 C1148 696, 1288 720, 1420 758
  M756 688 C814 736, 908 764, 1042 804 C1176 844, 1322 864, 1450 892
  M690 490 C672 548, 654 608, 638 668 C622 728, 612 788, 604 858
  M696 490 C714 548, 732 608, 750 668 C764 720, 775 780, 782 858
`;

// Parse multi-line path string into individual d values
const dValues = PATHS.trim().split('\n').map(s => s.trim()).filter(Boolean);

const hairlines = [
  { d: "M676 148 C622 192, 538 222, 420 270",  w: 0.6, o: 0.30 },
  { d: "M656 268 C594 316, 502 350, 374 400",  w: 0.5, o: 0.22 },
  { d: "M634 428 C566 474, 466 508, 334 554",  w: 0.4, o: 0.18 },
  { d: "M614 590 C546 634, 442 666, 306 706",  w: 0.4, o: 0.14 },
  { d: "M522 218 C468 262, 384 292, 276 340 C168 388, 78 412, 0 438", w: 0.8, o: 0.26 },
  { d: "M764 148 C818 192, 902 222, 1020 270", w: 0.6, o: 0.30 },
  { d: "M784 268 C846 316, 938 350, 1066 400", w: 0.5, o: 0.22 },
  { d: "M806 428 C874 474, 974 508, 1106 554", w: 0.4, o: 0.18 },
  { d: "M826 590 C894 634, 998 666, 1134 706", w: 0.4, o: 0.14 },
  { d: "M918 218 C974 262, 1058 292, 1164 340 C1272 388, 1362 412, 1450 438", w: 0.8, o: 0.26 },
  { d: "M654 630 C622 670, 580 700, 518 742 C446 788, 352 812, 240 848", w: 0.5, o: 0.16 },
  { d: "M750 630 C784 670, 830 700, 900 742 C980 788, 1080 812, 1202 848", w: 0.5, o: 0.16 },
];

const nodes = [
  { cx: 720, cy: 2,   r: 6,   o: 0.55 },
  { cx: 714, cy: 90,  r: 3.5, o: 0.50 },
  { cx: 726, cy: 90,  r: 3.5, o: 0.50 },
  { cx: 707, cy: 210, r: 3,   o: 0.40 },
  { cx: 733, cy: 210, r: 3,   o: 0.40 },
  { cx: 698, cy: 378, r: 2.5, o: 0.32 },
  { cx: 742, cy: 378, r: 2.5, o: 0.32 },
  { cx: 690, cy: 490, r: 2,   o: 0.26 },
  { cx: 696, cy: 490, r: 2,   o: 0.26 },
  { cx: 684, cy: 688, r: 1.8, o: 0.20 },
  { cx: 756, cy: 688, r: 1.8, o: 0.20 },
];

// Primary stroke widths: trunk=2.5, L/R primary=2, secondary=1.4, deep=1.1, subtle=0.9/0.7
const strokeWidths = [2.5, 2, 1.4, 1.1, 0.9, 0.7, 2, 1.4, 1.1, 0.9, 0.7, 1.4, 1.4];
const strokeOpacity = [1, 1, 0.65, 0.75, 0.55, 0.22, 1, 0.65, 0.75, 0.55, 0.22, 0.50, 0.50];

function VeinSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{
        filter: 'drop-shadow(0 0 12px rgba(128, 0, 255, 0.45)) drop-shadow(0 0 4px rgba(255, 42, 133, 0.35))'
      }}
    >
      <defs>
        <linearGradient id="glow-t" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FF2A85" />
          <stop offset="50%"  stopColor="#8000FF" />
          <stop offset="100%" stopColor="#00FFC2" />
        </linearGradient>
        <linearGradient id="glow-l" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8000FF" />
          <stop offset="100%" stopColor="#FF2A85" />
        </linearGradient>
        <linearGradient id="glow-r" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#8000FF" />
          <stop offset="100%" stopColor="#00FFC2" />
        </linearGradient>
        <linearGradient id="glow-d" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#00FFC2" />
          <stop offset="100%" stopColor="#8000FF" />
        </linearGradient>
      </defs>

      {/* Primary paths — gradient strokes */}
      {dValues.map((d, i) => {
        const gradId = i === 0 ? "glow-t"
          : i < 6  ? "glow-l"
          : i < 11 ? "glow-r"
          : "glow-d";
        return (
          <path
            key={i}
            d={d}
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidths[i] * 1.3}
            strokeLinecap="round"
            fill="none"
            opacity={Math.min(1, strokeOpacity[i] * 0.45)}
          />
        );
      })}

      {/* Hairline tendrils */}
      {hairlines.map((h, i) => (
        <path key={i} d={h.d} stroke="#8000FF" strokeWidth={h.w * 1.3} fill="none" opacity={Math.min(0.9, h.o * 0.6)} />
      ))}

      {/* Junction nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r * 1.4} fill="#00FFC2" opacity={Math.min(1, n.o * 0.6)} />
      ))}
    </svg>
  );
}

export default function RootBleed() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0, mixBlendMode: 'normal', willChange: 'transform' }}
      aria-hidden="true"
    >
      <VeinSVG />
    </div>
  );
}
