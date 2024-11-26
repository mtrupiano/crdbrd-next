"use client";

import apolloClient from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import LocationContent from "./LocationContent";

export default function LocationContentWrapper({
  locationId,
}: {
  locationId: string;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <LocationContent locationId={locationId} />
    </ApolloProvider>
  );
}
