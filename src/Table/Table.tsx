import { useMemo, useState } from "react";
import Caret from "../components/Caret";
import { showError, showWarning } from "../utils/functions";
import { Column, SortType, TableProps } from "./Table.types";
import { getNextSortType } from "./Table.helpers";
import Fetching from "../components/Fetching";
import cx from "classnames";

const Table = ({
  columns,
  rows,
  onSort,
  isFetching,
  isFirstColumnFixed,
  isLastColumnFixed,
  hover,
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
          {columns.map((column, index) => (
            <th
              key={column.name}
              className={cx(
                "p-2 bg-slate-100 border border-slate-300",
                column.isSortable && "cursor-pointer",
                isFirstColumnFixed && index === 0 && "sticky left-[-1px]",
                isLastColumnFixed &&
                  index === columns.length - 1 &&
                  "sticky right-0"
              )}
              align={column.headerAlign}
              onClick={() => {
                if (column.isSortable) {
                  handleSort(column);
                }
              }}
            >
              <div className={`inline-flex items-center gap-1`}>
                {column.title}
                {column.isSortable && (
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
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="relative">
        {(sortType === SortType.none ? rows : sortedRows).map((row) => (
          <tr key={row.id} className={cx(hover && "group")}>
            {columns.map((column, index) => {
              const value = row[column.name];
              if (value === undefined) {
                showWarning(`請確認 rows 是否包含 ${column.name}`);
              }
              return (
                <td
                  key={column.name}
                  className={cx(
                    "p-2 border border-slate-300 bg-white",
                    isFirstColumnFixed && index === 0 && "sticky left-[-1px]",
                    isLastColumnFixed &&
                      index === columns.length - 1 &&
                      "sticky right-0",
                    hover && "group-hover:bg-slate-50"
                  )}
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
