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
  const tabTriggerList = [
    {
      id: 1,
      onClick: () => handleTab("profile"),
      value: "profile",
      icon: UserIcon,
      text: "프로필",
    },
    {
      id: 2,
      onClick: () => handleTab("account"),
      value: "account",
      icon: SettingsIcon,
      text: "계정 설정",
    },
  ];
  return (
    <TabsList className="grid grid-cols-2 mb-8 border rounded-2xl">
      {tabTriggerList.map(({ id, onClick, text, value, icon: Icon }) => (
        <TabsTrigger
          key={id}
          onClick={onClick}
          value={value}
          className={`flex items-center gap-2 justify-center cursor-pointer p-3 rounded-2xl ${
            tab === value ? "bg-accent" : ""
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{text}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
