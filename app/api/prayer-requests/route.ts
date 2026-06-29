import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const prayerRequestSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    contact: z.string().trim().min(1).optional(),
    request: z.string().trim().min(1),
    isPublic: z.boolean().optional(),
    isPrivate: z.boolean().optional(),
    followUpRequested: z.boolean().optional(),
    urgent: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isPublic !== undefined && data.isPrivate !== undefined && data.isPublic === data.isPrivate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['isPublic'],
        message: 'isPublic and isPrivate must be opposite boolean values.',
      })
    }
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

    const isPublic = data.isPublic ?? false
    const isPrivate = data.isPrivate ?? !isPublic

    const created = await prisma.prayerRequest.create({
      data: {
        name: data.name,
        contact: data.contact,
        request: data.request,
        isPublic,
        isPrivate,
        followUpRequested: data.followUpRequested ?? false,
        urgent: data.urgent ?? false,
      },
    })

    return NextResponse.json(
      {
        message: 'Prayer request submitted successfully.',
        data: created,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to submit prayer request:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
