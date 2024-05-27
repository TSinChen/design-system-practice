import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { MOCK_MASSIVE_DATA, MOCK_DATA } from "./Table.mocks";
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

export const Hover: Story = {
  name: "Hover 特效",
  args: {
    ...MOCK_DATA,
    hover: true,
  },
};

export const Many: Story = {
  name: "多筆資料",
  args: {
    ...MOCK_MASSIVE_DATA,
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

export const FixedColumns: Story = {
  name: "固定欄位",
  args: {
    ...MOCK_MASSIVE_DATA,
    isFirstColumnFixed: true,
    isLastColumnFixed: true,
  },
};
