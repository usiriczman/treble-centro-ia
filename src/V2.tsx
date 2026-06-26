import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidebar from '@/components/Sidebar'
// prompt-input pieces used inline in modal textarea instead of the composable API

// ── Data ───────────────────────────────────────────────────────────────────

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
  { id: '1', name: 'Soporte 24/7', description: 'Resuelve dudas frecuentes sobre envíos y devoluciones.', status: 'Activo', conversations: 1842, createdAt: '12 Jun 2026', icon: 'ri-headphone-line', iconBg: '#f0f0ff', iconColor: '#5b5bd6' },
  { id: '2', name: 'Calificación de leads', description: 'Cualifica prospectos entrantes y los asigna al vendedor correcto.', status: 'Activo', conversations: 934, createdAt: '05 Jun 2026', icon: 'ri-focus-3-line', iconBg: '#fff0f6', iconColor: '#e5177b' },
  { id: '3', name: 'Agenda de citas', description: 'Coordina, confirma y recuerda reuniones automáticamente.', status: 'Inactivo', conversations: 421, createdAt: '28 May 2026', icon: 'ri-calendar-check-line', iconBg: '#f0fff4', iconColor: '#17a34a' },
  { id: '4', name: 'Recuperación de carritos', description: 'Contacta a compradores con carritos abandonados.', status: 'Activo', conversations: 2107, createdAt: '20 May 2026', icon: 'ri-shopping-cart-2-line', iconBg: '#fffbeb', iconColor: '#d97706' },
  { id: '5', name: 'Onboarding de clientes', description: 'Guía a nuevos clientes a través del proceso de activación.', status: 'Borrador', conversations: 0, createdAt: '18 Jun 2026', icon: 'ri-user-star-line', iconBg: '#f0faff', iconColor: '#0284c7' },
]

const modalTemplates = [
  { icon: 'ri-headphone-line', iconBg: '#fff8ec', iconColor: '#d97706', title: 'Soporte al cliente', description: 'Resuelve dudas y abre tickets 24/7.', prompt: 'Un agente de soporte al cliente que responda preguntas frecuentes sobre envíos, devoluciones y estado de pedidos, y escale a un agente humano cuando sea necesario.' },
  { icon: 'ri-focus-3-line', iconBg: '#fdf4ff', iconColor: '#9333ea', title: 'Calificación de leads', description: 'Cualifica y agenda prospectos.', prompt: 'Un agente que califique prospectos entrantes por WhatsApp, identifique su necesidad y presupuesto, y los agende automáticamente con el vendedor correcto.' },
  { icon: 'ri-calendar-check-line', iconBg: '#f0fff4', iconColor: '#17a34a', title: 'Agendamiento de citas', description: 'Coordina y recuerda reuniones.', prompt: 'Un agente que coordine el agendamiento de citas, envíe confirmaciones automáticas y recuerde a los clientes 24 horas y 1 hora antes de su cita.' },
  { icon: 'ri-shopping-cart-2-line', iconBg: '#fff0f6', iconColor: '#e5177b', title: 'Carritos abandonados', description: 'Recupera ventas con seguimientos.', prompt: 'Un agente que contacte a clientes que abandonaron su carrito de compras, ofrezca asistencia personalizada y un incentivo para completar su compra.' },
]

const externalAgents = [
  { icon: 'ri-sparkling-2-line', iconColor: '#ff8c5a', name: 'Claude', description: 'Redacta contenido, analiza documentos y razona sobre problemas complejos.' },
  { icon: 'ri-code-s-slash-line', iconColor: '#94a3b8', name: 'Cursor', description: 'Escribe y edita código en tus repositorios de forma autónoma.' },
]

