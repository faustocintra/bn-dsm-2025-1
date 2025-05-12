function includeRelations(query) {
    const include = {}
  
    if(query.include) {
      const relations = query.include.split(',')
  
      for(let rel of relations) {
        if(rel === 'itens.produto') {
          include.itens = {
            include: { produto: true }
          }
        }
        else include[rel] = true
      }
    }
  
    return include
  }
  
  export { includeRelations }