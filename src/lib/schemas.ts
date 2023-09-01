import * as z from 'zod';

export const formSchema = z.object({
  task: z.string().nonempty().nullish(),
  profiles: z
    .object({
      username: z.string().nonempty(),
    })
    .nullish(),
  status: z
    .union([
      z.literal('BACKLOG'),
      z.literal('PENDING'),
      z.literal('IN PROGRESS'),
      z.literal('COMPLETED'),
      z.literal('TO DO'),
    ])
    .nullish(),
  projectId: z.string().nullish(),
});
