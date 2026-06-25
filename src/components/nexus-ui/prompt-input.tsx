import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface PromptInputContextValue {
  value: string
  onValueChange: (value: string) => void
  onSubmit?: () => void
}

const PromptInputContext = React.createContext<PromptInputContextValue>({
  value: '',
  onValueChange: () => {},
})

interface PromptInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: () => void
}

function PromptInput({
  value = '',
  onValueChange,
  onSubmit,
  className,
  children,
  ...props
}: PromptInputProps) {
  return (
    <PromptInputContext.Provider
      value={{ value, onValueChange: onValueChange ?? (() => {}), onSubmit }}
    >
      <div
        className={cn(
          'flex flex-col gap-2 rounded-2xl border border-[#e2e2e2] bg-white px-4 py-3 shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </PromptInputContext.Provider>
  )
}

interface PromptInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>
}

function PromptInputTextarea({
  className,
  ref,
  ...props
}: PromptInputTextareaProps) {
  const { value, onValueChange, onSubmit } = React.useContext(PromptInputContext)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useImperativeHandle(ref, () => textareaRef.current!)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit?.()
    }
    props.onKeyDown?.(e)
  }

  const LINE_HEIGHT = 20 // px, matches text-sm leading
  const MIN_ROWS = 2
  const MAX_ROWS = 6
  const minHeight = LINE_HEIGHT * MIN_ROWS
  const maxHeight = LINE_HEIGHT * MAX_ROWS

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    const next = Math.max(el.scrollHeight, minHeight)
    el.style.height = `${Math.min(next, maxHeight)}px`
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      rows={MIN_ROWS}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full resize-none border-0 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none',
        className
      )}
      style={{ minHeight, overflowY: 'auto' }}
      {...props}
    />
  )
}

function PromptInputActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function PromptInputActionGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      {children}
    </div>
  )
}

interface PromptInputActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  tooltip?: string
}

function PromptInputAction({
  asChild,
  tooltip,
  className,
  children,
  ...props
}: PromptInputActionProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      title={tooltip}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputActionGroup,
  PromptInputAction,
}
