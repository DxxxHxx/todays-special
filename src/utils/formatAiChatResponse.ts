import { ChatResponse } from "@/types/interface/chatResponse";

export const formatAiChatResponse = ({
  content,
  menu,
  reason,
  user,
  hasMenu,
}: ChatResponse) => {
  if (!hasMenu) {
    return `<span>${content}</span>`;
  } else {
    return `
        <span>${user}님께 추천 드릴 음식은 ${menu}입니다.✨</span>
        <br/>
        <span>${reason.replace("이유: ", "")}😋</span>
      `;
  }
};
