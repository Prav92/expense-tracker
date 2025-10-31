import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'

import  type { Category }  from '@/components/forms/AddExpenseForm'

export const useCategoriesList = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data || []
    },
  })
}