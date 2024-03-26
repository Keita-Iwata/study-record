import { useEffect, useState } from "react";
import "./App.css";
import { GetAllTodos, addTodo, deleteTodo } from "../utilis/supabaseFunction";
import { initializeApp } from "firebase/app";

export const StudyMemo = () => {
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("");
  // const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChangeText = (event) => {
    setInputText(event.target.value);
  };
  const onChangeTime = (event) => {
    setInputTime(event.target.value);
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await GetAllTodos();
        setTodos(todos);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false); // ロード完了後、ローディング状態をfalseに設定
      }
    };

    getTodos();
  }, []);
  
  const onClickAdd = async () => {
    if (inputText === "" || inputTime === "") {
      return setError("入力されていない項目があります");
    }
    try {
      const newRecord = {
        title: inputText,
        time: inputTime,
      };
      const insertedRecord = await addTodo(newRecord.title, newRecord.time); // Supabaseにデータを挿入
      setTodos([...todos, insertedRecord[0]]); // 返されたデータでrecordsを更新
      setInputText(""); // 入力フィールドをクリア
      setInputTime(""); // 入力フィールドをクリア
      setError(""); // エラーメッセージをクリア
    } catch (error) {
      console.error("データの登録に失敗しました", error);
      setError("データの登録に失敗しました");
    }
  };

  const onClickDelete = async (id) => {
    console.log(id);
    try {
      await deleteTodo(id);
      // 削除後のtodosをセット
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("データの削除に失敗しました", error);
      setError("データの削除に失敗しました");
    }
  };

  if (loading) {
    return <div className="loading">ロード中...</div>; // ローディング中の表示
  }

  return (
    <>
      <div class="input-container">
        <input
          class="study-contents"
          placeholder="学習内容"
          value={inputText}
          onChange={onChangeText}
        />
        <input
          class="study-time"
          placeholder="学習時間"
          value={inputTime}
          onChange={onChangeTime}
        />
        <button onClick={onClickAdd}>登録</button>
        <p class="error-message">{error}</p>
      </div>
      <div class="check-container">
        <p>
          <span>入力されている学習内容：</span>
          <span>{inputText}</span>
        </p>
        <p>
          <span>入力されている学習時間：</span>
          <span>
            <span class="check-container__time">{inputTime}</span>時間
          </span>
        </p>
      </div>
      <h2 class="record-title">学習記録</h2>
      <ul class="study-list">
        {todos.map((record, index) => (
          <li key={index}>
            <p>
              <span>投稿日：{record.created_at}</span>
            </p>
            <p>
              <span>学習内容：</span>
              {record.title}
            </p>
            <p>
              <span>学習時間：</span>
              {record.time}時間
            </p>
            <button onClick={() => onClickDelete(record.id)}>削除する</button>
          </li>
        ))}
      </ul>
      <p class="added-time">
        合計時間：{todos.reduce((a, b) => parseInt(a) + parseInt(b.time), 0)}
        時間
      </p>
    </>
  );
};
