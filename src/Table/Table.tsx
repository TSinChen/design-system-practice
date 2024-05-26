import { useMemo, useState } from "react";
import Caret from "../components/Caret";
import { showError, showWarning } from "../utils/functions";
import { Column, SortType, TableProps } from "./Table.types";
import { getNextSortType } from "./Table.helpers";
import Fetching from "../components/Fetching";

const Table = ({
  columns,
  rows,
  isSortByServer,
  onSort,
  isFetching,
}: TableProps) => {
  if (!columns) {
    showError("請帶入 columns！");
  }
  if (!rows) {
    showError("請帶入 rows!");
  }

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortType, setSortType] = useState(SortType.none);

  const sortedRows = useMemo(
    () =>
      rows.toSorted((a, b) => {
        if (sortBy) {
          return (
            String(a[sortBy]).localeCompare(String(b[sortBy])) *
            (sortType === SortType.asc ? 1 : -1)
          );
        }
        return 0;
      }),
    [rows, sortBy, sortType]
  );

  const handleSort = (column: Column) => {
    if (onSort) {
      onSort(column.name, getNextSortType(sortType));
      if (isSortByServer) return;
    }
    if (column.name === sortBy) {
      setSortType((prev) => getNextSortType(prev));
    } else {
      setSortBy(column.name);
      setSortType(SortType.asc);
    }
  };

  return (
    <table className="border-collapse">
      <thead className="text-left">
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              className={`p-2 bg-slate-100 border border-slate-300 ${column.isSortable ? "cursor-pointer" : ""}`}
              align={column.headerAlign}
              onClick={() => {
                if (column.isSortable) {
                  handleSort(column);
                }
              }}
            >
              <div className={`inline-flex items-center gap-1`}>
                {column.title}
                <div className="flex flex-col gap-[2px]">
                  <Caret
                    activated={
                      sortBy === column.name && sortType === SortType.asc
                    }
                    direction="up"
                  />
                  <Caret
                    activated={
                      sortBy === column.name && sortType === SortType.desc
                    }
                    direction="down"
                  />
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="relative">
        {(sortType === SortType.none ? rows : sortedRows).map((row) => (
          <tr key={row.id}>
            {columns.map((column) => {
              const value = row[column.name];
              if (value === undefined) {
                showWarning(`請確認 rows 是否包含 ${column.name}`);
              }
              return (
                <td
                  key={column.name}
                  className="p-2 border border-slate-300"
                  style={{
                    textAlign: column.bodyAlign || "left",
                  }}
                >
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
        {isFetching && <Fetching />}
      </tbody>
    </table>
  );
};

export { Table };
