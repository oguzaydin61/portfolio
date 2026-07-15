"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// ==========================================
// KART BOYUTLARI & MATEMATİKSEL CONFIG (Desktop varsayılanları)
// ==========================================
const PLANE_WIDTH = 320;  
const PLANE_HEIGHT = 384; 
const OVERLAP = -80;      
const TOTAL_PLANES = 26;
const WRAP_LIMIT = (PLANE_WIDTH + OVERLAP) * TOTAL_PLANES;

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡";

// ScrambleText Efekti
const ScrambleText = ({ text, active }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const maxFrames = 10;
    const interval = setInterval(() => {
      if (frame >= maxFrames) {
        setDisplayText(text);
        clearInterval(interval);
        return;
      }
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          return Math.random() > frame / maxFrames
            ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            : text[i];
        })
        .join("");
      setDisplayText(scrambled);
      frame++;
    }, 30);

    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{displayText}</span>;
};

const Tech = () => {
  const scrollX = useMotionValue(0);
  
  const smoothScrollX = useSpring(scrollX, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const scrollVelocity = useVelocity(smoothScrollX);
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Sadece yatay scroll veya shift + vertical scroll tüneli kaydırır, normal dikey scroll'u bozmaz
      if (e.deltaX !== 0 || e.shiftKey) {
        e.preventDefault();
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        scrollX.set(scrollX.get() - delta * 1.5);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollX]);

  const wrap = (min, max, v) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent py-20">
      <main id="sandbox" className="w-full max-w-[1400px] px-4">
        <motion.div
          ref={containerRef}
          className="container select-none relative cursor-grab active:cursor-grabbing"
          onPan={(e, info) => {
            scrollX.set(scrollX.get() + info.delta.x * 2.5);
          }}
        >
          {/* Tech Stack Temalı Header */}
          <div className="header pointer-events-none">
            <div className="title">CORE ENGINE</div>
            <div className="title title-collection">
              TECH STACKS<sup className="title-count">({technologies.length})</sup>
            </div>
          </div>

          <div className="hint pointer-events-none">drag to surf / shift+scroll</div>

          {/* Viewport */}
          <div className="viewport">
            <div className="planes-container">
              {Array.from({ length: TOTAL_PLANES }, (_, i) => (
                <PlaneCard
                  key={i}
                  index={i}
                  wrap={wrap}
                  scrollX={smoothScrollX}
                  scrollVelocity={scrollVelocity}
                  isHovered={hoveredIndex === i}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* CSS Düzenlemeleri (Responsive CSS Değişkenleri ile) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap');

        /* CSS Değişkenleri (Desktop Varsayılanları) */
        :root {
            --plane-width: 320px;
            --plane-height: 384px;
            --container-height: 75vh;
            --translate-y: 40px;
            --plane-padding: 40px;
            --label-line-width: 120px;
        }

        /* MOBİL BOYUTLANDIRMASI (Yarı Yarıya Küçültme) */
        @media (max-width: 768px) {
            :root {
                --plane-width: 160px;       /* Genişlik yarı yarıya indi */
                --plane-height: 192px;      /* Yükseklik yarı yarıya indi */
                --container-height: 50vh;   /* Küçük ekranda dikey alanı biraz daralttık */
                --translate-y: 10px;        /* Ortalama hizalaması */
                --plane-padding: 20px;      /* Logoların taşmaması için padding daraldı */
                --label-line-width: 60px;   /* İsim çizgi boyu yarıya indi */
            }
            .header {
                top: 5vw !important;
                left: 5vw !important;
            }
            .title {
                margin-left: 10px !important;
            }
            .hint {
                bottom: 5vw !important;
                right: 5vw !important;
                font-size: 8px !important;
            }
        }

        .container {
            width: 100%;
            height: var(--container-height); 
            overflow: hidden;
            background: #050505;
            touch-action: pan-y; 
            font-family: "Geist", sans-serif;
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .container * {
            font-family: inherit;
        }

        .header {
            position: absolute;
            z-index: 50;
            font-weight: 600;
            letter-spacing: -0.02em;
            top: 3vw; 
            left: 3vw;
        }

        .title {
            color: white;
            font-size: clamp(20px, 3.5vw, 44px); 
            line-height: 0.9;
            font-weight: normal;
            letter-spacing: -0.02em;
            margin-left: 3vw;
        }

        .title-collection {
            margin-left: 0;
        }

        .title-count {
            font-size: clamp(10px, 0.4em, 0.4em);
            font-weight: 600;
            letter-spacing: normal;
            font-variant-numeric: tabular-nums;
            margin-left: 4px;
            position: relative;
            top: 0.65em;
            vertical-align: top;
            line-height: 0;
        }

        .hint {
            position: absolute;
            z-index: 50;
            display: flex;
            align-items: center;
            font-family: "Geist Mono", monospace;
            text-transform: uppercase;
            bottom: 3vw;
            right: 3vw;
            font-size: 10px;
            letter-spacing: 0.05em;
            color: white;
        }

        .viewport {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 2000px;
            perspective-origin: 10% 10%;
        }

        .planes-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transform-style: preserve-3d;
            transform: translateY(var(--translate-y)); 
        }

        .plane {
            width: var(--plane-width);
            height: var(--plane-height);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: absolute;
            transform-style: preserve-3d;
            border: 1px solid rgba(255, 255, 255, 0.05);
            background: #111111;
            border-radius: 12px;
            transition: filter 0.2s ease;
        }

        .plane-image-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--plane-padding); 
        }

        .plane-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .plane-index {
            position: absolute;
            font-family: "Geist Mono", monospace;
            color: rgba(255, 255, 255, 0.4);
            top: -24px;
            left: 0;
            font-size: 10px;
            font-weight: normal;
            letter-spacing: 0.05em;
        }

        .label-container {
            position: absolute;
            display: flex;
            align-items: center;
            pointer-events: none;
            left: 100%;
            top: 50%;
            margin-left: 12px;
        }

        .label-line {
            width: var(--label-line-width); 
            height: 1px;
            background-color: white;
            transform-origin: left;
        }

        .label-text {
            padding: 4px 8px;
            font-family: "Geist Mono", monospace;
            white-space: nowrap;
            text-transform: uppercase;
            background-color: transparent;
            color: white;
            font-size: 10px;
            font-weight: normal;
            letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};

function PlaneCard({
  index,
  wrap,
  scrollX,
  scrollVelocity,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const tech = technologies[index % technologies.length];

  const hoverYOffset = useSpring(0, {
    stiffness: 400,
    damping: 25,
  });

  const stepX = PLANE_WIDTH + OVERLAP;
  const startX = index * stepX;

  const velocityOffset = useSpring(0, {
    stiffness: 300,
    damping: 20,
    mass: 0.3,
  });

  useMotionValueEvent(scrollVelocity, "change", (latestVelocity) => {
    const currentScroll = scrollX.get();
    const currentX = startX + currentScroll;
    
    const rawX = wrap(-WRAP_LIMIT / 2, WRAP_LIMIT / 2, currentX);
    const normalizedRatio = rawX / (WRAP_LIMIT / 2);
    const waveSin = Math.sin(normalizedRatio * Math.PI * 2);
    
    const targetOffset = (latestVelocity / 50) * waveSin * 5;
    velocityOffset.set(targetOffset);
  });

  useEffect(() => {
    // Mobilde hover hissi daha hafif olsun diye dikey oynamayı azalttık
    hoverYOffset.set(isHovered ? -15 : 0);
  }, [isHovered, hoverYOffset]);

  const transform = useTransform(() => {
    const currentScroll = scrollX.get();
    const velOffsetVal = velocityOffset.get();
    const hoverVal = hoverYOffset.get();
    const currentX = startX + currentScroll;
    
    const r = wrap(-WRAP_LIMIT / 2, WRAP_LIMIT / 2, currentX);
    
    // JS tarafındaki transform hesaplamaları da CSS değişkenlerine göre dinamik olsun diye oranladık
    // Genişlik farkını kompanse etmek için r değerini mobil ekran genişliğinde ölçekliyoruz
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const scaleFactor = isMobile ? 0.5 : 1.0;

    const scaledR = r * scaleFactor;
    const u = scaledR * -0.35 + velOffsetVal + hoverVal;
    const v = scaledR * -1.2;

    return `translate3d(${scaledR}px, ${u}px, ${v}px) rotateY(-50deg)`;
  });

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="plane cursor-pointer"
      style={{
        transform,
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? "brightness(1.15)" : "brightness(1)",
      }}
    >
      <div className="plane-image-container">
        <img
          src={tech.icon}
          alt={tech.name}
          className="plane-image"
          draggable={false}
        />
      </div>

      <div className="plane-index">{String(index).padStart(2, "0")}</div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="label-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="label-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="label-text">
              <ScrambleText text={tech.name} active={isHovered} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SectionWrapper(Tech, "tech");