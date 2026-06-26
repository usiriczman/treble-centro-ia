import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidebar from '@/components/Sidebar'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputActionGroup,
  PromptInputAction,
} from '@/components/nexus-ui/prompt-input'

const templates = [
  {
    icon: 'ri-headphone-line',
    title: 'Soporte al cliente',
    description: 'Resuelve dudas frecuentes y abre tickets 24/7.',
  },
  {
    icon: 'ri-focus-3-line',
    title: 'Calificación de leads',
    description: 'Cualifica prospectos y agéndalos con ventas.',
  },
  {
    icon: 'ri-calendar-check-line',
    title: 'Agendamiento de citas',
    description: 'Coordina, confirma y recuerda reuniones.',
  },
  {
    icon: 'ri-shopping-cart-2-line',
    title: 'Carritos abandonados',
    description: 'Recupera ventas con seguimientos.',
  },
]

export default function App() {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => {
    if (!prompt.trim()) return
  }

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-[860px] flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-[2rem] font-semibold text-[#111] leading-tight tracking-tight mb-3">
              ¿Qué debería hacer tu agente de IA?
            </h1>
            <p className="text-[#666] text-[0.95rem] leading-relaxed max-w-[420px] mx-auto">
              Describe en lenguaje natural lo que necesitas y construiré un agente listo
              para conversar con tus clientes por WhatsApp.
            </p>
          </div>

          <div className="w-full">
            <PromptInput
              value={prompt}
              onValueChange={setPrompt}
              onSubmit={handleSubmit}
              className="w-full"
            >
              <PromptInputTextarea
                placeholder="Ej: Un agente de soporte que responda preguntas frecuentes sobre envíos, devoluciones y estado de pedidos..."
              />
              <PromptInputActions>
                <PromptInputActionGroup>
                  <PromptInputAction tooltip="Adjuntar archivo">
                    <i className="ri-attachment-2 text-lg text-[#888]" />
                  </PromptInputAction>
                </PromptInputActionGroup>
                <PromptInputActionGroup>
                  <PromptInputAction
                    onClick={handleSubmit}
                    disabled={!prompt.trim()}
                    className={`rounded-lg w-8 h-8 flex items-center justify-center transition-colors ${
                      prompt.trim()
                        ? 'bg-[#111] text-white hover:bg-[#333]'
                        : 'bg-[#e8e8e8] text-[#aaa]'
                    }`}
                    tooltip="Enviar"
                  >
                    <i className="ri-arrow-up-line text-base" />
                  </PromptInputAction>
                </PromptInputActionGroup>
              </PromptInputActions>
            </PromptInput>
          </div>

          <div className="w-full">
            <p className="text-xs font-semibold text-[#aaa] uppercase tracking-widest mb-3">
              Empieza con una plantilla
            </p>
            <div className="grid grid-cols-4 gap-3">
              {templates.map((t) => (
                <button
                  key={t.title}
                  className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-[#eee] text-left hover:border-[#ccc] hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f0f0ff] flex items-center justify-center">
                    <i className={`${t.icon} text-[#5b5bd6] text-base`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111] leading-snug">{t.title}</p>
                    <p className="text-xs text-[#888] mt-0.5 leading-snug">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
