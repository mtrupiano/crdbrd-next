import LocationContentWrapper from "./LocationContentWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  console.log(typeof window === undefined);
  const locationId = (await params).locationId;
  return <LocationContentWrapper locationId={locationId} />;
}
