import { useState } from "react";

import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import Textarea from "@/shared/components/Textarea";

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
    <Modal
      onClose={onClose}
      contentClassName="p-6 bg-(--elevated) rounded-(--r-lg) border border-(--border)"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="flex size-10.5 items-center justify-center rounded-(--r-lg) bg-(--primary-soft)">
            <Icon name="archive" color="var(--primary)" />
          </div>
          <div>
            <h2 className="text-[16px] font-normal text-(--text)">
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
            autoFocus
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

      <div className="mt-4 flex h-15 w-full items-center gap-3 rounded-(--r-md) border border-(--primary-border) bg-(--primary-soft) p-3">
        <ul className="flex">
          {collectionTabs.slice(0, 7).map((tab) => (
            <li
              key={tab.url}
              className="-ml-2.25 h-7.25 w-7.25 overflow-hidden rounded-(--r-sm) border-2 border-(--on-primary) bg-(--primary)"
            >
              <img
                src={tab.favIconUrl}
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
        <div className="flex flex-col">
          <strong className="text-[11px] text-(--text)">
            {selectedTabLength} tabs are ready to be saved.
          </strong>
          <small className="text-[10px] text-(--secondary)">
            Tabs remain open after saving.
          </small>
        </div>
      </div>

      <div className="mt-5.5 flex justify-end gap-2.25">
        <Button onClick={handleSaveCollection}>Save Collection</Button>
        <Button variant="secondary" onClick={onClose}>
          Discard
        </Button>
      </div>
    </Modal>
  );
}
