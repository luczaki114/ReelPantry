/**
 * Template service for CRUD operations
 * 
 * This file contains template-specific async CRUD services for the recipes table.
 * Uses types from @types/database.types.ts for type safety.
 * 
 * Location: services/templates.ts
 */
import { supabase } from '@/lib/supabase';
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types';

// Type aliases for better readability
export type Recipe = Tables<'recipes'>;
export type RecipeInsert = TablesInsert<'recipes'>;
export type RecipeUpdate = TablesUpdate<'recipes'>;

export async function ensureTemplateForUrl(url: string) {
  return supabase.functions.invoke('create-template', { body: { source_url: url } });
}

export async function getTemplate(id: string) {
  return supabase.from('recipes').select('*').eq('id', id).eq('is_template', true).single();
}

/**
 * Get all template Recipes
 * @returns Array of template recipes
 */
export async function getAllTemplateRecipes(): Promise<Recipe[]> {
  let query = supabase.from('recipes').select('*').eq('is_template', true);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching template recipes:', error);
    throw error;
  }

  return data || [];
}
