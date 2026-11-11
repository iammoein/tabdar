import Icon, { type IconName } from "@/shared/components/Icon";

type CollectionIconProps = {
  name?: IconName;
  className?: string;
};

export default function CollectionIcon({
  name = 'archive',
  className = "",
}: CollectionIconProps) {
  return (
    <div
      className={`flex items-center justify-center size-10.5 bg-(--primary-soft) rounded-(--r-lg) ${className}`}
    >
      <Icon name={name} color="var(--primary)" />
    </div>
  );
}
