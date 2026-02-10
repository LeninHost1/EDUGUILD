import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return null;
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { college: true, department: true, committee: true }
  });

  if (!fullUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p><span className="font-medium text-foreground">Name:</span> {fullUser.name}</p>
          <p><span className="font-medium text-foreground">Email:</span> {fullUser.email}</p>
          <p><span className="font-medium text-foreground">Role:</span> {fullUser.role}</p>
          <p><span className="font-medium text-foreground">User code:</span> {fullUser.code}</p>
          <p><span className="font-medium text-foreground">College:</span> {fullUser.college.name}</p>
          {fullUser.department ? <p><span className="font-medium text-foreground">Department:</span> {fullUser.department.name}</p> : null}
          {fullUser.committee ? <p><span className="font-medium text-foreground">Committee:</span> {fullUser.committee.name}</p> : null}
        </div>
      </Card>
    </div>
  );
}

