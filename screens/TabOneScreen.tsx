import * as React from "react";
import { RootTabScreenProps } from "../types";
import styled from "styled-components/native";
import H4 from "../components/text/h4";
import H2 from "../components/text/h2";

interface Props {
  navigation: RootTabScreenProps<"TabOne">;
}

const TabOneScreen = (props: Props) => {
  return (
    <StyledView>
      <H4>Hello</H4>
      <H2>Hello</H2>
    </StyledView>
  );
};

export default TabOneScreen;

const StyledView = styled.View`
  background-color: #fff;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
