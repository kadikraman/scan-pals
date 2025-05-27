import { Link } from "expo-router";
import { View, Platform, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "@/src/components/Button";
import { ProfileCard } from "@/src/components/ProfileCard";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { Text } from "@/src/components/Text";
import { useProfileStore } from "@/src/store/profileStore";

const isLoading = false;

export default function IndexScreen() {
  const { profiles } = useProfileStore();

  if (Platform.OS === "web") {
    if (isLoading) {
      return (
        <View className="h-40 items-center justify-center">
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView
        className="items-center mt-10"
        contentContainerClassName="w-full sm:w-auto px-4"
      >
        <Text large2x className="mb-4">
          Profiles Scanned
        </Text>
        {profiles.length === 0 && (
          <Text secondary>No profiles scanned yet</Text>
        )}
        {profiles.map((item) => (
          <ProfileCard
            profile={item}
            canDelete
            key={item.userId}
            className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px]"
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item.userId}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
      }
      data={profiles?.sort((a, b) => b.updatedAt - a.updatedAt) || []}
      renderItem={({ item }) => <ProfileCard profile={item} canDelete />}
      ItemSeparatorComponent={() => (
        <View className="h-px bg-light-border dark:bg-dark-border" />
      )}
      ListEmptyComponent={() => {
        if (isLoading) {
          return null;
        }

        return (
          <View className="flex-1 items-center justify-center p-6">
            <Link href="/scanner" asChild>
              <Button title="Scan your first profile" />
            </Link>
          </View>
        );
      }}
    />
  );
}
