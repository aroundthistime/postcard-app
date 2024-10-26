import styled from "@emotion/native";
import TitleText from "../TitleText";

const Container = styled.View`
  margin-top: 32px;
`;

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <Container>
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default Header;
