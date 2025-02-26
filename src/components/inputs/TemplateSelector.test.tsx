import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { useForm } from "react-hook-form";
import { userEvent } from "@testing-library/user-event";
import AxiosMockAdapter from "axios-mock-adapter";
import TemplateSelector from "./TemplateSelector";

import { api } from "../../services/apiService";
import { ProjectInfo, ProjectTemplate } from "../../data/schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const axiosMock = new AxiosMockAdapter(api);

const mockData: ProjectTemplate[] = [
  { id: "1", name: "Template 1" },
  { id: "2", name: "Template 2" },
  { id: "3", name: "Template 3" },
];

const TestForm = () => {
  const { control } = useForm<ProjectInfo>();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <TemplateSelector control={control} name="projectTemplateId" />
    </QueryClientProvider>
  );
};

describe("TemplateSelector", () => {
  beforeAll(() => {
    axiosMock.onGet("/projectTemplate/list").reply(200, mockData);
  });

  afterAll(() => {
    axiosMock.reset();
  });

  it("should render selector with project templates data", async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const input = screen.getByLabelText("Select a Template");
    expect(input).toBeVisible();
    await user.click(input);

    expect(screen.getByText(mockData[0].name)).toBeVisible();
    expect(screen.getByText(mockData[1].name)).toBeVisible();
    expect(screen.getByText(mockData[2].name)).toBeVisible();
  });
});
