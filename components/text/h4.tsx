import styled from "styled-components/native";

interface Props {
  italic?: boolean;
}

const H4 = styled.Text<Props>`
  font-family: Times;
  font-style: ${(props: Props) => (props.italic ? "italic" : "normal")};
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
`;

export default H4;
