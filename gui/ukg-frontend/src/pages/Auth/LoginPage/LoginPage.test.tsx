import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, test, vi } from "vitest";
import LoginPage from "./LoginPage";
import * as authHooks from "@/auth/AuthProvider/useAuth";

const useAuthMock = vi.spyOn(authHooks, "useAuth");
const loginMock = vi.fn();

useAuthMock.mockReturnValue({
  login: loginMock,
  auth: {
    isAuthorized: false,
  },
  logout: vi.fn(),
  refreshToken: vi.fn(),
});

describe("LoginPage", () => {
  test("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zaloguj" })).toBeInTheDocument();
  });

  test("submits login form with correct credentials", async () => {
    render(<LoginPage />);
    // Fill in the login form
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });
    // Submit the login form
    fireEvent.click(screen.getByRole("button", { name: "Zaloguj" }));

    // Wait for promises to finish
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledOnce();
      expect(loginMock).toHaveBeenCalledWith("testuser", "testpassword");
    });
  });
});
