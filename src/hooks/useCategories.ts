import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesService } from '@/services/categories.service'
import type { CreateCategoryDTO } from '@/types/category'

const QUERY_KEY = 'categories'

export const useCategories = () =>
  useQuery({
    queryKey: [QUERY_KEY],
    queryFn: categoriesService.getAll,
  })

export const useCategory = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  })

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) => categoriesService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
