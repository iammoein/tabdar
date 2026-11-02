import type { Collection, CollectionTab } from "@/features/collections/types/collection.types";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import { useState } from "react";

type ModalProps = {
  selectedTabLength: number;
  selectedTabs: chrome.tabs.Tab[];
  onClose: () => void;
  onSave: (collection: Collection) => void;
};

export default function SaveCollectionModal({
  selectedTabLength,
  selectedTabs,
  onClose,
  onSave,
}: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const collectionTabs: CollectionTab[] = selectedTabs.map(
    ({ title, url, favIconUrl }) => ({
      title: title ?? "Untitled",
      url: url ?? "",
      favIconUrl,
    }),
  );

  const handleSaveCollection = () => {
    if (title.trim() === "") return;
    const collection = {
      title: title.trim(),
      description,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      tabs: collectionTabs,
    };
    onSave(collection);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="max-h-[calc(100dvh-40px)] overflow-y-auto overscroll-contain p-6 bg-(--elevated) rounded-(--r-lg) border border-(--border)">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex items-center justify-center size-10.5 bg-(--primary-soft) rounded-(--r-lg)">
              <Icon name="archive" color="var(--primary)" />
            </div>
            <div>
              <h2 className="text-[16px] text-(--text) font-normal">
                Save New Collection
              </h2>
              <p className="text-[12px] text-(--secondary)">
                {selectedTabLength} selected items will be saved in this
                collection.
              </p>
            </div>
          </div>
          <Button variant="secondary" onClick={onClose}>
            <Icon name="close" size={16} />
          </Button>
        </div>

        <div className="mt-4">
          <label htmlFor="">
            <span>Collection's Name</span>
            <Input
              placeholder="New Collection..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-4">
          <label htmlFor="">
            <span>Collection's Description</span>
            <Textarea
              placeholder="What is this collection about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-3 items-center w-full h-15 p-3 mt-4 bg-(--primary-soft) border border-(--primary-border) rounded-(--r-md)">
          <ul className="flex">
            {collectionTabs.slice(0, 7).map((tab) => (
              <li
                key={tab.url}
                className="w-7.25 h-7.25 -ml-2.25 bg-(--primary) rounded-(--r-sm) border-2 border-(--on-primary) overflow-hidden "
              >
                <img
                  src={tab.favIconUrl}
                  className="w-full h-full object-contain"
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <strong className="text-(--text) text-[11px]">
              {selectedTabLength} tabs are ready to be saved.
            </strong>
            <small className="text-(--secondary) text-[10px]">
              Tabs remain open after saving.
            </small>
          </div>
        </div>

        <div className="flex justify-end gap-2.25 mt-5.5">
          <Button onClick={handleSaveCollection}>Save Collection</Button>
          <Button variant="secondary" onClick={onClose}>
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
}
