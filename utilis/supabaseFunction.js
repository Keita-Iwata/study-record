import { supabase } from "./supabase";

export const GetAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};