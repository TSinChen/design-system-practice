import { SortType } from "./Table.types";

export const getNextSortType = (sortType: SortType) => {
  switch (sortType) {
    case SortType.asc:
      return SortType.desc;
    case SortType.desc:
      return SortType.none;
    case SortType.none:
      return SortType.asc;
  }
};
