import styled from "@emotion/native";
import TitleText from "../TitleText";

const Container = styled.View`
  margin: 32 0 16 0;
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
