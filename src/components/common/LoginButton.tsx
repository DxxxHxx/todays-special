import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { gooogleLogin } from "@/utils/auth/googleAuth";

export default function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <LogIn className="mr-2 h-4 w-4" />
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary ">
        <DialogHeader>
          <DialogTitle className="text-center mb-3 text-2xl">
            로그인
          </DialogTitle>
        </DialogHeader>
        <button
          onClick={gooogleLogin}
          className="shadow border flex gap-x-2 items-center justify-center bg-white md:w-2/3 w-full m-auto py-2 rounded-4xl cursor-pointer hover:bg-gray-200 text-black"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-4 h-4"
          />
          구글로 로그인하기
        </button>

        <button
          onClick={gooogleLogin}
          className="shadow border flex gap-x-2 items-center justify-center bg-white md:w-2/3 w-full m-auto py-2 rounded-4xl cursor-pointer hover:bg-gray-200 text-black"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-4 h-4"
          />
          구글로 로그인하기
        </button>
      </DialogContent>
    </Dialog>
  );
}
