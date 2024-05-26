import { TableProps } from "./Table.types";

export const MOCK_DATA: TableProps = {
  columns: [
    {
      name: "lastName",
      title: "姓",
      isSortable: true,
    },
    {
      name: "firstName",
      title: "名",
      isSortable: true,
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
