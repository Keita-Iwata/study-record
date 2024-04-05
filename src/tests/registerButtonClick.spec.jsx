import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StudyMemo } from "../App";
import React from "react";

test("adds a new todo item when the add button is clicked", async () => {
  const { getByPlaceholderText, getByText, findAllByRole } = render(<StudyMemo />);

  // 操作前にリストアイテムの数を取得
  const initialItems = findAllByRole("listitem");
  const initialItemCount = initialItems.length;

  // ユーザー操作をシミュレート（ToDo項目の追加）
  fireEvent.change(getByPlaceholderText("学習内容"), {
    target: { value: "新しいToDo" },
  });
  fireEvent.click(getByText("登録"));

  await waitFor(() => {
    const updatedItems = findAllByRole("listitem");
    expect(updatedItems.length).toBe(initialItemCount + 1);
  });

});
