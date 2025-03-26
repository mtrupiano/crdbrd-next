"use client";

import { deleteCollection } from "./actions";
import TrashIcon from "@/app/assets/Trash--Streamline-Bootstrap.svg";

export default function DeleteCollectionButton({
  collectionSpaceId,
}: {
  collectionSpaceId: string;
}) {
  return (
    <button
      type="button"
      onClick={() => deleteCollection(collectionSpaceId)}
      className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
    >
      <TrashIcon color="red" />
    </button>
  );
}
