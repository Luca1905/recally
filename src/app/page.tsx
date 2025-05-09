import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	const hello = await api.post.hello({ text: "from tRPC" });

	return (
		<HydrateClient>
			<main>{hello.greeting}</main>
		</HydrateClient>
	);
}
