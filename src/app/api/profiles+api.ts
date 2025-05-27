import { createClient } from "@libsql/client/web";

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set");
}

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function GET() {
  const result = await turso.execute("SELECT * FROM profiles");

  return Response.json({
    profiles: result.rows.map((row) => {
      const item: Record<string, unknown> = {};
      result.columns.forEach((name, index) => {
        item[name] = row[index];
      });
      return item;
    }),
  });
}

export async function POST(request: Request) {
  const { name, bio, avatar, color, userId } = await request.json();

  try {
    await turso.execute(
      "INSERT INTO profiles (name, bio, avatar, color, userId, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [name, bio, avatar || null, color || null, userId, Date.now()],
    );
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Failed to create profile",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return Response.json({
    message: "Profile created",
  });
}

export async function PUT(request: Request) {
  const { name, bio, avatar, color, userId } = await request.json();

  await turso.execute(
    "UPDATE profiles SET name = ?, bio = ?, avatar = ?, color = ?, updatedAt = ? WHERE userId = ?",
    [name, bio, avatar || null, color || null, Date.now(), userId],
  );

  return Response.json({ message: "Profile updated" });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await turso.execute("DELETE FROM profiles WHERE id = ?", [id]);

  return Response.json({ message: "Profile deleted" });
}
