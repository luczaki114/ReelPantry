/**
 * Recipe service for CRUD operations
 * 
 * This file contains recipe-specific async CRUD services for the recipes table.
 * Uses types from @types/database.types.ts for type safety.
 * 
 * Location: services/recipes.ts
 */

import { supabase } from '@/lib/supabase';
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types';

// Type aliases for better readability
export type Recipe = Tables<'recipes'>;
export type RecipeInsert = TablesInsert<'recipes'>;
export type RecipeUpdate = TablesUpdate<'recipes'>;

/**
 * Create a new recipe
 * @param recipe - Recipe data to insert
 * @returns The created recipe or null if error
 */
export async function createRecipe(recipe: RecipeInsert): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .insert(recipe) 
    .select()
    .single();

  if (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }

  return data;
}

/**
 * Get a recipe by ID
 * @param id - Recipe ID
 * @returns The recipe or null if not found
 */
export async function getRecipe(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user recipe:', error);
    throw error;
  }

  return data;
}

/**
 * Get all user's Recipes
 * @param userId - User ID
 * @returns Array of template recipes
 */
export async function getAllRecipes(userId: string): Promise<Recipe[]> {
  let query = supabase.from('recipes').select('*').eq('is_template', false).eq('user_id', userId);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }

  return data || [];
}

/**
 * Update a recipe by ID
 * @param id - Recipe ID
 * @param updates - Partial recipe data to update
 * @returns The updated recipe or null if error
 */
export async function updateRecipe(
  id: string,
  updates: RecipeUpdate
): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a recipe by ID
 * @param id - Recipe ID
 * @returns true if successful, false otherwise
 */
export async function deleteRecipe(id: string): Promise<boolean> {
  const { error } = await supabase.from('recipes').delete().eq('id', id);

  if (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }

  return true;
}

