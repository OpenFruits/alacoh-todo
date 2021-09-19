import { VFC } from "react";
import { styled } from "src/styles/stitches.config";

type Props = {
  userName: string;
  avatarImage: string;
};

export const Avatar: VFC<Props> = (props) => {
  return (
    <Container>
      <AvatarImage
        css={{
          backgroundImage: `url(${props.avatarImage})`,
        }}
      />
      <PageTitle>{`${props.userName} 's to-do list 🥳`}</PageTitle>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

const PageTitle = styled("h3", {});

const AvatarImage = styled("div", {
  size: 50,
  borderRadius: 50,
  backgroundSize: "cover",
});
