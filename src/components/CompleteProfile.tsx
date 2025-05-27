import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { Profile } from "../types";
import { Fragment, useState } from "react";
import { SelectAvatar } from "./SelectAvatar";

type Props = {
  myProfile: Omit<Profile, "id"> | null;
  setMyProfile: (
    profile: Pick<Profile, "name" | "bio" | "color" | "avatar">,
  ) => void;
  toggleHasOnboarded: () => void;
};

export function CompleteProfile({
  myProfile,
  setMyProfile,
  toggleHasOnboarded,
}: Props) {
  const [avatar, setAvatar] = useState(myProfile?.avatar ?? "");
  const [color, setColor] = useState(myProfile?.color ?? "");
  const [name, setName] = useState(myProfile?.name ?? "");
  const [bio, setBio] = useState(myProfile?.bio ?? "");

  return (
    <Fragment>
      <SelectAvatar
        color={color}
        setColor={setColor}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <TextInput
        label="Name"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Bio"
        placeholder="Bio (e.g. Developer @ Expo)"
        value={bio}
        onChangeText={setBio}
      />
      <Button
        title="Submit"
        disabled={!name || !bio || !color || !avatar}
        onPress={() => {
          setMyProfile({ name, bio, color, avatar });
          toggleHasOnboarded();
        }}
      />
    </Fragment>
  );
}
