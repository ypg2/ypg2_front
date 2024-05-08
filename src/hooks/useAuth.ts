import { useState } from "react";
import { fetchResetPW, fetchResetRequest } from "../api/auth.api";
import { User } from "../models/user.model";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [resetRequested, setResetRequested] = useState<Boolean>(false);

  const resetPW = (data: User) => {
    fetchResetPW(data).then(() => {
      alert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const resetRequest = (data: User) => {
    fetchResetRequest(data).then((res) => {
      setResetRequested(true);
    });
  };
  return { resetRequested, resetPW, resetRequest };
}
