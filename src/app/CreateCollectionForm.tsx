"use client";

import { ApolloProvider, gql, useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import apolloClient from "@/lib/apollo";

export default function CreateCollectionFormWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <CreateCollectionForm />
    </ApolloProvider>
  );
}

function CreateCollectionForm() {
  const {
    loading,
    data: collectionSpacesQueryData,
    fetchMore,
  } = useQuery(COLLECTION_SPACES_QUERY);

  const [createCollectionMutation] = useMutation(CREATE_COLLECTION_MUTATION, {
    update: (cache, { data: _mutationData }) => {
      // TODO: find more extensible way to update cache on mutation
      if (_mutationData?.createCollectionMutation) {
        cache.modify({
          fields: {
            collectionSpaces(existing, { isReference /*, toReference */ }) {
              const existingEdges = (existing.edges || []).slice();

              // Delete cursor on last edge
              const lastEntity = { ...existingEdges[0] };
              const cursor = isReference(existingEdges[0])
                ? readField<string>("cursor", existingEdges[0])
                : existingEdges[0].cursor;
              delete lastEntity.cursor;

              // put new edge at end of list
              existingEdges[0] = lastEntity;
              const newEdge = {
                __typename: "CollectionSpace",
                cursor,
                node: _mutationData.createCollectionMutation,
              };
              existingEdges.unshift(newEdge);
              return {
                ...existing,
                edges: existingEdges,
              };
            },
          },
        });
      }
    },
    onCompleted() {
      // TODO: Can use this function to update fetch more button state
    },
  });

  const handleSubmitNewCollection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createCollectionMutation({
      variables: {
        name: formData.get("name").trim(),
        description: formData.get("description").trim(),
      },
    });
  };

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        cursor: collectionSpacesQueryData.collectionSpaces.pageInfo.endCursor,
      },
    });
  };

  return (
    <>
      <form
        noValidate={true}
        autoComplete="false"
        onSubmit={handleSubmitNewCollection}
      >
        <TextField size="small" label="Name" name="name" id="name" />
        <TextField
          multiline={true}
          size="small"
          label="Description"
          name="description"
          id="description"
        />
        <Button type="submit" disabled={loading}>
          Create Collection
        </Button>
      </form>
      <div>{JSON.stringify(collectionSpacesQueryData?.collectionSpaces)}</div>
      {collectionSpacesQueryData?.collectionSpaces.pageInfo.hasNextPage && (
        <Button onClick={handleFetchMore}>Fetch More</Button>
      )}
    </>
  );
}

const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollection($name: String!, $description: String) {
    createCollectionMutation(name: $name, description: $description) {
      id
      name
      description
      updatedAt
      createdAt
      archivedAt
      visibility
      userId
    }
  }
`;

const COLLECTION_SPACES_QUERY = gql`
  query CollectionSpaces($cursor: String) {
    collectionSpaces(first: 5, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
          description
          updatedAt
          createdAt
          archivedAt
          visibility
          userId
        }
      }
    }
  }
`;
