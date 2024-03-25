import { supabase } from "./supabase";

export const GetAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};

export const addTodo = async (title, time) => {
  const { data, error } = await supabase
    .from('study-record')
    .insert([
      { title: title, time: time }
    ]);
  
  if (error) {
    throw error;
  }

  return data;
};