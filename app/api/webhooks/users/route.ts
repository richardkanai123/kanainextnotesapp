import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    
      if (err instanceof Error) {
          return new Response(err.message, { status: 400 })
      }
       return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
    const {id,username,email_addresses  } = evt.data as UserJSON
  const eventType = evt.type
 
  
    const userData = {
        id,
        username: username as string,
        userEmail: email_addresses[0].email_address
    }

    const newUser = await prisma.users.upsert({
        where: {
            externalId: userData.id
        },
        update: {
            username: userData.username,
            email_address: userData.userEmail  
        },
        create: {
            externalId: userData.id,
            username: userData.username,
            email_address: userData.userEmail
        }
    })

    if (!newUser) { 
        return new Response('Error: User not created', {
            status: 400,
          })
    }

  return new Response(`Webhook received: ${eventType} ` , { status: 200 })
}

