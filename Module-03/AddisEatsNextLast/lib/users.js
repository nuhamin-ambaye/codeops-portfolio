import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { env } from "./env";

// This map is intentionally in memory for the module exercise. It is not durable
// and must be replaced with persistent user storage before deployment.
const users = globalThis.__addisEatsUsers || new Map();
if (!globalThis.__addisEatsUsers) globalThis.__addisEatsUsers = users;

export async function findUserByPhone(phone) {
  const registeredUser = users.get(phone);
  if (registeredUser) return registeredUser;

  // A staff account exists only when an operator supplies a bcrypt hash in env.
  const staffPhone = env.DEMO_STAFF_PHONE;
  const staffHash = env.DEMO_STAFF_PASSWORD_HASH;
  if (staffPhone && staffHash && phone === staffPhone && !staffHash.startsWith("replace-")) {
    return {
      id: "staff_addis_eats",
      name: env.DEMO_STAFF_NAME || "Addis Eats Staff",
      phone: staffPhone,
      role: "staff",
      passwordHash: staffHash,
    };
  }

  return null;
}

export async function registerCustomer({ name, phone, password }) {
  if (users.has(phone) || (env.DEMO_STAFF_PHONE && phone === env.DEMO_STAFF_PHONE)) {
    return { error: "An account with this phone number already exists." };
  }

  const passwordHash = await hash(password, 12);
  const user = {
    id: `user_${randomUUID()}`,
    name,
    phone,
    role: "customer",
    passwordHash,
  };
  users.set(phone, user);
  return { user: { id: user.id, name: user.name, phone: user.phone, role: user.role } };
}
