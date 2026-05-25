import React from 'react'
import SyscomStoreGrid from './SyscomStoreGrid'

type SyscomProduct = {
  producto_id?: string
  sku?: string
  modelo?: string
  titulo?: string
  marca?: string | { nombre?: string }
  precio?: number | string
  precios?: {
    precio_1?: number | string
    precio_lista?: number | string
    precio_especial?: number | string
    precio_descuento?: number | string
  }
  existencia?: number | string | { nuevo?: number | string }
  total_existencia?: number | string
  img_portada?: string
  categorias?: Array<{ nombre?: string; nivel?: number }>
}

export type StoreProduct = {
  key: string
  title: string
  brand: string
  model?: string
  price?: string
  stock?: string
  image?: string
  category?: string
}

const localFallback: SyscomProduct[] = [
  { titulo: 'PRO43G', marca: 'SYSCOM' },
  { titulo: 'Global Star', marca: 'SYSCOM' },
  { titulo: 'CTS-100', marca: 'SYSCOM' },
  { titulo: 'Teléfono Satelital Iridium', marca: 'SYSCOM' },
]

function asText(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, ''))
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function formatMxn(value: number): string {
  return new Intl.NumberFormat('es-MX', { currency: 'MXN', maximumFractionDigits: 2, style: 'currency' }).format(value)
}

function normalizeProduct(product: SyscomProduct, idx: number): StoreProduct {
  const brand = typeof product.marca === 'string' ? product.marca : asText(product.marca?.nombre)
  const category = product.categorias?.find((item) => item.nivel === 1)?.nombre || product.categorias?.[0]?.nombre
  const basePrice =
    asNumber(product.precio) ||
    asNumber(product.precios?.precio_1) ||
    asNumber(product.precios?.precio_lista) ||
    asNumber(product.precios?.precio_especial) ||
    asNumber(product.precios?.precio_descuento)
  const stock =
    asText(product.total_existencia) ||
    asText(product.existencia) ||
    (typeof product.existencia === 'object' ? asText(product.existencia.nuevo) : undefined)

  return {
    key: asText(product.producto_id) || asText(product.sku) || asText(product.modelo) || `item-${idx}`,
    title: asText(product.titulo) || asText(product.modelo) || asText(product.sku) || 'Producto',
    brand: brand || 'SYSCOM',
    model: asText(product.modelo) || asText(product.sku),
    price: basePrice ? formatMxn(basePrice * 1.55) : undefined,
    stock,
    image: asText(product.img_portada),
    category: asText(category),
  }
}

async function fetchProductsPage(url: string, token: string) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    const body = await response.text()
    console.error('[SYSCOM] products error', { url, status: response.status, body: body.slice(0, 400) })
    return null
  }

  return (await response.json()) as {
    productos?: SyscomProduct[]
    data?: SyscomProduct[]
    paginas?: number | string
  } | SyscomProduct[]
}

function getProducts(payload: Awaited<ReturnType<typeof fetchProductsPage>>): SyscomProduct[] {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.productos)) return payload.productos
  if (Array.isArray(payload.data)) return payload.data
  return []
}

async function fetchSyscomProducts(): Promise<{ items: SyscomProduct[]; error?: string }> {
  const clientId = process.env.SYSCOM_CLIENT_ID
  const clientSecret = process.env.SYSCOM_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return { items: localFallback, error: 'SYSCOM no configurado en Vercel (usando catálogo base)' }
  }

  try {
    const tokenRes = await fetch('https://developers.syscom.mx/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }),
      next: { revalidate: 3600 },
    })

    if (!tokenRes.ok) {
      const body = await tokenRes.text()
      console.error('[SYSCOM] token error', { status: tokenRes.status, body: body.slice(0, 400) })
      return { items: localFallback, error: `Auth SYSCOM fallida (${tokenRes.status})` }
    }

    const tokenJson = (await tokenRes.json()) as { access_token?: string }
    if (!tokenJson.access_token) return { items: localFallback, error: 'Token SYSCOM vacío' }
    const accessToken = tokenJson.access_token

    const sources = [
      'https://developers.syscom.mx/api/v1/marcas/syscom/productos?stock=1&agrupar=1',
      'https://developers.syscom.mx/api/v1/productos?busqueda=gps&agrupar=1',
    ]

    const merged = new Map<string, SyscomProduct>()
    let anySourceOk = false

    for (const baseUrl of sources) {
      const firstUrl = `${baseUrl}&pagina=1`
      const firstPage = await fetchProductsPage(firstUrl, accessToken)
      if (!firstPage) continue
      anySourceOk = true
      const firstItems = getProducts(firstPage)
      const pageCount = Array.isArray(firstPage) ? 1 : Number(firstPage.paginas || 1)
      const urls = Array.from({ length: Math.max(0, pageCount - 1) }, (_, idx) => `${baseUrl}&pagina=${idx + 2}`)
      const restPages = await Promise.all(urls.map((url) => fetchProductsPage(url, accessToken)))
      const items = [...firstItems, ...restPages.flatMap(getProducts)]

      for (const item of items) {
        const key = asText(item.producto_id) || asText(item.sku) || asText(item.modelo) || ''
        if (key) merged.set(key, item)
      }
    }

    if (merged.size > 0) return { items: Array.from(merged.values()) }
    if (anySourceOk) return { items: localFallback, error: 'Sin resultados de catálogo para filtros actuales' }
    return { items: localFallback, error: 'Consulta productos SYSCOM fallida' }
  } catch (error) {
    console.error('[SYSCOM] unexpected error', error)
    return { items: localFallback, error: 'No se pudo conectar con SYSCOM' }
  }
}

export default async function SyscomStoreSection() {
  const { items, error } = await fetchSyscomProducts()
  const products = items.map(normalizeProduct)

  return (
    <section id="tienda" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Tienda</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Catálogo SYSCOM</h2>
        </div>
      </div>

      {error ? <p className="mb-6 text-sm text-amber-300">{error}</p> : null}

      <SyscomStoreGrid products={products} />
    </section>
  )
}
