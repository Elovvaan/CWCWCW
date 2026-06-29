import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ok } from '@/lib/api'

const prayerRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  contact: z.string().trim().min(1, 'Contact is required'),
  request: z.string().trim().min(1, 'Prayer request is required'),
  isPublic: z.boolean().optional().default(false),
  isPrivate: z.boolean().optional().default(true),
  urgent: z.boolean().optional().default(false),
  followUpRequested: z.boolean().optional().default(false),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = prayerRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid prayer request payload.',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const data = parsed.data
    const isPublic = data.isPublic
    const isPrivate = data.isPrivate ?? !isPublic

    if (isPublic === isPrivate) {
      return NextResponse.json(
        { error: 'isPublic and isPrivate must be opposite boolean values.' },
        { status: 400 }
      )
    }

    await prisma.prayerRequest.create({
      data: {
        name: data.name,
        contact: data.contact,
        request: data.request,
        isPublic,
        isPrivate,
        urgent: data.urgent,
        followUpRequested: data.followUpRequested,
      },
    })

    return ok('Prayer request submitted.')
  } catch (error) {
    console.error('Failed to submit prayer request:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
