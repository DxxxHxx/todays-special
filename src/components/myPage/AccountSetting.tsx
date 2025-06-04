import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export default function AccountSetting({ user }: { user: User }) {
  const deleteUser = () => {
    console.log(user);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 관리</CardTitle>
        <CardDescription>
          계정 데이터를 관리하거나 계정을 삭제할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          계정을 삭제하면 모든 개인 데이터가 영구적으로 삭제됩니다. 이 작업은
          되돌릴 수 없습니다.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={deleteUser} variant="destructive">
          계정 삭제
        </Button>
      </CardFooter>
    </Card>
  );
}
