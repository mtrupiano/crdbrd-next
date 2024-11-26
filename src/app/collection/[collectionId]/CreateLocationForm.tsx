import { gql, useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";

export default function CreateLocationForm({
  collectionSpaceId,
}: {
  collectionSpaceId: number;
}) {
  const [createLocationMutation] = useMutation(CREATE_LOCATION_MUTATION);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const description = formData.get("description");
    const newLocation = await createLocationMutation({
      variables: {
        name,
        description,
        collectionSpaceId,
      },
    });

    console.log(newLocation);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" size="small" />
        <TextField name="description" label="Description" size="small" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

const CREATE_LOCATION_MUTATION = gql`
  mutation CreateLocation(
    $name: String!
    $description: String
    $collectionSpaceId: ID!
  ) {
    createLocationMutation(
      name: $name
      description: $description
      collectionSpaceId: $collectionSpaceId
    ) {
      id
    }
  }
`;
