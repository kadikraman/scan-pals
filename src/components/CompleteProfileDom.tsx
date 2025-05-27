import { Profile } from "../types";
import { Fragment, useState } from "react";
import { SelectAvatar } from "./SelectAvatar";
import ProfileForm from "./ProfileForm";
import { DomContainer } from "./DomContainer";
import { View } from "react-native";

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
      <DomContainer
        vertical
        render={({ containerStyle, ...props }) => (
          <View style={containerStyle}>
            <ProfileForm
              {...props}
              defaultProfile={myProfile}
              onProfileCreate={onProfileCreate}
            />
          </View>
        )}
      />
    </Fragment>
  );
}
