import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputActionGroup,
  PromptInputAction,
} from '@/components/nexus-ui/prompt-input'

const navItems = [
  { icon: 'ri-chat-3-line', label: 'Conversaciones' },
  { icon: 'ri-robot-2-line', label: 'Centro de IA', active: true },
  { icon: 'ri-contacts-line', label: 'Contactos' },
  { icon: 'ri-links-line', label: 'Links de WhatsApp' },
  { icon: 'ri-megaphone-line', label: 'Anuncios de Meta' },
  { icon: 'ri-layout-column-line', label: 'Plantillas HSM' },
  { icon: 'ri-bar-chart-box-line', label: 'Centro de métricas' },
  { icon: 'ri-line-chart-line', label: 'Métricas generales' },
  { icon: 'ri-book-open-line', label: 'Centro de recursos', external: true },
  { icon: 'ri-settings-3-line', label: 'Configuración' },
  { icon: 'ri-global-line', label: 'Idioma' },
]

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
    // handle submission
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5] font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] min-w-[260px] bg-[#141414] flex flex-col py-5 px-3">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-6">
          <div className="flex items-center justify-center w-7 h-7">
            <i className="ri-asterisk text-white text-xl leading-none" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">treble.ai</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full text-left ${
                item.active
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-[#9a9a9a] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-base leading-none`} />
              <span className="flex-1">{item.label}</span>
              {item.external && (
                <i className="ri-external-link-line text-xs opacity-60" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[#2a2a2a] pt-4 mt-2">
          <p className="px-3 text-xs text-[#555] uppercase tracking-wider mb-2">
            Otras plataformas
          </p>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9a9a9a] hover:bg-[#1f1f1f] hover:text-white transition-colors w-full text-left">
            <i className="ri-store-2-line text-base leading-none" />
            <span className="flex-1">Sales.ai</span>
            <i className="ri-external-link-line text-xs opacity-60" />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-[#fafafa] px-8">
        <div className="w-full max-w-[860px] flex flex-col items-center gap-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-[2rem] font-semibold text-[#111] leading-tight tracking-tight mb-3">
              ¿Qué debería hacer tu agente de IA?
            </h1>
            <p className="text-[#666] text-[0.95rem] leading-relaxed max-w-[420px] mx-auto">
              Describe en lenguaje natural lo que necesitas y construiré un agente listo
              para conversar con tus clientes por WhatsApp.
            </p>
          </div>

          {/* Prompt Input */}
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

          {/* Templates */}
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
