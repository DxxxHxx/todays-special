import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserProfile from "@/components/myPage/UserProfile";
import AccountSetting from "@/components/myPage/AccountSetting";
import { MyPageTabType } from "@/types/type/myPage";
import MyPageTabList from "@/components/myPage/MyPageTabList";
import { User } from "@/types/interface/user";

export default function MyPage() {
  const [tab, setTab] = useState<MyPageTabType>("profile");
  const { user }: { user: User } = useOutletContext();

  return (
    <div className=" mx-auto px-4 w-full md:max-w-2/3">
      <div className="mb-10 m-auto w-fit md:mx-0">
        <h1 className="text-3xl font-bold tracking-tight">마이페이지</h1>
      </div>
      <Tabs defaultValue={tab} className="w-full">
        <MyPageTabList
          tab={tab}
          handleTab={(tab: MyPageTabType) => setTab(tab)}
        />
        <TabsContent value="profile">
          <UserProfile user={user} />
        </TabsContent>
        <TabsContent value="account">
          <AccountSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
