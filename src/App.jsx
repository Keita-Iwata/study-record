import { useState } from "react";
import "./App.css";

export const StudyMemo = () => {
  // const records = [
  //   { title: "勉強の記録1", time: 1 },
  //   { title: "勉強の記録2", time: 3 },
  //   { title: "勉強の記録3", time: 5 },
  // ];
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const onChangeText = (event) => {
    setInputText(event.target.value);
  };
  const onChangeTime = (event) => {
    setInputTime(event.target.value);
  };

  const onClickAdd = () => {
    if (inputText === "" || inputTime === "") {
      return setError("入力されていない項目があります");
    }
    console.log("PASS");
    const newRecord = {
      title: inputText,
      time: inputTime,
    };
    setRecords([...records, newRecord]);
    setInputText("");
    setInputTime("");
    setError("");
  };

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
        {records.map((record, index) => (
          <li key={index}>
            <p>
              <span>学習内容：</span>
              {record.title}
            </p>
            <p>
              <span>学習時間：</span>
              {record.time}時間
            </p>
          </li>
        ))}
      </ul>
      <p class="added-time">
        合計時間：{records.reduce((a, b) => parseInt(a) + parseInt(b.time), 0)}
        時間
      </p>
    </>
  );
};
