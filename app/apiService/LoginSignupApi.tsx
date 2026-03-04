import { BASE_URL } from "./api";
export const allUsers = async () => {
  const res = await fetch(`${BASE_URL}/users/all`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const getUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user with id ${id}`);
  return res.json();
};

export const signUp = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/users/remove/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete user with id ${id}`);
  return res.json();
};