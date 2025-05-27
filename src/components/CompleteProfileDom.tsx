import { Profile } from "../types";
import { Fragment, useState } from "react";
import { SelectAvatar } from "./SelectAvatar";

type Props = {
  myProfile: Omit<Profile, "id"> | null;
  setMyProfile: (
    profile: Pick<Profile, "name" | "bio" | "avatar" | "color">,
  ) => void;
  toggleHasOnboarded: () => void;
};

export function CompleteProfileDom({
  myProfile,
  setMyProfile,
  toggleHasOnboarded,
}: Props) {
  const [avatar, setAvatar] = useState(myProfile?.avatar);
  const [color, setColor] = useState(myProfile?.color);

  const onProfileCreate = (profile: Pick<Profile, "name" | "bio">) => {
    if (avatar && color) {
      setMyProfile({ ...profile, avatar, color });
      toggleHasOnboarded();
    }
  };

  return (
    <Fragment>
      <SelectAvatar
        avatar={avatar}
        color={color}
        setAvatar={setAvatar}
        setColor={setColor}
      />
      {/* TODO: Add DOM component */}
    </Fragment>
  );
}
