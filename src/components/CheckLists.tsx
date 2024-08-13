
import { type List } from "@prisma/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListMap } from "@/lib/const";
import { cn } from "@/lib/utils";
import CheckListFooter from "./CheckListFooter";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Check } from "lucide-react";

interface Props {
  checkList: List;
}

function CheckList({ checkList }: Props) {
  const { name, color } = checkList

  return (
    <Card
    className={cn("w-full text-white sm:col-span-2", ListMap.get(color))}
    x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader>
        <CardTitle>{ name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p> 任务列表 </p>
      </CardContent>
      <CardFooter className="flex-col pb-2">
        <CheckListFooter checkList={checkList}/>
      </CardFooter>
    </Card>
  )
}

export async function  CheckLists() {
  const user = await currentUser()
  const checkLists = await prisma.list.findMany({
    where: {
      userId: user?.id,
    }
  })

  if (checkLists.length === 0) {
    return <div className="mt-4">尚未创建清单，赶紧创建一个吧!</div>
  }

  return (
    <>
      <div className="mt-6 flex w-full flex-col gap-4">
        {checkLists.map((checkList) => (
          <CheckList key={checkList.id} checkList={checkList} />
        ))}
      </div>
    </>
  )
}