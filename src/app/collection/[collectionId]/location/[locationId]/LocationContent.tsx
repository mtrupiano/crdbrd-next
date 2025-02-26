import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { gql } from "@/__generated__";

export default function LocationContent({
  locationId,
}: {
  locationId: string;
}) {
  const { loading, data: realWorldLocationQueryData } = useQuery(
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
        collectionId:
          realWorldLocationQueryData.realWorldLocation.collectionSpace.id,
      },
    });

    console.log(addCardToLocationMutationData);
  };

  const collectionSpaceId =
    realWorldLocationQueryData?.realWorldLocation.collectionSpace.id;

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="flex p-2 space-x-2 items-center">
          <a href={`/collection/${collectionSpaceId}`}>
            <span className="text-lg">
              {
                realWorldLocationQueryData.realWorldLocation.collectionSpace
                  .name
              }
            </span>
          </a>
          <span>&gt;</span>
          <a href={`/collection/${collectionSpaceId}/location/${locationId}`}>
            <span className="text-lg">
              {realWorldLocationQueryData.realWorldLocation.name},{" "}
              {realWorldLocationQueryData.realWorldLocation.description}
            </span>
          </a>
        </div>
      )}
      <form onSubmit={handleAddCard}>
        <TextField label="Card Multiverse ID" name="multiverseId" />
        <Button type="submit">Add</Button>
      </form>

      <div>
        {realWorldLocationQueryData?.realWorldLocation.cards.map((card) => (
          <div key={card.multiverseId}>{card.multiverseId}</div>
        ))}
      </div>
    </div>
  );
}

const LOCATION_CONTENT_QUERY = gql`
  query realWorldLocationQuery($locationId: String!) {
    realWorldLocation(locationId: $locationId) {
      id
      name
      description
      collectionSpace {
        id
        name
      }
      cards {
        id
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
      collectionSpaceId
    }
  }
`;
