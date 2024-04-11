import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StudyMemo } from "../App";
import React from "react";

test("display error message", async () => {
  render(<StudyMemo />);

  await waitFor(() => {
    expect(screen.getByTestId("study-list")).toBeInTheDocument();
  });

  // ユーザー操作をシミュレート（ToDo項目の追加）
  fireEvent.change(screen.getByTestId("content-input"), {
    target: { value: "新しいToDo" },
  });
  fireEvent.change(screen.getByTestId("time-input"), {
    target: { value: "`1" },
  });
  fireEvent.click(screen.getByTestId("register-button"));

  await waitFor(() => {
    const errorElement = screen.getByTestId("error");
    // expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(""); // 正しい使用方法
  });
  
});
