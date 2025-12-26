import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

// Interactive MacBook 3D Component
const MacBookModel = () => {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {/* MacBook Base/Bottom */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.12, 1.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.08} />
      </mesh>

      {/* MacBook Screen - Closed position */}
      <group position={[0, 0.08, -0.08]} rotation={[0.35, 0, 0]}>
        {/* Screen Bezel */}
        <mesh>
          <boxGeometry args={[2.38, 1.5, 0.015]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.05} />
        </mesh>

        {/* Display Panel */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.28, 1.42, 0.001]} />
          <meshStandardMaterial
            color="#050505"
            emissive="#ff6b00"
            emissiveIntensity={0.12}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Notch */}
        <mesh position={[0, 0.68, 0.02]}>
          <boxGeometry args={[0.4, 0.08, 0.001]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Keyboard Deck */}
      <mesh position={[0, 0.012, 0.25]}>
        <boxGeometry args={[2.32, 0.025, 1.55]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.12} />
      </mesh>

      {/* Side Ports - Left */}
      <mesh position={[-1.22, 0.06, 0.2]}>
        <boxGeometry args={[0.06, 0.08, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Side Ports - Right */}
      <mesh position={[1.22, 0.06, 0.2]}>
        <boxGeometry args={[0.06, 0.08, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Apple Logo Area */}
      <mesh position={[0, 0.086, 0.7]}>
        <boxGeometry args={[0.25, 0.015, 0.12]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Feet/Rubber Pads */}
      {[
        [-0.8, -0.062, 0.5],
        [0.8, -0.062, 0.5],
        [-0.8, -0.062, -0.5],
        [0.8, -0.062, -0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.15, 0.008, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Canvas Scene with Zoom Control
const MacBookScene = () => {
  const { camera } = useThree()
  const [zoom, setZoom] = useState(5)
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const canvas = document.querySelector("#macbook-canvas")
      if (!canvas?.contains(e.target as Node)) return

      e.preventDefault()
      setZoom((prev) => {
        const newZoom = prev + (e.deltaY > 0 ? 0.3 : -0.3)
        return Math.max(2, Math.min(10, newZoom))
      })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  useEffect(() => {
    camera.position.z = zoom
    camera.updateProjectionMatrix()
  }, [zoom, camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 8]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, 8, -8]} intensity={0.8} color="#ff6b00" />
      <pointLight position={[0, -5, 0]} intensity={0.4} color="#ffffff" />

      <OrbitControls ref={controlsRef} enableZoom={false} autoRotate={false} enablePan={false} rotateSpeed={0.8} />
      <MacBookModel />
      <Environment preset="studio" />
    </>
  )
}

export const MacBookViewer: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 3D Canvas */}
      <div id="macbook-canvas" className="w-full h-screen">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <MacBookScene />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-6 z-10">
          <div className="space-y-2">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">MACBOOK</h2>
            <p className="text-[#ff6b00] font-serif italic text-2xl md:text-4xl font-light">Pro M1 16"</p>
          </div>
          <p className="text-slate-400 text-sm md:text-base font-light tracking-widest uppercase">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto px-6 pb-12 pt-24">
          <div className="bg-black/50 backdrop-blur-xl border border-[#ff6b00]/20 rounded-3xl p-8 space-y-4 pointer-events-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div>
                <p className="text-[#ff6b00] font-mono text-xs uppercase tracking-widest mb-3">
                  Central Processing Unit
                </p>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">Apple Silicon M1</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  8-core CPU with up to 20-core GPU, 16GB unified memory, ensuring flawless performance for
                  architecture, design, and full-stack development workflows.
                </p>
              </div>
              <div className="text-right space-y-2 text-slate-300 text-sm md:text-base">
                <p className="font-mono">16" Liquid Retina XDR Display</p>
                <p className="font-mono">512GB SSD Storage</p>
                <p className="text-slate-500 text-xs">The epicenter of creation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
