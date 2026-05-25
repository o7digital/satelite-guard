'use client'

import { useEffect, useState } from 'react'
import type { StoreProduct } from './SyscomStoreSection'

const storageKey = 'satellite-guard-quote-products'
const eventName = 'satellite-guard-quote-products-updated'

function productLine(product: StoreProduct) {
  return `- ${product.title}${product.model ? ` | Modelo: ${product.model}` : ''}${product.price ? ` | Precio: ${product.price}` : ''}`
}

function buildMessage(products: StoreProduct[]) {
  if (products.length === 0) return ''

  return `Hola, quiero solicitar una cotización para estos productos:\n\n${products.map(productLine).join('\n')}`
}

function readSelectedProducts() {
  if (typeof window === 'undefined') return []

  try {
    const rawValue = window.localStorage.getItem(storageKey)
    if (!rawValue) return []
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? (parsed as StoreProduct[]) : []
  } catch {
    return []
  }
}

export default function QuoteForm() {
  const [selectedProducts, setSelectedProducts] = useState<StoreProduct[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const syncSelectedProducts = () => {
      const products = readSelectedProducts()
      setSelectedProducts(products)
      setMessage((currentMessage) => currentMessage || buildMessage(products))
    }

    syncSelectedProducts()
    window.addEventListener(eventName, syncSelectedProducts)
    window.addEventListener('storage', syncSelectedProducts)

    return () => {
      window.removeEventListener(eventName, syncSelectedProducts)
      window.removeEventListener('storage', syncSelectedProducts)
    }
  }, [])

  useEffect(() => {
    setMessage(buildMessage(selectedProducts))
  }, [selectedProducts])

  return (
    <form
      action="https://formspree.io/f/xnjwkdqg"
      method="POST"
      className="rounded-2xl border border-white/10 bg-black/20 p-5"
    >
      <div className="grid gap-3">
        {selectedProducts.length > 0 ? (
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
            {selectedProducts.length} producto{selectedProducts.length > 1 ? 's' : ''} seleccionado
            {selectedProducts.length > 1 ? 's' : ''} para cotización.
          </div>
        ) : null}
        <input
          name="nombre"
          required
          placeholder="Nombre"
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Correo electrónico"
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <textarea
          name="mensaje"
          required
          placeholder="Mensaje"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          Solicitar cotización
        </button>
      </div>
    </form>
  )
}
