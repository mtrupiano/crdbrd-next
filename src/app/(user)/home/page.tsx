import CreateCollectionForm from "@/app/(user)/home/CreateCollectionForm";
import { fetchCollections } from "./actions";

const PAGE_SIZE = 10;

export default async function UserHome() {
  const fetchCollectionsResult = await fetchCollections({
    skip: 0,
    take: PAGE_SIZE,
  });

  return (
    <div className="m-2">
      <CreateCollectionForm />
      <div>
        {fetchCollectionsResult?.data.collections.map((coll) => (
          <div key={coll.id}>
            <a href={`/collection/${coll.id}`}>{coll.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
