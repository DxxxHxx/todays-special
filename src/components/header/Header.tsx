import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { googleLogout } from "@/utils/auth/googleAuth";
import ToggleButton from "../theme/toggleButton";
import LoginButton from "../common/LoginButton";

export default function Header() {
  const user = useAuth();

  const navItems = [
    { label: "추천받기", href: "/" },
    { label: "추천 기록", href: "/history" },
    { label: "즐겨찾기", href: "/favorites" },
  ];

  return (
    <header className="w-full border-b bg-secondary px-5 py-3 shadow-sm mb-10  rounded-4xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between ">
        {/* 로고 */}
        <Link to="/" className="text-lg font-bold text-blue-600">
          🍜 오늘 뭐 먹지?
        </Link>

        {/* 데스크탑 내비 */}
        <nav className="hidden gap-4 md:flex ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-primary hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 로그인 상태 버튼 */}
        <div className="hidden md:flex md:gap-x-3">
          <ToggleButton />
          {user ? (
            <Button variant="ghost" onClick={googleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          ) : (
            <LoginButton />
          )}
        </div>

        {/* 모바일 메뉴 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col space-y-4 pt-10">
              <Link to="/" className="text-lg font-bold text-blue-600">
                🍜 오늘 뭐 먹지?
              </Link>
              <ToggleButton />
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="text-base">
                  {item.label}
                </Link>
              ))}
              {user ? (
                <Button variant="ghost" onClick={googleLogout}>
                  로그아웃
                </Button>
              ) : (
                <Button variant="outline">로그인</Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
