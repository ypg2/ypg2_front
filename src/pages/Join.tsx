import styled from "styled-components";
import Button from "../components/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../models/user.model";
import { join } from "../api/auth.api";
import { Container } from "./Login";

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    await join(data);
    // 회원가입 완료 및 로그인 페이지 이동
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요." },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "이메일 형식으로 입력해주세요.",
            },
          })}
          type="text"
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
            minLength: { value: 8, message: "최소 8글자입니다." },
            maxLength: { value: 20, message: "최소 20글자입니다." },
          })}
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          placeholder="nickname"
          {...register("username", {
            required: { value: true, message: "닉네임을 입력해주세요." },
            minLength: { value: 2, message: "최소 2글자입니다." },
            maxLength: { value: 12, message: "최대 12글자입니다." },
          })}
          type="text"
        />
        {errors.username && errors.username.message}
        <Button size="small" scheme="normal">
          submit
        </Button>
      </form>
    </Container>
  );
}
