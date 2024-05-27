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
  argTypes: {
    columns: {
      description:
        "欄位資訊，需包含 name 和 title，title 為顯示名稱、name 對應到 rows 中 object 的 key。",
    },
    rows: {
      description: "資料，每筆資料需包含 id，且與 columns 中的 name 對應。",
    },
    hover: {
      description: "是否啟用 hover 效果",
    },
    isFirstColumnFixed: {
      description: "是否固定第一欄",
    },
    isLastColumnFixed: {
      description: "是否固定最後一欄",
    },
    isFetching: {
      description: "是否正在取得資料",
    },
    onSort: {
      description: "排序事件，需回傳欄位名稱和排序方式",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    hover: false,
    isFirstColumnFixed: false,
    isLastColumnFixed: false,
    isFetching: false,
  },
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
  parameters: {
    layout: "fullscreen",
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
  parameters: {
    layout: "fullscreen",
  },
};
