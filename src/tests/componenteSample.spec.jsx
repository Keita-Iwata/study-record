/**
 * @jest-environment jsdom
 */

import { StudyMemo } from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", async () => {
    render(<StudyMemo />);
    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});