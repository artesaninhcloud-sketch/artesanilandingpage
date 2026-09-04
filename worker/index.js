// Cloudflare Worker — API pública de leitura do catálogo (Cloudflare D1).
// Única responsabilidade: servir GET /api/products com os produtos ativos.
// Não expõe nenhuma operação de escrita/administração publicamente.

const JSON_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS })
}

async function listProducts(env) {
  const { results } = await env.DB.prepare(
    'SELECT id, name, description, price, image, category, active FROM products WHERE active = 1 ORDER BY id ASC',
  ).all()

  return results.map((row) => ({
    ...row,
    price: row.price == null ? null : Number(row.price),
    active: Boolean(row.active),
  }))
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: JSON_HEADERS })
    }

    if (request.method === 'GET' && url.pathname === '/api/products') {
      try {
        const products = await listProducts(env)
        return json(products)
      } catch (error) {
        return json({ error: 'Não foi possível carregar o catálogo.' }, 500)
      }
    }

    return json({ error: 'Rota não encontrada.' }, 404)
  },
}
