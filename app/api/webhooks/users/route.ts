import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
	const SIGNING_SECRET = process.env.SIGNING_SECRET;


	if (!SIGNING_SECRET) {
		throw new Error(
			"Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	// Get headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error: Missing Svix headers", {
			status: 400,
		});
	}

	// Get body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt: WebhookEvent;

	// Verify payload with headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		if (err instanceof Error) {
			return new Response(err.message, { status: 400 });
		}
		return new Response("Error: Verification error", {
			status: 400,
		});
	}

	// Do something with payload
	const { id, username, image_url, email_addresses } = evt.data as UserJSON;
	const eventType = evt.type;

	if (!id || !username || !image_url || !email_addresses) {
		return new Response("Error: Missing required fields", {
			status: 400,
		});
	}

	const user = {
		id,
		username: username as string,
		userEmail: email_addresses[0].email_address,
		image_url,
	};

	if (eventType === "user.created" || eventType === "user.updated") {
	try {
		await prisma.users.upsert({
			where: {
				externalId: user.id,
			},
			update: {
				username: user.username,
				email_address: user.userEmail,
				image_url: user.image_url,
			},
			create: {
				externalId: user.id,
				username: user.username,
				email_address: user.userEmail,
				image_url: user.image_url,
			},
		});
		return new Response(`Webhook received: ${eventType} and user data updated successfully.`, { status: 200 });
	} catch (error) {
		return new Response(`Database error: ${(error as Error).message}`, { status: 500 });
	}

  } else {
	return new Response(`No action taken for event: ${eventType}.`, { status: 200 });
}
}