/*
  Função que processa a query string da URL da requisição
  e verifica se o parâmetro "include" foi passado. Em caso
  positivo, preenche um objeto com os relacionamentos que
  devem ser incluídos na consulta sendo executada
*/
export function includeRelations(query) {
  if (!query.include) return {}

  const includes = query.include.split(',')

  const include = {}

  for (const rel of includes) {
    if (rel === 'cliente') {
      include.cliente = true
    }
    if (rel === 'itens') {
      include.itens = true
    }
    if (rel === 'itens.produto') {
      include.itens = { include: { produto: true } }
    }
  }

  return include
}
