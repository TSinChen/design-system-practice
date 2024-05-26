import cx from "classnames";

type Props = {
  activated: boolean;
  direction: "up" | "down";
};

const Caret = ({ activated, direction }: Props) => {
  return (
    <div
      className={cx(
        direction === "up" ? "border-b-4" : "border-t-4",
        activated ? "border-slate-600" : "border-slate-300",
        "w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent"
      )}
    />
  );
};

export default Caret;
