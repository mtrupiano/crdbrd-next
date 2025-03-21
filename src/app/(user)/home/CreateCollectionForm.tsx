"use client";

import { useActionState } from "react";
import { createCollectionSpace } from "./actions";
import VisibilityRadioButtonGroup from "../_components/VisibilityRadioButtonGroup";

async function createCollectionAction(currentState, formData: FormData) {
  return await createCollectionSpace(formData);
}

export default function CreateCollectionForm() {
  const [formState, formAction] = useActionState(createCollectionAction, null);
  return (
    <form noValidate={true} autoComplete="off" action={formAction}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="collection-name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Collection Name
          </label>
          <input
            type="text"
            name="collection-name"
            id="collection-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formState?.validationErrors?.["collection-name"] && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Required
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="collection-description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Collection Description
          </label>
          <input
            type="text"
            name="collection-description"
            id="collection-description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <VisibilityRadioButtonGroup fieldName="collection-visibility" />
        <button
          formAction={formAction}
          type="submit"
          className="cursor-pointer  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-hidden dark:focus:ring-blue-800"
        >
          Create Collection
        </button>
      </div>
    </form>
  );
}
