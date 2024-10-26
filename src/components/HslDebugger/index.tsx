import styled from "@emotion/native/macro";
import { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native";

const Container = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 200px;
  height: 150px;
  opacity: 0.7;
  background-color: black;
  color: white;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: white;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const InputFieldName = styled.Text`
  color: white;
  font-size: 25px;
`;

const Input = styled(TextInput)`
  font-size: 25px;
  background-color: white;
  opacity: 0.7;
`;

interface Props {
  s: string;
  setS: Dispatch<SetStateAction<string>>;
  l: string;
  setL: Dispatch<SetStateAction<string>>;
}

const HslDebugger = ({ s, setS, l, setL }: Props) => {
  return (
    <Container>
      <Title>HSL Debugger</Title>
      <Row>
        <InputFieldName>s: </InputFieldName>
        <Input
          value={s}
          onChangeText={(text) => {
            setS(text);
          }}
        />
      </Row>
      <Row>
        <InputFieldName>l: </InputFieldName>
        <Input
          value={l}
          onChangeText={(text) => {
            setL(text);
          }}
        />
      </Row>
    </Container>
  );
};

export default HslDebugger;
