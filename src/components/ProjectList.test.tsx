import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectList from "./ProjectList";
import { Project } from "../data/schema";
import { format } from "date-fns-tz";

describe("ProjectList", () => {
  const mockProjects: Project[] = [
    {
      id: "1",
      projectInfo: { name: "Project Alpha" },
      modifiedDate: "2025-02-28T12:30:00Z",
    },
    {
      id: "2",
      projectInfo: { name: "Project Beta" },
      modifiedDate: "2025-02-27T10:15:00Z",
    },
  ];

  it("should render the correct number of project cards", () => {
    render(<ProjectList projects={mockProjects} />);
    
    expect(screen.getByText("Project Alpha")).toBeVisible();
    expect(screen.getByText("Project Beta")).toBeVisible();

    // Get all project cards by heading levels (each card has a project name)
    const projectCards = screen.getAllByRole("heading", { level: 6 });
    expect(projectCards).toHaveLength(mockProjects.length);
  });

  it("should handle an empty project list gracefully", () => {
    render(<ProjectList projects={[]} />);

    const projectCards = screen.queryAllByRole("heading", { level: 6 });
    expect(projectCards).toHaveLength(0);
  });

  it("should handle undefined project list safely", () => {
    render(<ProjectList projects={undefined} />);

    const projectCards = screen.queryAllByRole("heading", { level: 6 });
    expect(projectCards).toHaveLength(0);
  });

  it("should display the correct last modified date for each project", () => {
    render(<ProjectList projects={mockProjects} />);

    const projectCards = screen.getAllByRole("heading", { level: 6 });

    expect(projectCards).toHaveLength(mockProjects.length);

    mockProjects.forEach((project, index) => {
      const cardContainer = projectCards[index].closest("div");

      expect(projectCards[index]).toHaveTextContent(project.projectInfo.name);

      expect(within(cardContainer!).getByText("Modified:")).toBeVisible();

      const expectedDate = format(new Date(project.modifiedDate), "PPpp");
      expect(within(cardContainer!).getByText(expectedDate)).toBeVisible();
    });
  });
});
