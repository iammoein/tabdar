import Button from "@/shared/components/Button";

type HeadersProps = {
  tabsLength: number;
  windowsLength: number;
};

const themes = ["Light", "Dark", "System"];

export default function Headers({ tabsLength, windowsLength }: HeadersProps) {
  return (
    <header className=" flex items-center justify-between w-full h-17 px-10.5 bg-(--surface) border-b border-(--surface-hover) z-10">
      <div className="text-(--secondary)">
        {tabsLength} tabs open acroos {windowsLength} windows
      </div>

      <ul className="flex items-center gap-0.5 p-0.75 bg-(--elevated) border border-(--border) rounded-lg">
        {themes.map((theme) => (
          <li key={theme}>
            <Button className="p-2" variant="none">{theme}</Button>
          </li>
        ))}
      </ul>
    </header>
  );
}
