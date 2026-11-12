import { useState, type SubmitEvent } from "react";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";

type RenameCollectionModalProps = {
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
};

export default function RenameCollectionModal({
  currentName,
  onClose,
  onSave,
}: RenameCollectionModalProps) {
  const [name, setName] = useState<string>(currentName);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newName = name.trim();
    if (!newName) return;

    onSave(newName);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      contentClassName="p-6 bg-(--elevated) rounded-(--r-lg) border border-(--border)"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-[16px] font-normal text-(--text)">
          Rename Collection
        </h2>

        <label className="mt-4 block text-[12px] text-(--secondary)">
          Collection name
          <Input
            autoFocus
            className="mt-2 text-(--text)"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <div className="mt-5 flex justify-end gap-2.25">
          <Button type="submit" disabled={!name.trim()}>
            Save
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
