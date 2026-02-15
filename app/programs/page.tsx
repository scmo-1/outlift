import { createClient } from '@/lib/supabase/server';

export default async function ProgramsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('program').select('*');
  if (error) console.log(error);

  if (data) console.log(data);
}
