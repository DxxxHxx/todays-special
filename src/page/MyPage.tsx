import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserProfile from "@/components/myPage/UserProfile";
import AccountSetting from "@/components/myPage/AccountSetting";
import { MyPageTabType } from "@/types/type/myPage";
import MyPageTabList from "@/components/myPage/MyPageTabList";
import { User } from "@/types/interface/user";

const tabType = {
  profile: "profile" as const,
  account: "account" as const,
};

export default function MyPage() {
  const [tab, setTab] = useState<MyPageTabType>("profile");
  const { user }: { user: User } = useOutletContext();

  return (
    <div className="w-full px-4 mx-auto  md:max-w-2/3">
      <div className="m-auto mb-10 w-fit md:mx-0">
        <h1 className="text-3xl font-bold tracking-tight">마이페이지</h1>
      </div>
      <Tabs defaultValue={tab} className="w-full">
        <MyPageTabList
          tab={tab}
          handleTab={(tab: MyPageTabType) => setTab(tab)}
        />
        <TabsContent value={tabType.profile}>
          <UserProfile user={user} />
        </TabsContent>
        <TabsContent value={tabType.account}>
          <AccountSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
