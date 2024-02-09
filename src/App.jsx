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
      <div>
        <input
          placeholder="学習内容"
          value={inputText}
          onChange={onChangeText}
        />
        <input
          placeholder="学習時間"
          value={inputTime}
          onChange={onChangeTime}
        />
        時間
      </div>
      <div>
        <p>
          <span>入力されている学習内容：</span>
          <span>{inputText}</span>
        </p>
        <p>
          <span>入力されている学習時間：</span>
          <span>{inputTime}時間</span>
        </p>
      </div>
      <div>
        <button onClick={onClickAdd}>登録</button>
      </div>
      <p>{error}</p>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <span>{record.title}:</span>
            <span>{record.time}時間</span>
          </li>
        ))}
      </ul>
      <p>
        合計時間：{records.reduce((a, b) => parseInt(a) + parseInt(b.time), 0)}
        時間
      </p>
    </>
  );
};
