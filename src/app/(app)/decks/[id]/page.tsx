import { z } from "zod";
import DeckDetail from "./deckDetail";

export default async function DeckDetailPage(props: {
	params: Promise<{ deckId: string }>;
}) {
	const params = await props.params;

	const { data, success } = z
		.object({
			deckId: z.coerce.string(),
		})
		.safeParse(params);

	if (!success) return <div>Invalid deck ID</div>;

	const parsedDeckId = data.deckId;

	return <DeckDetail deckId={parsedDeckId} />;
}
