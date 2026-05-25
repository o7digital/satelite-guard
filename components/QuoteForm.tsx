'use client'

import { useEffect, useState } from 'react'
import type { StoreProduct } from './SyscomStoreSection'

const storageKey = 'satellite-guard-quote-products'
const eventName = 'satellite-guard-quote-products-updated'

function productLine(product: StoreProduct, locale: 'es' | 'en') {
  const modelLabel = locale === 'en' ? 'Model' : 'Modelo'
  const priceLabel = locale === 'en' ? 'Price' : 'Precio'

  return `- ${product.title}${product.model ? ` | ${modelLabel}: ${product.model}` : ''}${product.price ? ` | ${priceLabel}: ${product.price}` : ''}`
}

function buildMessage(products: StoreProduct[], locale: 'es' | 'en' = 'es') {
  if (products.length === 0) return ''

  const intro = locale === 'en'
    ? 'Hello, I would like to request a quote for these products:'
    : 'Hola, quiero solicitar una cotización para estos productos:'

  return `${intro}\n\n${products.map((product) => productLine(product, locale)).join('\n')}`
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

type QuoteFormProps = {
  locale?: 'es' | 'en'
}

export default function QuoteForm({ locale = 'es' }: QuoteFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<StoreProduct[]>([])
  const [message, setMessage] = useState('')
  const isEnglish = locale === 'en'

  useEffect(() => {
    const syncSelectedProducts = () => {
      const products = readSelectedProducts()
      setSelectedProducts(products)
      setMessage((currentMessage) => currentMessage || buildMessage(products, locale))
    }

    syncSelectedProducts()
    window.addEventListener(eventName, syncSelectedProducts)
    window.addEventListener('storage', syncSelectedProducts)

    return () => {
      window.removeEventListener(eventName, syncSelectedProducts)
      window.removeEventListener('storage', syncSelectedProducts)
    }
  }, [locale])

  useEffect(() => {
    setMessage(buildMessage(selectedProducts, locale))
  }, [locale, selectedProducts])

  return (
    <form
      action="https://formspree.io/f/xnjwkdqg"
      method="POST"
      className="rounded-2xl border border-white/10 bg-black/20 p-5"
    >
      <div className="grid gap-3">
        <input type="hidden" name="subject" value={isEnglish ? 'Satellite Guard quote request' : 'Solicitud de cotización Satellite Guard'} />
        <input type="hidden" name="_cc" value="olivier.steineur@gmail.com" />
        <input type="hidden" name="destinatario" value="info@satelliteguard.com.mx" />
        {selectedProducts.length > 0 ? (
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
            {isEnglish
              ? `${selectedProducts.length} product${selectedProducts.length > 1 ? 's' : ''} selected for quote.`
              : `${selectedProducts.length} producto${selectedProducts.length > 1 ? 's' : ''} seleccionado${selectedProducts.length > 1 ? 's' : ''} para cotización.`}
          </div>
        ) : null}
        <input
          name="nombre"
          required
          placeholder={isEnglish ? 'Name' : 'Nombre'}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <input
          name="telefono"
          placeholder={isEnglish ? 'Phone' : 'Teléfono'}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <input
          type="email"
          name="email"
          required
          placeholder={isEnglish ? 'Email' : 'Correo electrónico'}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <textarea
          name="mensaje"
          required
          placeholder={isEnglish ? 'Message' : 'Mensaje'}
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          {isEnglish ? 'Request quote' : 'Solicitar cotización'}
        </button>
      </div>
    </form>
  )
}
