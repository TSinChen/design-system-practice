import { ReactNode } from "react";

export type Column = {
  name: string;
  title: string;
  isSortable?: boolean;
  headerAlign?: "left" | "center" | "right";
  bodyAlign?: "left" | "center" | "right";
};

type Row = {
  id: string | number;
} & {
  [key: string]: ReactNode;
};

export enum SortType {
  none,
  asc,
  desc,
}

export type TableProps = {
  columns: Column[];
  rows: Row[];
  isSortByServer?: boolean;
  onSort?: (column: string, sortType: SortType) => void;
  isFetching?: boolean;
};
