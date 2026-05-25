import React from 'react'

type SyscomProduct = {
  sku?: string
  modelo?: string
  titulo?: string
  marca?: string
  precio?: number | string
  existencia?: number | string
  imagen?: string
}

async function fetchSyscomProducts(): Promise<{ items: SyscomProduct[]; error?: string }> {
  const clientId = process.env.SYSCOM_CLIENT_ID
  const clientSecret = process.env.SYSCOM_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return { items: [], error: 'Credenciales SYSCOM no configuradas' }
  }

  try {
    const tokenRes = await fetch('https://developers.syscom.mx/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }),
      cache: 'no-store',
    })

    if (!tokenRes.ok) {
      return { items: [], error: `Auth SYSCOM fallida (${tokenRes.status})` }
    }

    const tokenJson = (await tokenRes.json()) as { access_token?: string }
    if (!tokenJson.access_token) return { items: [], error: 'Token SYSCOM vacío' }

    const productsRes = await fetch('https://developers.syscom.mx/api/v1/productos', {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      cache: 'no-store',
    })

    if (!productsRes.ok) {
      return { items: [], error: `Consulta productos SYSCOM fallida (${productsRes.status})` }
    }

    const productsJson = (await productsRes.json()) as { productos?: SyscomProduct[] } | SyscomProduct[]
    const items = Array.isArray(productsJson) ? productsJson : Array.isArray(productsJson.productos) ? productsJson.productos : []
    return { items }
  } catch {
    return { items: [], error: 'No se pudo conectar con SYSCOM' }
  }
}

export default async function SyscomStoreSection() {
  const { items, error } = await fetchSyscomProducts()

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
        {items.map((product, idx) => (
          <article key={`${product.sku || product.modelo || 'item'}-${idx}`} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">{product.marca || 'SYSCOM'}</div>
            <h3 className="mt-2 text-xl font-semibold">{product.titulo || product.modelo || product.sku || 'Producto'}</h3>
            {product.sku ? <p className="mt-2 text-sm text-white/60">SKU: {product.sku}</p> : null}
            {product.precio !== undefined ? <p className="mt-4 text-lg font-semibold text-amber-200">${product.precio}</p> : null}
            {product.existencia !== undefined ? <p className="mt-1 text-sm text-white/65">Existencia: {product.existencia}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
