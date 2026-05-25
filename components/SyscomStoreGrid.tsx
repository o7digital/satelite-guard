'use client'

import { useEffect, useMemo, useState } from 'react'
import type { StoreProduct } from './SyscomStoreSection'

const storageKey = 'satellite-guard-quote-products'
const eventName = 'satellite-guard-quote-products-updated'

export default function SyscomStoreGrid({ products }: { products: StoreProduct[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [stockOnly, setStockOnly] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<StoreProduct[]>([])

  useEffect(() => {
    window.setTimeout(() => {
      try {
        const rawValue = window.localStorage.getItem(storageKey)
        if (!rawValue) return
        const parsed = JSON.parse(rawValue)
        if (Array.isArray(parsed)) setSelectedProducts(parsed as StoreProduct[])
      } catch {
        setSelectedProducts([])
      }
    }, 0)
  }, [])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category).filter(Boolean))).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        [product.title, product.model, product.brand, product.category]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery))
      const matchesCategory = category === 'all' || product.category === category
      const stockValue = Number(product.stock || 0)
      const matchesStock = !stockOnly || stockValue > 0

      return matchesQuery && matchesCategory && matchesStock
    })
  }, [category, products, query, stockOnly])

  function updateSelectedProducts(nextProducts: StoreProduct[]) {
    setSelectedProducts(nextProducts)
    window.localStorage.setItem(storageKey, JSON.stringify(nextProducts))
    window.dispatchEvent(new CustomEvent(eventName))
  }

  function toggleProduct(product: StoreProduct) {
    const isSelected = selectedProducts.some((item) => item.key === product.key)
    const nextProducts = isSelected
      ? selectedProducts.filter((item) => item.key !== product.key)
      : [...selectedProducts, product]

    updateSelectedProducts(nextProducts)
  }

  function goToQuoteForm() {
    window.location.hash = 'contacto'
  }

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_16rem_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar producto, modelo o categoría"
          className="h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300/50"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-cyan-300/50"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white/75">
          <input
            type="checkbox"
            checked={stockOnly}
            onChange={(event) => setStockOnly(event.target.checked)}
            className="h-4 w-4 accent-cyan-300"
          />
          Con stock
        </label>
      </div>

      <div className="mb-5 text-sm text-white/55">
        {filteredProducts.length} de {products.length} productos
      </div>

      {selectedProducts.length > 0 ? (
        <div className="sticky top-4 z-30 mb-6 rounded-2xl border border-amber-300/25 bg-[#11100a]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-amber-200">
                {selectedProducts.length} producto{selectedProducts.length > 1 ? 's' : ''} seleccionado
                {selectedProducts.length > 1 ? 's' : ''}
              </div>
              <div className="mt-1 text-xs text-white/60">
                Se agregará{selectedProducts.length > 1 ? 'n' : ''} al mensaje del formulario de cotización.
              </div>
            </div>
            <button
              type="button"
              onClick={goToQuoteForm}
              className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Pedir cotización
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product, idx) => (
          <article
            key={`${product.key}-${idx}`}
            className={`overflow-hidden rounded-lg border bg-white/[0.04] transition ${
              selectedProducts.some((item) => item.key === product.key)
                ? 'border-amber-300 shadow-2xl shadow-amber-300/10'
                : 'border-white/10 hover:border-amber-300/45'
            }`}
          >
            <button type="button" onClick={() => toggleProduct(product)} className="block w-full text-left">
            <div className="flex aspect-[4/3] items-center justify-center bg-white">
              {product.image ? (
                <img src={product.image} alt={product.title} className="h-full w-full object-contain p-4" loading="lazy" />
              ) : (
                <div className="text-sm font-semibold text-slate-500">SYSCOM</div>
              )}
            </div>
            <div className="p-5">
              <div className="text-xs uppercase text-white/45">{product.brand}</div>
              <h3 className="mt-2 line-clamp-3 text-base font-semibold leading-6">{product.title}</h3>
              {product.model ? <p className="mt-3 text-sm text-white/60">Modelo: {product.model}</p> : null}
              {product.category ? <p className="mt-1 text-sm text-white/45">{product.category}</p> : null}
              <div className="mt-4 flex items-center justify-between gap-3">
                {product.price ? <p className="text-base font-semibold text-amber-200">{product.price}</p> : <span />}
                {product.stock ? <p className="text-sm text-white/65">Stock: {product.stock}</p> : null}
              </div>
              <div className="mt-4 rounded-full border border-amber-300/30 px-4 py-2 text-center text-sm font-semibold text-amber-200">
                {selectedProducts.some((item) => item.key === product.key) ? 'Seleccionado' : 'Seleccionar para cotización'}
              </div>
            </div>
            </button>
          </article>
        ))}
      </div>
    </>
  )
}
