import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eropkkjuvmztgyyfpola.supabase.co'
const supabaseAnonKey = 'sb_publishable_BWG9ACDQLgufuOb0SgaN2A_1LylDtYg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
