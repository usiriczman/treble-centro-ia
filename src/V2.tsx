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

// ── Mock data ──────────────────────────────────────────────────────────────

type AgentStatus = 'Activo' | 'Inactivo' | 'Borrador'

interface Agent {
  id: string
  name: string
  description: string
  status: AgentStatus
  conversations: number
  createdAt: string
  icon: string
  iconBg: string
  iconColor: string
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Soporte 24/7',
    description: 'Resuelve dudas frecuentes sobre envíos y devoluciones.',
    status: 'Activo',
    conversations: 1842,
    createdAt: '12 Jun 2026',
    icon: 'ri-headphone-line',
    iconBg: '#f0f0ff',
    iconColor: '#5b5bd6',
  },
  {
    id: '2',
    name: 'Calificación de leads',
    description: 'Cualifica prospectos entrantes y los asigna al vendedor correcto.',
    status: 'Activo',
    conversations: 934,
    createdAt: '05 Jun 2026',
    icon: 'ri-focus-3-line',
    iconBg: '#fff0f6',
    iconColor: '#e5177b',
  },
  {
    id: '3',
    name: 'Agenda de citas',
    description: 'Coordina, confirma y recuerda reuniones automáticamente.',
    status: 'Inactivo',
    conversations: 421,
    createdAt: '28 May 2026',
    icon: 'ri-calendar-check-line',
    iconBg: '#f0fff4',
    iconColor: '#17a34a',
  },
  {
    id: '4',
    name: 'Recuperación de carritos',
    description: 'Contacta a compradores con carritos abandonados.',
    status: 'Activo',
    conversations: 2107,
    createdAt: '20 May 2026',
    icon: 'ri-shopping-cart-2-line',
    iconBg: '#fffbeb',
    iconColor: '#d97706',
  },
  {
    id: '5',
    name: 'Onboarding de clientes',
    description: 'Guía a nuevos clientes a través del proceso de activación.',
    status: 'Borrador',
    conversations: 0,
    createdAt: '18 Jun 2026',
    icon: 'ri-user-star-line',
    iconBg: '#f0faff',
    iconColor: '#0284c7',
  },
]

// ── Modal templates ────────────────────────────────────────────────────────

const templates = [
  { icon: 'ri-headphone-line', iconBg: '#fff8ec', iconColor: '#d97706', title: 'Soporte al cliente', description: 'Resuelve dudas y abre tickets 24/7.' },
  { icon: 'ri-focus-3-line', iconBg: '#fdf4ff', iconColor: '#9333ea', title: 'Calificación de leads', description: 'Cualifica y agenda prospectos.' },
  { icon: 'ri-calendar-check-line', iconBg: '#f0fff4', iconColor: '#17a34a', title: 'Agendamiento de citas', description: 'Coordina y recuerda reuniones.' },
  { icon: 'ri-shopping-cart-2-line', iconBg: '#fff0f6', iconColor: '#e5177b', title: 'Carritos abandonados', description: 'Recupera ventas con seguimientos.' },
]

const externalAgents = [
  {
    icon: 'ri-sparkling-2-line',
    iconBg: '#1a1a1a',
    iconColor: '#ff6b35',
    name: 'Claude',
    description: 'Redacta contenido, analiza documentos y razona sobre problemas complejos.',
  },
  {
    icon: 'ri-code-s-slash-line',
    iconBg: '#1a1a1a',
    iconColor: '#a0aec0',
    name: 'Cursor',
    description: 'Escribe y edita código en tus repositorios de forma autónoma.',
  },
]

// ── Status badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AgentStatus }) {
  const styles: Record<AgentStatus, string> = {
    Activo: 'bg-[#f0fff4] text-[#17a34a]',
    Inactivo: 'bg-[#f5f5f5] text-[#888]',
    Borrador: 'bg-[#fffbeb] text-[#d97706]',
  }
  const dots: Record<AgentStatus, string> = {
    Activo: 'bg-[#17a34a]',
    Inactivo: 'bg-[#bbb]',
    Borrador: 'bg-[#d97706]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  )
}

// ── Create Agent Modal ─────────────────────────────────────────────────────

