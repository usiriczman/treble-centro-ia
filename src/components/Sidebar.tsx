import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { icon: 'ri-chat-3-line', label: 'Conversaciones', path: '#' },
  { icon: 'ri-robot-2-line', label: 'Centro de IA', path: '/' },
  { icon: 'ri-contacts-line', label: 'Contactos', path: '#' },
  { icon: 'ri-links-line', label: 'Links de WhatsApp', path: '#' },
  { icon: 'ri-megaphone-line', label: 'Anuncios de Meta', path: '#' },
  { icon: 'ri-layout-column-line', label: 'Plantillas HSM', path: '#' },
  { icon: 'ri-bar-chart-box-line', label: 'Centro de métricas', path: '#' },
  { icon: 'ri-line-chart-line', label: 'Métricas generales', path: '#' },
  { icon: 'ri-book-open-line', label: 'Centro de recursos', path: '#', external: true },
  { icon: 'ri-settings-3-line', label: 'Configuración', path: '#' },
  { icon: 'ri-global-line', label: 'Idioma', path: '#' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="w-[220px] min-w-[220px] bg-[#141414] flex flex-col py-5 px-3">
      <div className="flex items-center gap-2 px-3 mb-6">
        <div className="flex items-center justify-center w-7 h-7">
          <i className="ri-asterisk text-white text-xl leading-none" />
        </div>
        <span className="text-white font-semibold text-base tracking-tight">treble.ai</span>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => {
          const active = item.path !== '#' && location.pathname === item.path
          return (
            <button
              key={item.label}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full text-left ${
                active
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-[#9a9a9a] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-base leading-none`} />
              <span className="flex-1">{item.label}</span>
              {item.external && <i className="ri-external-link-line text-xs opacity-60" />}
            </button>
          )
        })}
      </nav>

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
  )
}
