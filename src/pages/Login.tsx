import styled from "styled-components";
import Button from "../components/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { User } from "../models/user.model";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await login(data);
    const jwt = response.token;
    //여기서 jwt를 저장(localstorage?)
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
          })}
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <Button size="small" scheme="normal">
          submit
        </Button>
      </form>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #eeeeee;
    }
  }
`;
