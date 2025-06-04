import { MyPageTabType } from "@/types/type/myPage";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { SettingsIcon, UserIcon } from "lucide-react";

export default function MyPageTabList({
  tab,
  handleTab,
}: {
  tab: MyPageTabType;
  handleTab: (tab: MyPageTabType) => void;
}) {
  return (
    <TabsList className="grid grid-cols-2 mb-8 border rounded-2xl">
      <TabsTrigger
        onClick={() => handleTab("profile")}
        value="profile"
        className={`flex items-center gap-2 justify-center cursor-pointer p-3 rounded-2xl ${
          tab === "profile" ? "bg-accent" : ""
        }`}
      >
        <UserIcon className="h-4 w-4" />
        <span className="hidden sm:inline">프로필</span>
      </TabsTrigger>
      <TabsTrigger
        onClick={() => handleTab("account")}
        value="account"
        className={`flex items-center gap-2 justify-center cursor-pointer p-3 rounded-2xl ${
          tab === "account" ? "bg-accent" : ""
        }`}
      >
        <SettingsIcon className="h-4 w-4" />
        <span className="hidden sm:inline">계정 설정</span>
      </TabsTrigger>
    </TabsList>
  );
}
