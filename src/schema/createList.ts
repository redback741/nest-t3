import { ListMap } from "@/lib/const";
import { z } from "zod";

export const createListZodSchema = z.object({
  name: z.string().min(1, {
    message: "名称不能为空",
  }),
  color: z.string()
    .min(1, {
      message: "颜色不能为空",
    })
    .refine((color) => [...ListMap.keys()].includes(color), {
      message: "颜色不存在",
    }),
})

export type createListZodSchemaType = z.infer<typeof createListZodSchema>