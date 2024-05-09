import styled from "styled-components";
import Button from "./common/Button";
import { Modal } from "./common/Modal";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isSchedule: boolean;
  handleClick: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function ScheduleModal({ isOpen, onClose, handleClick }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isSchedule={true}>
        <ButtonBox>
          <Button
            value={"0"}
            scheme="primary"
            size="medium"
            onClick={handleClick}
          >
            시작시간: 00분
          </Button>
          <Button
            scheme="primary"
            size="medium"
            value={"0.5"}
            onClick={handleClick}
          >
            시작시간: 30분
          </Button>
        </ButtonBox>
      </Modal>
    </>
  );
}

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 10px;
  }
`;
