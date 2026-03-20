// MeteorShower.js - subtle version
import { useEffect, useRef } from "react";

export const MeteorShower = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const meteors = [];
    const meteorCount = 50;

    for (let i = 0; i < meteorCount; i++) {
      meteors.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        length: Math.random() * 30 + 5, // smaller streaks
        speed: Math.random() * 1 + 0.2, // slower
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      meteors.forEach((m) => {
        const opacity = Math.random() * 0.3 + 0.2; // subtle
        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x + Math.cos(m.angle) * m.length,
          m.y + Math.sin(m.angle) * m.length,
        );
        gradient.addColorStop(0, `rgba(200,200,255,${opacity})`);
        gradient.addColorStop(1, "rgba(200,200,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5; // thinner streaks
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(200,200,255,0.2)`;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x + Math.cos(m.angle) * m.length,
          m.y + Math.sin(m.angle) * m.length,
        );
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;

        if (m.x > width || m.y > height) {
          m.x = Math.random() * width;
          m.y = -20;
          m.length = Math.random() * 30 + 5;
          m.speed = Math.random() * 1 + 0.2;
          m.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
    />
  );
};
