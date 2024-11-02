import styled from "@emotion/native/";
import { ActivityIndicator } from "react-native";

const Wrap = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullScreenLoader = () => {
  return (
    <Wrap>
      <ActivityIndicator />
    </Wrap>
  );
};

export default FullScreenLoader;
