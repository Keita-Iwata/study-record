import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StudyMemo } from "../App";
import React from "react";

test("adds a new todo item when the add button is clicked", async () => {
  const { getByPlaceholderText, getByText, findAllByRole } = render(
    <StudyMemo />
  );

  await waitFor(() => {
    expect(screen.getByTestId("study-list")).toBeInTheDocument();
  });

  // 操作前にリストアイテムの数を取得
  // const initialItems = findAllByRole("listitem");
  // const initialItemCount = initialItems.length;
  const initialItems = screen.getAllByTestId("study-item");
  const initialItemCount = initialItems.length;
  console.log(initialItemCount);

  // ユーザー操作をシミュレート（ToDo項目の追加）
  fireEvent.change(screen.getByTestId("content-input"), {
    target: { value: "新しいToDo" },
  });
  fireEvent.change(screen.getByTestId("time-input"), {
    target: { value: "1" },
  });
  fireEvent.click(screen.getByTestId("register-button"));

  await waitFor(() => {
    const updatedItems = screen.getAllByTestId("study-item");
    expect(updatedItems.length).toBe(initialItemCount + 1);
  });
});
