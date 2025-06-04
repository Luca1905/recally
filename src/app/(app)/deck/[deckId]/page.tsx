import { z } from "zod/v4";
import StudyPage from "./study-deck";

export default async function Page(props: {
  params: Promise<{ deckId: string }>;
}) {
  const params = await props.params;

  const { data, success } = z
    .object({
      deckId: z.uuidv4(),
    })
    .safeParse(params);

  if (!success) return <div>Invalid deck ID</div>;

  const parsedDeckId = data.deckId;
  console.log("parsed string: ", parsedDeckId);

  return <StudyPage deckId={parsedDeckId} />;
}
