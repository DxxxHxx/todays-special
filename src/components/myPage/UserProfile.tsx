import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/interface/user";
import triggerToast from "@/utils/toast";
import supabase from "@/supabase/client";
import { useRef } from "react";

export default function UserProfile({ user }: { user: User }) {
  const {
    user_metadata: { email, name, user_name },
  } = user;
  const userNameRef = useRef<HTMLInputElement>(null);

  const updateUserName = async () => {
    if (!userNameRef.current) return;

    if (!userNameRef.current.value) {
      return triggerToast("이름을 입력해주세요.");
    }
    try {
      const { data } = await supabase.auth.updateUser({
        data: {
          user_name: userNameRef.current.value,
        },
      });
      console.log(data);
      triggerToast("수정이 완료되었습니다.");
    } catch {
      return triggerToast(`수정 실패`, {
        label: "다시 시도",
        onClick: () => location.reload(),
      });
    }
  };
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="text-center md:text-start">
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>프로필 정보를 수정하고 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-2 m-auto md:m-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                사진 변경
              </Button>
            </div>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input disabled id="name" defaultValue={name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">사용자 이름</Label>
                  <Input
                    ref={userNameRef}
                    id="username"
                    defaultValue={user_name}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input disabled id="email" type="email" defaultValue={email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <Textarea
                  id="bio"
                  placeholder="자기소개를 입력하세요"
                  defaultValue=""
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center md:justify-end">
          <Button onClick={updateUserName} className="w-full md:w-fit">
            저장하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
