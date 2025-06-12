import { Action, toast } from "sonner";

export default function triggerToast(
  msg: string,
  action?: React.ReactNode | Action
) {
  toast(msg, {
    description: new Date().toLocaleString(),
    action: action ?? {
      label: "닫기",
      onClick: () => console.log("Undo"),
    },
  });
}
