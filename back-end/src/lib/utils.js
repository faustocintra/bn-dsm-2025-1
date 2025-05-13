// lib/utils.js
export function includeRelations(query) {
  const include = {}
  if (query.include) {
    for (let rel of query.include.split(',')) {
      if (rel === 'itens.produto') {
        include.itens = { include: { produto: true } }
      }
      else if (rel === 'fornecedor') {
        include._fornecedor = true
      }
      else if (rel === 'produtos') {
        include._produtos = true    
      }
      else if (rel === 'categoria') {
        include._categoria = true    
      }
    }
  }
  return include
}
