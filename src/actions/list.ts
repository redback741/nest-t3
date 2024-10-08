"use server"

import prisma from "@/lib/prisma";
import {
   createListZodSchema, 
   type createListZodSchemaType 
} from "@/schema/createList";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createList(data: createListZodSchemaType) {
  const user = await currentUser()

  if (!user) {
    throw new Error("用户未登录，请先登录")
  }

  const result = await createListZodSchema.safeParse(data)

  if(!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    }
  }
  
  // TODO
  await prisma.list.create({
    data: {
      name: data.name,
      color: data.color,
      userId: user.id,
    }
  })

  revalidatePath("/")

  return {
    success: true,
    message: '清单创建成功'
  }
  
}

export async function deleteList(id: number) {
  const user = await currentUser()
  if(!user) {
    throw new Error("用户未登录，请先登录")
  }

  await prisma.list.delete({
    where: {
      id,
      userId: user.id
    }
  })

  revalidatePath("/")
}