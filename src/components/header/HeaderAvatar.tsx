import supabase from "@/supabase/client";
import { googleLogout } from "@/utils/auth/googleAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function HeaderAvatar({ id }: { id: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(`${id}`);
      setSrc(publicUrl);
    })();
  }, [id]);
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="flex items-center justify-center border rounded-full cursor-pointer size-9">
          <AvatarImage className="rounded-full" src={src} />
          <AvatarFallback className="text-xs">사용자</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-fit">
        <ul className="flex flex-col gap-y-3">
          <li>
            <Link to={"/mypage"}>
              <Button variant={"ghost"}>마이 페이지</Button>
            </Link>
          </li>
          <li>
            <Button onClick={googleLogout} variant={"ghost"}>
              로그아웃
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export const PopoverList = () => {
  return (
    <ul className="flex flex-col items-center gap-y-3 justify-items-center">
      <li>
        <Link to={"/mypage"}>
          <Button className="text-base" variant={"ghost"}>
            마이 페이지
          </Button>
        </Link>
      </li>
      <li>
        <Button onClick={googleLogout} className="text-base" variant={"ghost"}>
          로그아웃
        </Button>
      </li>
    </ul>
  );
};