// ── Status badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AgentStatus }) {
  const config: Record<AgentStatus, { bg: string; color: string; dot: string }> = {
    Activo:   { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
    Inactivo: { bg: '#f5f5f5', color: '#737373', dot: '#d4d4d4' },
    Borrador: { bg: '#fffbeb', color: '#d97706', dot: '#f59e0b' },
  }
  const c = config[status]
  return (
    <span style={{ background: c.bg, color: c.color, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}

// ── Create Agent Modal ─────────────────────────────────────────────────────

function CreateAgentModal({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState('')

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#f8f8f8', borderRadius: 20, width: '100%', maxWidth: 820, maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '20px 20px 0' }}>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#333' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#aaa' }}
          >
            <i className="ri-close-line" style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', padding: '16px 32px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          <h2 style={{ margin: 0, textAlign: 'center', color: '#111', fontSize: 22, fontWeight: 600, lineHeight: 1.3, fontFamily: 'inherit' }}>
            ¿Qué debería hacer tu agente de IA?
          </h2>

          {/* Prompt input */}
          <div style={{ border: '1px solid #e2e2e2', borderRadius: 16, background: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea
              value={prompt}
              rows={2}
              onChange={e => {
                setPrompt(e.target.value)
                const el = e.target
                el.style.height = 'auto'
                el.style.height = `${Math.min(Math.max(el.scrollHeight, 40), 120)}px`
              }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) e.preventDefault() }}
              placeholder="Ej: Gestiona pedidos de Shopify y responde preguntas de estado..."
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', resize: 'none', color: '#111', fontSize: 14, fontFamily: 'inherit', lineHeight: 1.5, minHeight: 40, overflowY: 'auto', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <button
                style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: prompt.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', background: prompt.trim() ? '#111' : '#ececec', color: prompt.trim() ? '#fff' : '#aaa', fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s' }}
              >
                <i className="ri-arrow-up-line" style={{ fontSize: 15 }} />
              </button>
            </div>
          </div>

          {/* Agent templates */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#999', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'inherit' }}>Empieza con una plantilla</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {modalTemplates.map(t => (
                <button key={t.title}
                  onClick={() => setPrompt(t.prompt)}
                  style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 14px', borderRadius: 12, border: '1px solid #e8e8e8', background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8c8c8'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={t.icon} style={{ fontSize: 16, color: t.iconColor }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, color: '#111', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{t.title}</p>
                    <p style={{ margin: '4px 0 0', color: '#999', fontSize: 11, lineHeight: 1.4 }}>{t.description}</p>
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
    <div style={{ display: 'flex', height: '100vh', background: '#f7f7f7', fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <header style={{ background: '#fff', borderBottom: '1px solid #ebebeb', padding: '20px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>Centro de IA</h1>
            <p style={{ margin: '3px 0 0', fontSize: 13, color: '#999' }}>Gestiona y crea tus agentes de inteligencia artificial.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#111', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#333')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111')}
          >
            <i className="ri-add-line" style={{ fontSize: 16 }} />
            Crear agente IA
          </button>
        </header>

        {/* Main */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 36 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebeb', overflow: 'hidden' }}>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
              {['Agente', 'Estado', 'Conversaciones', 'Creado', ''].map((label, i) => (
                <div key={i} style={{ padding: '14px 0', fontSize: 11, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {label}
                </div>
              ))}
            </div>

            {/* Rows */}
            {agents.map((agent, idx) => (
              <AgentRow key={agent.id} agent={agent} last={idx === agents.length - 1} />
            ))}
          </div>
        </main>
      </div>

      {showModal && <CreateAgentModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function AgentRow({ agent, last }: { agent: Agent; last: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
        padding: '0 24px',
        borderBottom: last ? 'none' : '1px solid #f5f5f5',
        background: hovered ? '#fafafa' : '#fff',
        transition: 'background 0.1s',
        alignItems: 'center',
      }}
    >
      {/* Agent name + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 0' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: agent.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className={agent.icon} style={{ fontSize: 17, color: agent.iconColor }} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111' }}>{agent.name}</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#bbb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320 }}>{agent.description}</p>
        </div>
      </div>

      {/* Status */}
      <div style={{ padding: '18px 0' }}>
        <StatusBadge status={agent.status} />
      </div>

      {/* Conversations */}
      <div style={{ padding: '18px 0', fontSize: 14, color: agent.conversations > 0 ? '#333' : '#d4d4d4' }}>
        {agent.conversations > 0 ? agent.conversations.toLocaleString('es-MX') : '—'}
      </div>

      {/* Created */}
      <div style={{ padding: '18px 0', fontSize: 13, color: '#999' }}>{agent.createdAt}</div>

      {/* Actions */}
      <div style={{ padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: hovered ? '#f0f0f0' : 'transparent', color: hovered ? '#555' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.1s, color 0.1s', fontFamily: 'inherit' }}
        >
          <i className="ri-more-line" style={{ fontSize: 15 }} />
        </button>
      </div>
    </div>
  )
}
