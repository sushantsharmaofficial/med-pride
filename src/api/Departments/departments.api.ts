import { client } from "@/sanity/lib/client";
import { departmentQuery, departmentCountQuery } from "../GROQ/Queries";

export const getDepartments = async () => {
  const departments = await client.fetch(departmentQuery);
  return departments;
};

export const getDepartmentCount = async (departmentId: string) => {
  const count = await client.fetch(departmentCountQuery, { departmentId });
  return count;
}; 