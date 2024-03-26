import { supabase } from "./supabase";

export const GetAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};

// Supabaseにデータを挿入する関数
export const addTodo = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([{ title: title, time: time }])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTodo = async (id) => {
  const { data, error } = await supabase
    .from("study-record")
    .delete()
    .match({ id });

  if (error) {
    throw error;
  }

  return data;
};
