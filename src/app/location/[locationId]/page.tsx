import { auth } from "@/lib/auth";
import { Visibility } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const locationId = (await params).locationId;
  const location = await prisma.realWorldLocation.findUnique({
    where: {
      id: locationId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      cards: {
        select: {
          multiverseId: true,
        },
      },
    },
  });

  if (location?.visibility === Visibility.PRIVATE) {
    const session = await auth();
    if (!session || session.user?.id !== location.userId) {
      redirect("/home");
    }
  }

  return (
    <div>
      <h1 className="text-2xl">{location?.name}</h1>
      <p>{location?.description}</p>
    </div>
  );
}
