export default async function Page({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const collectionId = (await params).collectionId;
  return <div>{collectionId}</div>;
}
