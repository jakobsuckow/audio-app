import React from "react";
import { ModalProps } from "react-native";
import styled from "styled-components/native";
import H2 from "../components/text/h2";

interface Props extends ModalProps {}

const Record = (props: Props) => {
  const {} = props;
  return (
    <StyledView>
      <H2>hi</H2>
    </StyledView>
  );
};
export default Record;

const StyledView = styled.View`
  background-color: #fff;
  flex: 1;
`;
