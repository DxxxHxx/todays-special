import supabase from "@/supabase/client";
import { getUser } from "@/utils/auth/googleAuth";
import triggerToast from "@/utils/toast";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useUpdateUserName = () => {
  const userNameRef = useRef<HTMLInputElement>(null);

  const updateUserName = async () => {
    if (!userNameRef.current) return;

    if (!userNameRef.current.value) {
      return triggerToast("이름을 입력해주세요.");
    }
    try {
      await supabase.auth.updateUser({
        data: {
          user_name: userNameRef.current.value,
        },
      });

      triggerToast("수정이 완료되었습니다.");
    } catch {
      return triggerToast(`수정 실패`, {
        label: "다시 시도",
        onClick: () => location.reload(),
      });
    }
  };

  return { userNameRef, updateUserName };
};

export const useUpdateUserAvatar = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user?.id}`);
      setPreview(data.publicUrl);
    })();
  }, []);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setFile(file);

    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  const updateUserAvatar = async () => {
    try {
      if (!file) return;
      const user = await getUser();

      //새 파일 업로드
      const uploadFile = await supabase.storage
        .from("avatars")
        .upload(`${user?.id}`, file, {
          upsert: true,
        });

      if (uploadFile.error) {
        return triggerToast(uploadFile.error.message);
      }

      return triggerToast("이미지 수정 완료");
    } catch (e) {
      console.error(e);
      triggerToast("이미지 수정 실패");
    }
  };

  return { file, preview, handleChangeFile, updateUserAvatar };
};
