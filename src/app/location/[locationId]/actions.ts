export const addNewCardAction = async (
  multiverseId: string,
  userId: string,
  collectionSpaceId: string,
  locationId: string,
) => {
  const newCard = await prisma.collectedCard.create({
    data: {
      multiverseId,
      realWorldLocation: {
        connect: {
          id: locationId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      collectionSpace: {
        connect: {
          id: collectionSpaceId,
        },
      },
    },
  });

  return newCard;
};

/**
 * "Moves" a group of cards to a specified location
 *
 * @param cardDbIds List of collected card database IDs to move
 * @param locationId Destination RealWorldLocation
 */
export async function moveCardsAction(cardDbIds: string[], locationId: string) {
  const result = await prisma.collectedCard.updateMany({
    where: {
      id: {
        in: cardDbIds,
      },
    },
    data: {
      locationId,
    },
  });

  return result;
}
