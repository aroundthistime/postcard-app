import styled from "@emotion/native";

export const PhraseImageCtaButtonText = styled.Text`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: #000000;
`;

export const PhraseImageCtaButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
