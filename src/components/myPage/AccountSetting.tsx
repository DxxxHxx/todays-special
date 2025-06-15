import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/client";
import axios from "axios";
import { googleLogout } from "@/utils/auth/googleAuth";
import { useState } from "react";

export default function AccountSetting() {
  const [loading, setLoading] = useState(false);
  const deleteAccount = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await axios.delete("/api/delete-account", {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLoading(false);

      googleLogout();
    } catch (e) {
      console.log(e);
    }
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
        <Button
          disabled={loading}
          onClick={deleteAccount}
          variant="destructive"
        >
          {loading ? "삭제 중.." : "계정 삭제"}
        </Button>
      </CardFooter>
    </Card>
  );
}
