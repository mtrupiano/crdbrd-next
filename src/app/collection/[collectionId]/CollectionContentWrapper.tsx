"use client";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import CreateLocationForm from "./CreateLocationForm";
import Link from "next/link";

export default function CollectionContentWrapper({
  collectionId,
}: {
  collectionId: string;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <CollectionContent collectionId={collectionId} />
    </ApolloProvider>
  );
}

function CollectionContent({ collectionId }: { collectionId: string }) {
  const { loading, data: collectionSpaceQueryData } = useQuery(
    COLLECTION_CONTENT_QUERY,
    {
      variables: {
        collectionId,
      },
    },
  );

  const getRealWorldLocations = () =>
    collectionSpaceQueryData?.collectionSpace?.realWorldLocations;

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {JSON.stringify(collectionSpaceQueryData)}
          {collectionSpaceQueryData?.collectionSpace?.id && (
            <CreateLocationForm
              collectionSpaceId={collectionSpaceQueryData.collectionSpace.id}
            />
          )}

          <div style={{ margin: "40px" }} />

          {!!getRealWorldLocations() &&
            getRealWorldLocations().map((location) => (
              <Link
                key={location.id}
                href={`/collection/${collectionSpaceQueryData.collectionSpace.id}/location/${location.id}`}
              >
                {location.name}
              </Link>
            ))}
        </>
      )}
    </div>
  );
}

const COLLECTION_CONTENT_QUERY = gql`
  query CollectionContent($collectionId: String!) {
    collectionSpace(id: $collectionId) {
      id
      name
      description
      createdAt
      updatedAt
      archivedAt
      userId
      realWorldLocations {
        id
        name
        cards {
          id
          multiverseId
        }
      }
    }
  }
`;
