import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProjectCard from "./ProjectCard";
import { format } from "date-fns-tz";

describe("ProjectCard", () => {
  const mockName = "Test Project";
  const mockDate = "2025-02-28T13:00:00Z"; // UTC time

  it("should render the project name", () => {
    render(<ProjectCard name={mockName} lastModified={mockDate} />);
    
    expect(screen.getByText(mockName)).toBeVisible();
  });

  it("should render the formatted last modified date", () => {
    render(<ProjectCard name={mockName} lastModified={mockDate} />);
    
    expect(screen.getByText("Modified:")).toBeVisible();
  });

  it("should display the correct modified date in Brno timezone (CET)", () => {
    vi.stubGlobal("Intl", {
      DateTimeFormat: vi.fn(() => ({
        format: (date: Date) =>
          format(date, "PPpp", { timeZone: "Europe/Prague" }), // Brno uses CET/CEST
      })),
    });

    render(<ProjectCard name={mockName} lastModified={mockDate} />);

    const expectedDate = format(new Date(mockDate), "PPpp", { timeZone: "Europe/Prague" });
    expect(screen.getByText(expectedDate)).toBeVisible();
  });

  it("should display the correct modified date in Riga timezone (EET)", () => {
    vi.stubGlobal("Intl", {
      DateTimeFormat: vi.fn(() => ({
        format: (date: Date) =>
          format(date, "PPpp", { timeZone: "Europe/Riga" }), // Latvia uses EET/CEST (+1 hour to CET/CEST in Brno)
      })),
    });

    render(<ProjectCard name={mockName} lastModified={mockDate} />);

    const expectedDate = format(new Date(mockDate), "PPpp", { timeZone: "Europe/Riga" });
    expect(screen.getByText(expectedDate)).toBeVisible();
  });
});
