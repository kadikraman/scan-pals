import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Alert, View } from "react-native";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { Profile } from "@/src/types";
import { useRouter } from "expo-router";
import { ProfileCard } from "@/src/components/ProfileCard";
import { cn } from "../utils/cn";
import { Text } from "@/src/components/Text";
import { useProfileStore } from "../store/profileStore";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const isLoading = false;

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedProfile, setScannedProfile] = useState<Profile | null>(null);
  const canScanRef = useRef(true);
  const { addProfile, updateProfile, profiles } = useProfileStore();

  const isNew = !profiles.find(
    (profile) => profile.userId === scannedProfile?.userId,
  );

  const handleScanned = (barcode: BarcodeScanningResult) => {
    if (!canScanRef.current) {
      return;
    }
    canScanRef.current = false;
    try {
      const scannerResult = JSON.parse(barcode.data);
      const requiredFields = ["userId", "name", "bio", "updatedAt"];
      const missingFields = requiredFields.filter(
        (field) => !(field in scannerResult),
      );
      if (missingFields.length > 0) {
        Alert.alert(
          "QR code was not in a valid format",
          `Missing required fields: ${missingFields.join(", ")}`,
          [
            {
              text: "OK",
              onPress: () => (canScanRef.current = true),
            },
          ],
        );
        return;
      }
      setScannedProfile(scannerResult);
    } catch {
      console.log(barcode.data);
      Alert.alert("QR code was not in a valid format", "Please try again.", [
        {
          text: "OK",
          onPress: () => (canScanRef.current = true),
        },
      ]);
    }
  };

  const handleSaveProfile = async () => {
    if (scannedProfile) {
      if (isNew) {
        addProfile(scannedProfile);
      } else {
        updateProfile(scannedProfile);
      }
    }
    router.replace("/");
  };

  const handleScanAgain = () => {
    setScannedProfile(null);
    canScanRef.current = true;
  };

  if (scannedProfile) {
    return (
      <View className="flex-1 justify-center">
        <View className="mx-6">
          <Text className="mb-4" bold large2x>
            Profile scanned!
          </Text>
          <Text
            secondary
            bold
            className={cn("mb-1", {
              "text-accent-amber-light dark:text-accent-amber-dark": isNew,
            })}
          >
            {isNew ? "New" : "Existing"} Profile
          </Text>
        </View>
        <ProfileCard profile={scannedProfile} asCard />
        <View className="mx-6 mt-6">
          <Button
            title={isNew ? "Save profile" : "Update profile"}
            onPress={handleSaveProfile}
            isLoading={isLoading}
          />
          <Button
            title="Scan again"
            theme="tertiary"
            onPress={handleScanAgain}
          />
        </View>
      </View>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4" large>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      onBarcodeScanned={handleScanned}
    />
  );
}
