import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg shadow-lg bg-white w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center bg-white text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6 bg-white" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
Modal.displayName = "Modal"