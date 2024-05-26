import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { MOCK_DATA } from "./Table.mocks";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  name: "基本用法",
  args: {
    ...MOCK_DATA,
  },
};

export const Many: Story = {
  name: "多筆資料",
  args: {
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
  },
};

export const SortByServer: Story = {
  name: "後端排序",
  args: {
    ...MOCK_DATA,
  },
  render: (args) => {
    const [isFetching, setIsFetching] = useState(false);
    return (
      <Table
        {...args}
        isFetching={isFetching}
        isSortByServer
        onSort={() => {
          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
          }, 1000);
        }}
      />
    );
  },
};
