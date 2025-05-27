"use dom";

import "../../global.css";

import { zodResolver } from "@hookform/resolvers/zod";
import type { DOMProps } from "expo/dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/src/ui/input";
import { Button } from "@/src/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/ui/form";
import { type DomLayoutProps, useDomLayout } from "../utils/useDomLayout";

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string(),
});

type ProfileFormProps = DomLayoutProps & {
  /** The webview or DOM properties */
  dom?: DOMProps;
  /** The initial profile data, if any */
  defaultProfile?: z.infer<typeof profileSchema> | null;
  /** Callback when the profile is validated and submitted */
  onProfileCreate?: (profile: z.infer<typeof profileSchema>) => any;
};

export default function ProfileForm({
  defaultProfile,
  onProfileCreate = () => {},
  onDomLayout,
}: ProfileFormProps) {
  useDomLayout(onDomLayout);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultProfile?.name,
      bio: defaultProfile?.bio,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full space-y-4"
        onSubmit={form.handleSubmit((profile) => onProfileCreate(profile))}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Bio (e.g. Developer @ Expo)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
