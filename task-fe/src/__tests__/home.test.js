import { render, screen, fireEvent } from "@testing-library/react";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import Login from "../app/login/page";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../app/utils";
import Home from "../app/page";
import { useCookies } from "next-client-cookies/dist";

export const handlers = [
    http.post("/api/auth/login", async () => {
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

jest.mock("next-client-cookies", () => ({
    useCookies() {
        return {
            get: () => null,
            set: () => null,
            remove: () => null,
        };
    },
}));

describe("Home", () => {
    it("it should container add task button", () => {
        const { container } = renderWithProviders(<Home />, {
            preloadedState: {
                tasks: [
                    {
                        completed: false,
                        title: "This is the title",
                        description:
                            "This is supposed to be the description and a veryy very long one at that toooooo becasue we need to know",
                        due_date: "2025-05-23",
                        user_id: 6,
                        updated_at: "2024-05-27T08:06:29.000000Z",
                        created_at: "2024-05-27T08:06:29.000000Z",
                        id: 9,
                    },
                ],
            },
        });
    });
});
