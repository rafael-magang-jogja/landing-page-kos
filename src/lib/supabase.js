import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload an image file to Supabase Storage bucket 'kos-images'
 * @param {File} file - The file selected from input[type="file"]
 * @returns {Promise<string>} The public URL of the uploaded image
 */
export const uploadKosImage = async (file) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum terhubung. Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terisi di .env');
  }

  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanBase = file.name
    .replace(`.${fileExt}`, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);
  const fileName = `${Date.now()}_${cleanBase}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('kos-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('kos-images')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
