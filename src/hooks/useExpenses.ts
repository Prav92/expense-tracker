import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'

import type {Expense} from '@/App'


export const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('expenses').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data || []
    },
  })
}