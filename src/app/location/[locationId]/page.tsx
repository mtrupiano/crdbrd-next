export default async function Page({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const locationId = (await params).locationId;
  return <div>{locationId}</div>;
}
