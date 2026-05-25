import React from 'react'

type SyscomProduct = {
  producto_id?: string
  sku?: string
  modelo?: string
  titulo?: string
  marca?: string | { nombre?: string }
  precio?: number | string
  existencia?: number | string
  total_existencia?: number | string
}

type StoreProduct = {
  key: string
  title: string
  brand: string
  model?: string
  price?: string
  stock?: string
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

function normalizeProduct(product: SyscomProduct, idx: number): StoreProduct {
  const brand = typeof product.marca === 'string' ? product.marca : asText(product.marca?.nombre)
  return {
    key: asText(product.producto_id) || asText(product.sku) || asText(product.modelo) || `item-${idx}`,
    title: asText(product.titulo) || asText(product.modelo) || asText(product.sku) || 'Producto',
    brand: brand || 'SYSCOM',
    model: asText(product.modelo) || asText(product.sku),
    price: asText(product.precio),
    stock: asText(product.existencia) || asText(product.total_existencia),
  }
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

    const candidates = [
      'https://developers.syscom.mx/api/v1/marcas/syscom/productos?stock=1&agrupar=1&pagina=1',
      'https://developers.syscom.mx/api/v1/productos?marca=syscom&stock=1&agrupar=1&pagina=1',
      'https://developers.syscom.mx/api/v1/productos?busqueda=gps&stock=1&agrupar=1&pagina=1',
    ]

    let lastStatus = 500
    for (const url of candidates) {
      const productsRes = await fetch(url, {
        headers: { Authorization: `Bearer ${tokenJson.access_token}`, Accept: 'application/json' },
        next: { revalidate: 3600 },
      })
      lastStatus = productsRes.status
      if (!productsRes.ok) {
        const body = await productsRes.text()
        console.error('[SYSCOM] products error', { url, status: productsRes.status, body: body.slice(0, 400) })
        continue
      }

      const productsJson = (await productsRes.json()) as { productos?: SyscomProduct[]; data?: SyscomProduct[] } | SyscomProduct[]
      const items = Array.isArray(productsJson)
        ? productsJson
        : Array.isArray(productsJson.productos)
          ? productsJson.productos
          : Array.isArray(productsJson.data)
            ? productsJson.data
            : []

      if (items.length) return { items: items.slice(0, 24) }
      console.error('[SYSCOM] products empty payload', { url })
    }

    return { items: localFallback, error: `Consulta productos SYSCOM fallida (${lastStatus})` }
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, idx) => (
          <article key={`${product.key}-${idx}`} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">{product.brand}</div>
            <h3 className="mt-2 text-xl font-semibold">{product.title}</h3>
            {product.model ? <p className="mt-2 text-sm text-white/60">Modelo: {product.model}</p> : null}
            {product.price ? <p className="mt-4 text-lg font-semibold text-amber-200">${product.price}</p> : null}
            {product.stock ? <p className="mt-1 text-sm text-white/65">Existencia: {product.stock}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
