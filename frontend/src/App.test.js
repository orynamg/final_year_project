import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import areaDetailsMockResponse from "./test_area_details.json";

const searchMockResponse = { areas: ["E14", "EC4", "SW1", "SE1", "NW1"] };

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const nextTick = () => act(() => sleep(1));

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(areaDetailsMockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("home page renders without crashing", () => {
  const app = render(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  const logo = screen.getByText(/EstateMate/i);
  expect(logo).toBeInTheDocument();
});

test("search page renders without crashing and /area-details retrieves data", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  await nextTick();
  fireEvent.click(screen.getByTestId("my-drawer"));
  const sidebarPrompt = screen.getByText(/Describe your ideal area!/i);
  expect(sidebarPrompt).toBeInTheDocument();
});

test("search page post works", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  await nextTick();
  fireEvent.click(screen.getAllByTestId("my-drawer")[0]);
  const textAreaBox = screen.getByPlaceholderText(
    /Give me the area with the most amount of transport links and green spaces!/i
  );
  expect(textAreaBox).toBeInTheDocument();
  fireEvent.change(textAreaBox, {
    target: { value: "Give me areas with green spaces and transport links" },
  });
  jest.restoreAllMocks();
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(searchMockResponse),
  });
  fireEvent.click(screen.getByTestId("submit-button"));
  await nextTick();

  ["Canary Wharf", "St Pauls", "Belgravia", "Bermondsey", "Camden"].forEach(
    (area) => {
      expect(screen.getByText(new RegExp(area, "i"))).toBeInTheDocument();
    }
  );
});

test("search page shows error message if server returns an error", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  await nextTick();
  fireEvent.click(screen.getAllByTestId("my-drawer")[0]);
  const textAreaBox = screen.getByPlaceholderText(
    /Give me the area with the most amount of transport links and green spaces!/i
  );
  expect(textAreaBox).toBeInTheDocument();
  fireEvent.change(textAreaBox, {
    target: { value: "Give me areas with green spaces and transport links" },
  });
  jest.restoreAllMocks();
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 500,
    json: jest.fn().mockResolvedValue(searchMockResponse),
  });
  fireEvent.click(screen.getByTestId("submit-button"));
  await nextTick();

  expect(screen.getByText(/Oops... /i)).toBeInTheDocument();
});

test("search page shows warning message if no results are found", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  await nextTick();
  fireEvent.click(screen.getAllByTestId("my-drawer")[0]);
  const textAreaBox = screen.getByPlaceholderText(
    /Give me the area with the most amount of transport links and green spaces!/i
  );
  expect(textAreaBox).toBeInTheDocument();
  fireEvent.change(textAreaBox, {
    target: { value: "Give me areas with green spaces and transport links" },
  });
  jest.restoreAllMocks();
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue({ areas: [] }),
  });
  fireEvent.click(screen.getByTestId("submit-button"));
  await nextTick();

  expect(screen.getByText(/No results found/i)).toBeInTheDocument();
});

test("zoopla link works", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  await nextTick();
  fireEvent.click(screen.getAllByTestId("my-drawer")[0]);
  const textAreaBox = screen.getByPlaceholderText(
    /Give me the area with the most amount of transport links and green spaces!/i
  );
  expect(textAreaBox).toBeInTheDocument();
  fireEvent.change(textAreaBox, {
    target: { value: "Give me areas with green spaces and transport links" },
  });
  jest.restoreAllMocks();
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(searchMockResponse),
  });
  fireEvent.click(screen.getByTestId("submit-button"));
  await nextTick();

  const canaryWharfArea = screen.getByText(/Canary Wharf/i);
  fireEvent.click(canaryWharfArea);
  const zooplaLink = screen.getAllByText(/View On Zoopla/i)[0];
  fireEvent.click(zooplaLink);
  expect(zooplaLink).toHaveAttribute("target", "_blank");
  expect(zooplaLink).toHaveAttribute("href", expect.stringContaining("E14"));
});
