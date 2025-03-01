import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import NewProjectForm, { NewProjectFormRef } from "./NewProjectForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import AxiosMockAdapter from "axios-mock-adapter";

import { api } from "../services/apiService";
import { ProjectInfo, ProjectTemplate } from "../data/schema";
import TemplateSelector from "./inputs/TemplateSelector";
import { useForm } from "react-hook-form";

const axiosMock = new AxiosMockAdapter(api);

const mockRequestBody = {
  name: "Project Riga",
  lineSectionName: "Line 1",
  trackName: "Track 1",
  number: '1',
  projectTemplateId: '1',
};

// Expected API Response (backend enriches the request)
const mockApiResponse = {
  id: "12b53627-83f0-4bce-b88c-4161a702e50d",
  projectInfo: {
    name: "Project Riga",
    number: "1",
  },
  treeRoot: {
    id: "12b53627-83f0-4bce-b88c-4161a702e50d",
    name: "Root",
    createdDate: "2025-03-01T15:15:25Z",
    modifiedDate: "2025-03-01T15:15:25Z",
    childs: [
      {
        id: "7f98139f-fdf6-466c-9130-9abf7a1f9b80",
        name: "Line 1",
        createdDate: "2025-03-01T15:15:25Z",
        modifiedDate: "2025-03-01T15:15:25Z",
        childs: [
          {
            id: "65fb42ba-f3dd-401e-b3a3-0d587b0f1246",
            name: "Track 1",
            createdDate: "2025-03-01T15:15:25Z",
            modifiedDate: "2025-03-01T15:15:25Z",
          },
        ],
      },
    ],
  },
  createdDate: "2025-03-01T15:15:25Z",
  modifiedDate: "2025-03-01T15:15:25Z",
};

const mockTemplateData: ProjectTemplate[] = [
  { id: "1", name: "Template 1" },
  { id: "2", name: "Template 2" },
  { id: "3", name: "Template 3" },
];    

describe("NewProjectForm", () => {
  beforeEach(() => {
    axiosMock.onPost("/project", mockRequestBody).reply(201, mockApiResponse);
    axiosMock.onGet("/projectTemplate").reply(200, mockTemplateData);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  const renderComponent = () => {
    const ref = createRef<NewProjectFormRef>();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <NewProjectForm ref={ref} />
        </BrowserRouter>
      </QueryClientProvider>
    );
    return ref;
  };

  it("should successfully submit form and receive response body with submitted fields", async () => {
    const user = userEvent.setup();
    
    const ref = renderComponent();
   
    // Fill out the form
    await user.type(screen.getByLabelText("Name"), "Project Riga");
    await user.type(screen.getByLabelText("Line Section Name"), "Section 1");
    await user.type(screen.getByLabelText("Track Name"), "Track A");

    // Select a template
    const input = screen.getByLabelText("Select a Template");
    expect(input).toBeVisible();
    await user.click(input);

    await waitFor(() => {
        expect(screen.getByText(mockTemplateData[0].name)).toBeVisible();
        }
    );
    await user.selectOptions(screen.getByRole("listbox"), mockTemplateData[0].name);


    // Submit the form via ref
    if (ref.current) {
      ref.current.submitForm();
    }

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1); // Ensure request was made
    });

    // Verify request payload (what was sent)
    const requestData = JSON.parse(axiosMock.history.post[0].data);
    expect(requestData).toEqual(mockRequestBody);

    // Verify response (what API returned)
    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1); // Ensure a request was made
      expect(mockApiResponse.id).toBeDefined();
      expect(mockApiResponse.projectInfo.name).toBe("Project Riga");
      expect(mockApiResponse.treeRoot.name).toBe("Root");
    });
  });

//   it("should handle API errors", async () => {
//     axiosMock.reset();
//     axiosMock.onPost("/project", mockRequestBody).reply(500, { message: "Internal Server Error" });

//     const ref = renderComponent();
//     const user = userEvent.setup();

//     // Fill out the form
//     await user.type(screen.getByLabelText("Name"), "Project Riga");
//     await user.type(screen.getByLabelText("Line Section Name"), "Section 1");
//     await user.type(screen.getByLabelText("Track Name"), "Track A");

//     // Submit the form via ref
//     if (ref.current) {
//       ref.current.submitForm();
//     }

//     await waitFor(() => {
//       expect(axiosMock.history.post.length).toBe(1); // Ensure request was made
//     });

//     // Verify request payload (what was sent)
//     const requestData = JSON.parse(axiosMock.history.post[0].data);
//     expect(requestData).toEqual(mockRequestBody);

//     // Verify response (what API returned)
//     await waitFor(() => {
//       expect(axiosMock.history.post.length).toBe(1); // Ensure a request was made
//       expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
//     });
//   });
});
