import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import './Toast.css'

export function Toast() {
  const { toast, clearToast } = useCartContext()

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(clearToast, 2200)
    return () => window.clearTimeout(timer)
  }, [toast, clearToast])

  if (!toast) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckCircle2 size={18} strokeWidth={2} />
      <span>{toast}</span>
    </div>
  )
}
