import { supabase } from "./supabase";

export const GetAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  console.log(todos.data);
  return todos.data;
};