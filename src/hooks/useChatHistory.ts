// import { ChatMessage } from "@/page/Home";
// import supabase from "@/supabase/client";
// import { RecommendHistory } from "@/types/interface/recommend";
// import { useEffect } from "react";

// const useChatHistory = (
//   setList: React.Dispatch<React.SetStateAction<ChatMessage[]>>
// ) => {
//   useEffect(() => {
//     (async () => {
//       const { data, error } = await supabase.from("recommendations").select();

//       if (error) {
//         alert("대화 내역 불러오기 실패");
//         return;
//       }

//       if (data) {
//         const copiedData: RecommendHistory[] = [...data];

//         const chatList: ChatMessage[] = copiedData.flatMap((item) => [
//           { role: "user", content: item.prompt },
//           { role: "assistant", content: item.description },
//         ]);

//         setList(chatList);
//       }
//     })();
//   }, [setList]);
// };
// export default useChatHistory;
