import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SearchRestaurantDialog() {
  const [menu, setMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isOpen) {
      alert("login first");
      setIsOpen(false);
    }
  }, [user, isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={(prev) => setIsOpen(prev)}>
      <DialogTrigger>
        <Button>내 주변 추천음식 찾기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>원하는 메뉴를 입력해주세요.</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/map?menu=${menu}`);
          }}
          className="flex flex-col gap-y-5"
        >
          <Input
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            type="text"
            placeholder="메뉴 입력"
          />
          <Button className="bg-foreground hover:bg-muted-foreground ">
            찾기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
