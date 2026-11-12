import { useEffect, useRef } from "react";

import CollectionIcon from "@/features/collections/components/CollectionIcon";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import formatDate from "@/shared/utils/formatDate";

const menuItemBaseClassName =
  "h-9 min-h-0 w-full justify-start rounded-(--r-sm) px-3 text-left text-[12px] font-normal";
const menuItemClassName = `${menuItemBaseClassName} text-(--text) hover:bg-(--surface-hover) hover:text-(--text)`;
const destructiveMenuItemClassName = `${menuItemBaseClassName} text-(--danger) hover:bg-(--danger-soft) hover:text-(--danger)`;

type CollectionItemProps = {
  collection: Collection;
  isOpenMenu: boolean;
  onRestoreTab: (tabs: CollectionTab[]) => void;
  onToggleMenu: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CollectionItem({
  collection: { id, title, description, tabs, createdAt },
  isOpenMenu,
  onRestoreTab,
  onToggleMenu,
  onDelete,
}: CollectionItemProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpenMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onToggleMenu(id);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);

    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [id, isOpenMenu, onToggleMenu]);

  return (
    <article className="flex h-full w-full flex-col justify-center gap-4 rounded-(--r-md) border border-(--border) bg-(--surface) p-4.5 transition-transform duration-250 hover:-translate-y-1">
      <div className="relative flex justify-between">
        <CollectionIcon />

        <div ref={menuRef} className="relative self-center">
          <Button
            variant="none"
            className="min-h-0 self-center hover:bg-transparent hover:text-(--primary)"
            onClick={() => onToggleMenu(id)}
          >
            <Icon name="more" />
          </Button>

          {isOpenMenu && (
            <ul className="shadow-(--shadow-card absolute top-full right-0 z-20 mt-2 min-w-44 rounded-(--r-md) border border-(--border) bg-(--surface) p-1 select-none">
              <li>
                <Button variant="none" className={menuItemClassName}>
                  Rename collection
                </Button>
              </li>
              <li>
                <Button variant="none" className={menuItemClassName}>
                  Duplicate collection
                </Button>
              </li>
              <li className="my-1 border-t border-(--border) pt-1">
                <Button
                  variant="none"
                  className={destructiveMenuItemClassName}
                  onClick={() => onDelete(id)}
                >
                  Delete collection
                </Button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="flex min-h-18 w-full flex-col">
        <h3 className="text-[14px] text-(--text)">{title}</h3>
        <p className="h-16 overflow-y-auto text-[11px] text-(--secondary)">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-(--primary-soft) px-2.5 py-1 text-(--primary)">
          {tabs.length} tabs
        </span>

        <span className="text-[10px] text-(--muted)">
          {formatDate(createdAt)}
        </span>
      </div>

      <Button
        variant="secondary"
        className="flex w-full gap-2"
        onClick={() => onRestoreTab(tabs)}
      >
        <Icon name="external" />
        Open Tabs
      </Button>
    </article>
  );
}
