"use client";
import { useCallback, memo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

interface ParticlesBackgroundProps {
  id?: string;
  className?: string;
}

function ParticlesBackground({
  id = "tsparticles",
  className,
}: ParticlesBackgroundProps) {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id={id}
      className={className}
      init={particlesInit}
      options={{
        fpsLimit: 30,
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1500,
            },
            value: 100,
          },
          opacity: {
            value: 0.2,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
            random: true,
          },
        },
        detectRetina: false,
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 30,
                },
              },
            },
          },
        ],
      }}
    />
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ParticlesBackground);
