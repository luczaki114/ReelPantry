// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import type { Database } from "../_shared/database.types.ts";

// Alias for convenience
type RecipesInsert = Database["public"]["Tables"]["recipes"]["Insert"];

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Build a placeholder template that satisfies the Insert type
  const placeholderTemplate: RecipesInsert = {
      // Adjust these fields to your schema
      is_template: true,
      user_id: null,           // system-owned template
      template_id: null,       // no parent
      title: "Placeholder Template Recipe",
      description: "This is a hard-coded template created by create-template.",
      status: "parsed",
      ingredients: ["eggs", "milk", "flour"],
      steps: ["1. Mix the ingredients", "2. Bake the recipe", "3. Serve the recipe"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

  try {
    const supabase = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // TODO: Change the table_name to your table
    const { data, error } = await supabase.from('recipes')
      .insert(placeholderTemplate)
      .select()
      .single();

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ message: err?.message ?? err }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})