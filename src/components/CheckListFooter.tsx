"use client";

import { type List } from "@prisma/client"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { CirclePlus, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { deleteList } from "@/actions/list";
import { toast } from "./ui/use-toast";

interface Props {
  checkList: List
}

export default function CheckListFooter({ checkList }: Props) {
  const { id, createdAt } = checkList
  
  const deleteCheckList = async () => {
    try {
      await deleteList(id)
      toast({
        title: "操作成功",
        description: "清单已经删除",
      });
    } catch (e) {
      toast({
        title: "操作失败",
        description: "清单删除失败，请稍后重试",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Separator/>
      <footer className="flex h-[60px] w-full items-center justify-between text-sm text-white">
          <p>创建于 {createdAt.toLocaleDateString("zh-CN")}</p>
          <div>
            <Button size={"icon"} variant={"ghost"}>
              <CirclePlus />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
                  <AlertDialogDescription>该操作无法撤回</AlertDialogDescription>
                </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={deleteCheckList}>
                  确定
                </AlertDialogAction>
              </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
      </footer>
    </>
  )
}