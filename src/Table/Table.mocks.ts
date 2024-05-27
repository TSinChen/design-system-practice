import { TableProps } from "./Table.types";

export const MOCK_MASSIVE_DATA = {
  columns: Array.from({ length: 30 }, (_, index) => ({
    name: `column${index + 1}`,
    title: `Column ${index + 1}`,
  })),
  rows: Array.from({ length: 30 }, (_, rowIndex) => ({
    id: rowIndex + 1,
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, columnIndex) => [
        `column${columnIndex + 1}`,
        `column${columnIndex + 1}`,
      ])
    ),
  })),
};

export const MOCK_DATA: TableProps = {
  columns: [
    {
      name: "lastName",
      title: "姓",
    },
    {
      name: "firstName",
      title: "名",
    },
    {
      name: "age",
      title: "年齡",
      isSortable: true,
      headerAlign: "right",
      bodyAlign: "right",
    },
  ],
  rows: [
    {
      id: "1",
      lastName: "Doe",
      firstName: "John",
      age: 30,
    },
    {
      id: "2",
      lastName: "Smith",
      firstName: "Jane",
      age: 20,
    },
  ],
};
