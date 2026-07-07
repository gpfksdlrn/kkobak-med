import { supabase } from '@/shared/api/supabase';

export default async function Home() {
  const { data, error } = await supabase.from('medications').select('*');
  console.log('연결 확인:', data, error);

  return <div>꼬박약</div>;
}
