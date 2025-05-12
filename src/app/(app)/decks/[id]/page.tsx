import { z } from "zod";
import DeckDetail from "./deckDetail";

export default async function DeckDetailPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;

	const { data, success } = z
		.object({
			id: z.coerce.number(),
		})
		.safeParse(params);

	if (!success) return <div>Invalid deck ID</div>;
	const parsedDeckId = data.id;

	return <DeckDetail deckId={parsedDeckId} />;
}
