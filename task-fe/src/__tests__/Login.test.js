import { render, screen, fireEvent } from "@testing-library/react";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import Login from "../app/login/page";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../app/utils";

export const handlers = [
    http.get("/api/auth/login", async () => {
        await delay(150);
        return HttpResponse.json({
            accessToken: "2|KXMjdiN74FljWZ8YHMUd1ypKzrm3qSBTifzP9pb930134d31",
            token_type: "Bearer",
            name: "Jane",
            email: "jane@gmail.com",
            id: 6,
        });
    }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
        };
    },
}));

describe("Login", () => {
    it("redirects on successful login", () => {
        const { container } = renderWithProviders(<Login />);
        userEvent.type(screen.findByTestId("email"), "jane@gmail.com");
        userEvent.type(screen.findByTestId("password"), "12345678");

        userEvent.click(screen.getByTestId("login"));
        expect(window.location.pathname).toEqual("/");
    });
});
