import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StudyMemo } from "../App";
import React from "react";

test("adds a new todo item when the add button is clicked", async () => {
  render( <StudyMemo /> );

  await waitFor(() => {
    expect(screen.getByTestId("study-list")).toBeInTheDocument();
  });

  // 操作前にリストアイテムの数を取得
  const initialItems = screen.getAllByTestId("study-item");
  const initialItemCount = initialItems.length;
  console.log(initialItemCount);

  // ユーザー操作をシミュレート（ToDo項目の追加）
  const firstDeleteButton = screen.getAllByTestId("delete-button")[0]; // リストの最初の要素の削除ボタンを取得
  fireEvent.click(firstDeleteButton);

  await waitFor(() => {
    const updatedItems = screen.getAllByTestId("study-item");
    expect(updatedItems.length).toBe(initialItemCount - 1);
  });
});
