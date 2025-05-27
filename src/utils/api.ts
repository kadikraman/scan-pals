import { Profile } from "../types";

export function getProfiles() {
  return fetch("/api/profiles").then((res) => res.json());
}

export function addProfile(profile: Profile) {
  console.log("Adding profile", profile);
  return fetch("/api/profiles", {
    method: "POST",
    body: JSON.stringify(profile),
  }).then((res) => res.json());
}

export function updateProfile(profile: Profile) {
  return fetch("/api/profiles", {
    method: "PUT",
    body: JSON.stringify(profile),
  }).then((res) => res.json());
}

export function deleteProfile(profile: Omit<Profile, "id">) {
  return fetch("/api/profiles", {
    method: "DELETE",
    body: JSON.stringify(profile),
  }).then((res) => res.json());
}
