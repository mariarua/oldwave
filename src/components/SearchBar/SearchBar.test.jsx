import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { MemoryRouter } from "react-router-dom";
import { useUser } from "../../context/user";


jest.mock("../../assets/oldwave-logo-horizontal.png", () => {
  return {
    default: "mockedLogoURL.png",
  };
});

jest.mock("../../context/user", () => {
  return {
    useUser: jest.fn(() => {
      return {
        name: "",
        picture: "",
        email: "",
      };
    }),
    useDispatch: jest.fn(() => {
      return jest.fn();
    }),
  };
});

describe("SearchBar component", () => {
  test("should render correctly", async () => {
    const onSearchFn = jest.fn();
    render(
      <MemoryRouter>
        <SearchBar onSearch={onSearchFn} />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Icono de buscar")).toBeInTheDocument();
    expect(screen.getByText("Todas las categorías")).toBeInTheDocument();
  });

  test("should search by pressing button", async () => {
    const onSearchFn = jest.fn();
    render(
      <MemoryRouter>
        <SearchBar onSearch={onSearchFn} />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText("Estoy buscando...");
    expect(inputElement).toBeInTheDocument();
    await userEvent.type(inputElement, "iPhone");
    const submitButton = screen.getByText("Buscar");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    await waitFor(() => expect(onSearchFn).toBeCalledWith("iPhone"));
  });

  test("should search by pressing enter", async () => {
    const onSearchFn = jest.fn();
    render(
      <MemoryRouter>
        <SearchBar onSearch={onSearchFn} />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText("Estoy buscando...");
    expect(inputElement).toBeInTheDocument();
    await userEvent.type(inputElement, "mockedInputValue");
    const submitButton = screen.getByText("Buscar");
    expect(submitButton).toBeInTheDocument();
    userEvent.keyboard("{enter}");
    await waitFor(() => expect(onSearchFn).toBeCalledWith("mockedInputValue"));

    fireEvent.click(screen.getByText("Compras"));
    useUser.mockImplementation(() => {
      return {
        name: "JUAN",
        picture: "",
        email: "",
      };
    });
  });
});
