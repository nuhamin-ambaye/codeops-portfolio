import { z } from "zod";
import { registerCustomer } from "../../../lib/users";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^(09|\+2519)\d{8}$/),
  password: z.string().min(8).max(128),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Enter a name, a valid Ethiopian mobile number, and a password of at least 8 characters." },
      { status: 422 }
    );
  }

  const result = await registerCustomer(parsed.data);
  if (result.error) return Response.json({ error: result.error }, { status: 409 });
  return Response.json({ user: result.user }, { status: 201 });
}
