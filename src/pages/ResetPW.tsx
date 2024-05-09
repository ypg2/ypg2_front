import { useForm } from "react-hook-form";
import styled from "styled-components";
import { User } from "../models/user.model";
import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";

export default function ResetPW() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { resetRequested, resetPW, resetRequest } = useAuth();

  const onSubmit = (data: User) => {
    resetRequested ? resetPW(data) : resetRequest(data);
  };

  return (
    <ResetPWStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <input
            type="email"
            placeholder="이메일"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error-text">이메일을 입력해주세요</p>}
        </fieldset>
        {resetRequested && (
          <fieldset>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요</p>
            )}
          </fieldset>
        )}
        <fieldset>
          <Button type="submit" size="medium" scheme="primary">
            {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
          </Button>
        </fieldset>
      </form>
    </ResetPWStyle>
  );
}

const ResetPWStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    fieldset {
      border: none;
    }

    input {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #eeeeee;
    }
  }
`;
