import supabase from "@/supabase/client";

const useSaveRecommandation = () => {
  const saveRecommandation = async ({
    prompt,
    menu,
    desc,
  }: {
    prompt: string;
    menu: string;
    desc: string;
  }) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
      return;
    }

    if (!user) {
      alert("need to login");
      return;
    }

    // recommendation 테이블에 추가
    const { error } = await supabase.from("recommendations").insert({
      user_id: user.id,
      prompt,
      menu_name: menu,
      description: desc,
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log("추천 메뉴가 저장되었습니다.");
    }
  };

  return { saveRecommandation };
};

export default useSaveRecommandation;
