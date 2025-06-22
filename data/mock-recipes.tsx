// Este arquivo é apenas para simular um conjunto maior de dados para testar a paginação
// Você pode adicionar este arquivo ao projeto para testar com mais receitas

import { allRecipes } from "./recipes"

// Função para gerar mais receitas com base nas existentes
export function generateMoreRecipes(count = 50) {
  const moreRecipes = []
  const baseRecipes = [...allRecipes]

  for (let i = 0; i < count; i++) {
    const baseRecipe = baseRecipes[i % baseRecipes.length]
    const newId = `${baseRecipe.id}-${Math.floor(i / baseRecipes.length) + 1}`

    moreRecipes.push({
      ...baseRecipe,
      id: newId,
      title: `${baseRecipe.title} ${Math.floor(i / baseRecipes.length) + 1}`,
      description: `Variação ${Math.floor(i / baseRecipes.length) + 1}: ${baseRecipe.description}`,
      image: baseRecipe.image,
      rating: Math.max(3, Math.min(5, baseRecipe.rating + (Math.random() - 0.5))),
      reviews: Math.floor(baseRecipe.reviews * (0.5 + Math.random())),
      featured: i % 10 === 0, // Fazer alguns itens como destaque
    })
  }

  return moreRecipes
}

// Exportar receitas expandidas para teste
export const expandedRecipes = [...allRecipes, ...generateMoreRecipes(50)]
