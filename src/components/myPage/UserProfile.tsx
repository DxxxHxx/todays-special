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
import { User } from "@/types/interface/user";
import {
  useUpdateUserName,
  useUpdateUserAvatar,
} from "@/hooks/useUpdateProfile";

export default function UserProfile({ user }: { user: User }) {
  const {
    user_metadata: { email, name, user_name },
  } = user;

  const { updateUserName, userNameRef } = useUpdateUserName();
  const { preview, handleChangeFile, updateUserAvatar } = useUpdateUserAvatar();
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="text-center md:text-start">
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>프로필 정보를 수정하고 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <div className="flex flex-col items-center w-24 gap-2 m-auto md:m-0">
              <Avatar className="w-full h-24">
                <AvatarImage src={preview} />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>

              <Label
                htmlFor="imageInput"
                className="flex items-center justify-center w-full px-3 py-2 border cursor-pointer rounded-2xl hover:bg-accent"
              >
                사진 변경
                <input
                  onChange={handleChangeFile}
                  id="imageInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                />
              </Label>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center md:justify-end">
          <Button
            onClick={() => {
              updateUserName();
              updateUserAvatar();
            }}
            className="w-full md:w-fit"
          >
            저장하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