function CreateAgentModal({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => {
    if (!prompt.trim()) return
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-[680px] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#1c1c1c', maxHeight: '90vh' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2 shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-[#888] hover:text-white transition-colors">
              <i className="ri-pencil-line text-base" />
              Crear en blanco
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-md text-[#666] hover:text-white hover:bg-[#2a2a2a] transition-colors"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-6 flex flex-col gap-6">
          {/* Title */}
          <h2 className="text-white text-[1.45rem] font-semibold text-center leading-snug pt-2">
            ¿Qué debería hacer tu agente de IA?
          </h2>

          {/* Prompt input */}
          <PromptInput
            value={prompt}
            onValueChange={setPrompt}
            onSubmit={handleSubmit}
            className="w-full !border-[#333] !bg-[#252525]"
          >
            <PromptInputTextarea
              placeholder="Ej: Gestiona pedidos de Shopify y responde preguntas de estado..."
              className="!text-white !placeholder-[#555]"
            />
            <PromptInputActions>
              <PromptInputActionGroup />
              <PromptInputActionGroup>
                <PromptInputAction
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className={`rounded-lg w-8 h-8 flex items-center justify-center transition-colors ${
                    prompt.trim()
                      ? 'bg-white text-[#111] hover:bg-[#ddd]'
                      : 'bg-[#333] text-[#555]'
                  }`}
                  tooltip="Enviar"
                >
                  <i className="ri-arrow-up-line text-base" />
                </PromptInputAction>
              </PromptInputActionGroup>
            </PromptInputActions>
          </PromptInput>

          {/* Agent templates */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-[#ccc]">Plantillas de agentes</p>
              <button className="flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors">
                Ver marketplace
                <i className="ri-arrow-right-up-line text-xs" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {templates.map((t) => (
                <button
                  key={t.title}
                  className="flex flex-col gap-2.5 p-3.5 rounded-xl border border-[#2e2e2e] bg-[#222] text-left hover:border-[#444] hover:bg-[#282828] transition-all"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: t.iconBg }}
                  >
                    <i className={`${t.icon} text-base`} style={{ color: t.iconColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-snug">{t.title}</p>
                    <p className="text-xs text-[#666] mt-0.5 leading-snug">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* External agents */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-medium text-[#ccc]">Agentes externos</p>
              <i className="ri-information-line text-sm text-[#555]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {externalAgents.map((a) => (
                <button
                  key={a.name}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#2e2e2e] bg-[#222] text-left hover:border-[#444] hover:bg-[#282828] transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: a.iconBg, border: '1px solid #333' }}
                  >
                    <i className={`${a.icon} text-lg`} style={{ color: a.iconColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{a.name}</p>
                    <p className="text-xs text-[#666] mt-0.5 leading-snug">{a.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── V2 Page ────────────────────────────────────────────────────────────────

export default function V2() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-[#ebebeb] bg-white">
          <div>
            <h1 className="text-lg font-semibold text-[#111] leading-none">Centro de IA</h1>
            <p className="text-sm text-[#888] mt-0.5">Gestiona y crea tus agentes de inteligencia artificial.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            <i className="ri-add-line text-base" />
            Crear agente IA
          </button>
        </header>

        {/* Table */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="bg-white rounded-xl border border-[#ebebeb] overflow-hidden">
            {/* Table header */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#f0f0f0]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#888] uppercase tracking-wider w-[40%]">
                    Agente
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#888] uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#888] uppercase tracking-wider">
                    Conversaciones
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#888] uppercase tracking-wider">
                    Creado
                  </th>
                  <th className="px-5 py-3.5 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5]">
                {agents.map((agent) => (
                  <tr key={agent.id} className="group hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: agent.iconBg }}
                        >
                          <i className={`${agent.icon} text-base`} style={{ color: agent.iconColor }} />
                        </div>
                        <div>
                          <p className="font-medium text-[#111]">{agent.name}</p>
                          <p className="text-xs text-[#aaa] mt-0.5 max-w-xs truncate">{agent.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={agent.status} />
                    </td>
                    <td className="px-5 py-4 text-[#444]">
                      {agent.conversations > 0
                        ? agent.conversations.toLocaleString('es-MX')
                        : <span className="text-[#ccc]">—</span>}
                    </td>
                    <td className="px-5 py-4 text-[#888]">{agent.createdAt}</td>
                    <td className="px-5 py-4">
                      <button className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-7 h-7 rounded-md text-[#aaa] hover:text-[#111] hover:bg-[#f0f0f0] transition-all">
                        <i className="ri-more-line text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showModal && <CreateAgentModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
