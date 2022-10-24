// Generated by ts-to-zod
import { z } from "zod";

export const listAliasQueryParamsSchema = z.object({
  domain: z.string().optional(),
  from: z.number().optional(),
  limit: z.number().optional(),
  projectId: z.string().optional(),
  rollbackDeploymentId: z.string().optional(),
  since: z.number().optional(),
  teamId: z.string().optional(),
  until: z.number().optional(),
});

export const aliasSchema = z.object({
  alias: z.string(),
  created: z.string(),
  createdAt: z.number().optional(),
  creator: z
    .object({
      uid: z.string(),
      email: z.string(),
      username: z.string(),
    })
    .optional(),
  deletedAt: z.number().optional(),
  deployment: z
    .object({
      id: z.string(),
      url: z.string(),
      meta: z.string().optional(),
    })
    .optional(),
  deploymentId: z.string().nullable(),
  projectId: z.string().nullable(),
  redirect: z.string().optional().nullable(),
  redirectStatusCode: z
    .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)])
    .optional(),
  uid: z.string(),
  updatedAt: z.number().optional(),
});

export const deploymentAliasesResponseSchema = z.object({
  aliases: z.array(
    z.object({
      uid: z.string(),
      alias: z.string(),
      created: z.string(),
      redirect: z.string().optional().nullable(),
    })
  ),
});

export const newAliasSchema = z.object({
  uid: z.string(),
  alias: z.string(),
  created: z.string(),
  oldDeploymentId: z.string().optional().nullable(),
});