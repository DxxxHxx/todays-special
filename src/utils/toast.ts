import { toast } from "sonner";

export default function triggerToast(msg: string) {
  toast(msg, {
    description: new Date().toLocaleString(),
    action: {
      label: "닫기",
      onClick: () => console.log("Undo"),
    },
  });
}
