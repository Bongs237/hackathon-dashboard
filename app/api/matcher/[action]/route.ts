import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest, { params }: { params: { action: string } }) {
  const action = params.action;

  if (action === "get_profiles") {
    const profiles = await getProfiles(request);
    return NextResponse.json(profiles);
  }
}

async function getProfiles(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profiles = await prisma.application.findMany({
    where: {
      status: {
        in: ["accepted", "confirmed"],
      },
      userId: {
        not: userId,
      },
    },
    select: {
      userId: true,
      fullName: true,
      whyAttend: true,
      projectExperience: true,
      futurePlans: true,
      funFact: true,
      skillLevel: true,
      hackathonExperience: true,
    }
  });
  return profiles;
}

