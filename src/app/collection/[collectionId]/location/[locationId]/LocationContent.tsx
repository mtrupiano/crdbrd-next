import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { gql } from "@/__generated__";

export default function LocationContent({
  locationId,
}: {
  locationId: string;
}) {
  const { data: realWorldLocationQueryData } = useQuery(
    LOCATION_CONTENT_QUERY,
    {
      variables: {
        locationId,
      },
    },
  );

  const [addCardToLocationMutation] = useMutation(
    ADD_CARD_TO_LOCATION_MUTATION,
  );

  const handleAddCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const multiverseId = formData.get("multiverseId");
    const addCardToLocationMutationData = addCardToLocationMutation({
      variables: {
        locationId,
        multiverseId,
        collectionId: "",
      },
    });

    console.log(addCardToLocationMutationData);
  };

  return (
    <div>
      <pre>{JSON.stringify(realWorldLocationQueryData)}</pre>
      <form onSubmit={handleAddCard}>
        <TextField label="Card Multiverse ID" name="multiverseId" />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

const LOCATION_CONTENT_QUERY = gql`
  query realWorldLocationQuery($locationId: String!) {
    realWorldLocation(locationId: $locationId) {
      id
      name
      description
      cards {
        multiverseId
      }
    }
  }
`;

const ADD_CARD_TO_LOCATION_MUTATION = gql`
  mutation addCardToLocationMutation(
    $multiverseId: String!
    $locationId: String!
    $collectionId: String!
  ) {
    collectCard(
      multiverseId: $multiverseId
      locationId: $locationId
      collectionId: $collectionId
    ) {
      id
      multiverseId
      locationId
      collectionId
    }
  }
`;
