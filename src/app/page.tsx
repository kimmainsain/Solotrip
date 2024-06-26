"use client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@/recoils/authState";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const Home = () => {
  useAuthCheck();
  const isLogin = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) router.push("/users/login");
    else router.push("/users/main");
  }, [isLogin, router]);

  return <></>;
};

export default Home;
