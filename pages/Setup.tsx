"use client"

import type React from "react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, Float, PresentationControls, Html } from "@react-three/drei"
import * as THREE from "three"
import {
  Monitor,
  Keyboard,
  MousePointer,
  Cpu,
  Speaker,
  Coffee,
  Smartphone,
  Globe,
  Code2,
  Database,
  Layers,
  AppWindow,
  Command,
  Box,
  Loader2,
} from "lucide-react"
import { MacBookViewer } from "./macbook-viewer.tsx"

// Define R3F elements as local components to bypass JSX intrinsic element type errors
// @ts-ignore
const Group = "group" as any
// @ts-ignore
const Primitive = "primitive" as any
// @ts-ignore
const AmbientLight = "ambientLight" as any
// @ts-ignore
const SpotLight = "spotLight" as any
// @ts-ignore
const PointLight = "pointLight" as any

// High-quality community-hosted MacBook Pro GLB model
const MACBOOK_MODEL_URL = "./models/macbook_pro_14_space_gray.glb";

const MacbookModel: React.FC<{ mouseX: number; mouseY: number }> = ({ mouseX, mouseY }) => {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const model = useGLTF(MACBOOK_MODEL_URL)
  let scene = null

  if (model.scene) {
    scene = model.scene
    if (!modelLoaded) {
      setModelLoaded(true)
    }
  }

  useFrame(() => {
    if (!group.current) return

    // Smoothly rotate based on cursor
    const targetRotationY = mouseX * 0.4
    const targetRotationX = -mouseY * 0.2

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05)
  })

  return (
    <Group ref={group}>
      {scene ? (
        <Primitive object={scene} position={[0, -0.8, 0]} scale={14}>
          <Html transform occlude distanceFactor={1.16} position={[0, 1.05, -1.06]} rotation-x={-0.256}>
            <div className="w-[334px] h-[216px] bg-[#050505] overflow-hidden flex flex-col p-4 select-none">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-[7px] font-mono text-slate-600 tracking-widest uppercase flex items-center gap-1">
                  <Command size={8} /> ARTISAN-OS M4
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 flex-grow content-center">
                {[Code2, Layers, Database, Box, Globe, Cpu, AppWindow, Coffee].map((Icon, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-1 animate-pulse"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="p-2 bg-[#ff6b00]/10 border border-[#ff6b00]/20 rounded-lg">
                      <Icon size={16} className="text-[#ff6b00]" />
                    </div>
                    <div className="w-6 h-0.5 bg-white/5 rounded-full"></div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex justify-center pb-1">
                <div className="h-0.5 w-12 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </Html>
        </Primitive>
      ) : (
        <Group position={[0, -0.8, 0]}>
          <Html center position={[0, 0, 0]}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-64 h-40 bg-gradient-to-br from-[#ff6b00]/20 to-[#ff6b00]/5 border border-[#ff6b00]/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <Monitor className="w-16 h-16 text-[#ff6b00] mx-auto mb-3 opacity-60" />
                  <p className="text-sm text-white/60 font-mono">MacBook Model</p>
                </div>
              </div>
            </div>
          </Html>
        </Group>
      )}
    </Group>
  )
}

const Setup: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const gearItems = [
    {
      icon: Monitor,
      title: 'LG 38" UltraWide Curved',
      desc: "Perfect for sprawling Laravel controllers and database schemas.",
    },
    {
      icon: Globe,
      title: "IKEA IDÅSEN Desk",
      desc: "Sturdy, motorized sit-stand desk for long architecture sessions.",
    },
    {
      icon: Keyboard,
      title: "Keychron Q1 Max",
      desc: "Custom mechanical keyboard with brown switches for tactile feedback.",
    },
    {
      icon: MousePointer,
      title: "Logitech MX Master 3S",
      desc: "Precision scrolling through endless logs and documentation.",
    },
    { icon: Speaker, title: "Audioengine A2+", desc: "Clean audio for deep focus playlists and podcasts." },
    { icon: Smartphone, title: "iPhone 15 Pro", desc: "For mobile testing and multi-factor authentication." },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-0 opacity-40 blur-[150px] pointer-events-none">
            <div className="aspect-[2/1] bg-gradient-to-tr from-[#ff6b00] via-orange-900 to-transparent rounded-full"></div>
          </div>

          <div className="relative z-10 mb-10">
            <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block mb-4">
              Workspace Environment
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              STUDIO <br /> <span className="font-serif italic font-light lowercase text-[#ff6b00]">setup</span>
            </h1>
          </div>

          {/* 3D Scene */}
          <div className="relative w-full h-[500px] md:h-[600px] mt-4 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 1, 6.5], fov: 35 }} dpr={[1, 2]}>
              <Suspense
                fallback={
                  <Html center>
                    <Loader2 className="w-12 h-12 text-[#ff6b00] animate-spin" />
                  </Html>
                }
              >
                <AmbientLight intensity={0.8} />

                <SpotLight position={[8, 12, 8]} angle={0.25} penumbra={1.5} intensity={2} color="#ff6b00" />

                <SpotLight position={[-8, 8, -10]} angle={0.2} penumbra={1} intensity={1.2} color="#ffffff" />

                <PointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />

                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-0.4, 0.2]}
                  azimuth={[-1, 1]}
                  snap
                >
                  <Float rotationIntensity={0.5} floatIntensity={1} speed={2}>
                    <MacbookModel mouseX={mousePos.x} mouseY={mousePos.y} />
                  </Float>
                </PresentationControls>

                <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={25} blur={3} far={5} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        </section>

        {/* Studio Philosophy */}
        <section className="max-w-4xl mx-auto text-center space-y-12 px-4 reveal-section">
          <div className="flex justify-center mb-4">
            <div className="p-5 bg-white/5 rounded-full border border-white/10 text-[#ff6b00]">
              <Cpu size={40} strokeWidth={1} />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            ENGINEERED FOR <span className="text-[#ff6b00] font-serif italic font-light lowercase">precision</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
            My workspace is architected for deep work. Leveraging the efficiency of Apple Silicon M4 with an UltraWide
            ecosystem allows me to maintain complex domain models in mind while executing performance-critical code.
          </p>
          <div className="flex justify-center items-center gap-8 text-[#ff6b00] font-mono text-sm tracking-[0.3em] uppercase">
            <span className="h-px flex-grow bg-gradient-to-r from-transparent to-[#ff6b00]"></span>
            <span className="shrink-0">SYSTEM SPECS 2024</span>
            <span className="h-px flex-grow bg-gradient-to-l from-transparent to-[#ff6b00]"></span>
          </div>
        </section>

        {/* Hardware Grid */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              HARDWARE <span className="text-[#ff6b00] font-serif italic font-light lowercase">& gear</span>
            </h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Selected Inventory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gearItems.map((item, i) => (
              <div
                key={i}
                className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-white/[0.04] hover:border-[#ff6b00]/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-8 p-5 bg-white/5 w-fit rounded-2xl text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-500">
                  <item.icon size={32} strokeWidth={1.2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Essentials */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center pb-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.4em] block">
                Sustained Performance
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                THE CRAFT <br />{" "}
                <span className="text-[#ff6b00] font-serif italic font-light lowercase">essentials</span>
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Herman Miller Embody",
                  value: "The pinnacle of posture support for marathon architecture reviews.",
                },
                {
                  title: "Elgato Key Light Air",
                  value: "Diffused lighting for professional engineering pair-programming.",
                },
                {
                  title: "Peak Design Tech Ecosystem",
                  value: "Modular storage keeping every bit of hardware precisely organized.",
                },
              ].map((acc, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-2 h-auto bg-white/5 rounded-full overflow-hidden">
                    <div className="w-full h-0 group-hover:h-full bg-[#ff6b00] transition-all duration-700"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#ff6b00] transition-colors">
                      {acc.title}
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed">{acc.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] bg-[#0d0d0d] rounded-[4rem] border border-white/10 overflow-hidden group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1200"
              alt="Workspace Closeup"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
              <div>
                <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-widest block mb-3">
                  Reference Image
                </span>
                <p className="text-xl text-white font-bold uppercase tracking-tighter leading-tight">
                  Minimalist Workspace <br /> Aesthetic
                </p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black transition-all cursor-pointer">
                <Coffee size={32} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* MacBook Viewer Section */}
        <MacBookViewer />
      </div>
    </div>
  )
}

export default Setup
