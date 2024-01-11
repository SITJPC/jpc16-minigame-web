import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import httpClient from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";

export function AddFriendDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full text-lg" size="lg">
            Add Friend
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Friend</DialogTitle>
            <DialogDescription>
              Enter your friend's pin code to add them to your friends list.
            </DialogDescription>
          </DialogHeader>
          <AddFriendForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full text-lg" size="lg">
          Add Friend
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Friend</DrawerTitle>
          <DialogDescription>
            Enter your friend's pin code to add them to your friends list.
          </DialogDescription>
        </DrawerHeader>
        <AddFriendForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const addFriendFormData = z.object({
  pin: z
    .string()
    .min(6)
    .max(6)
    .regex(/^[0-9]+$/, {
      message: "Pin code must be 6 digits",
    }),
});

export type AddFriendFormData = z.infer<typeof addFriendFormData>;

function AddFriendForm({ className }: React.ComponentProps<"form">) {
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm<AddFriendFormData>({
    resolver: zodResolver(addFriendFormData),
    defaultValues: {
      pin: "",
    },
  });

  const handleSubmitPin = (form: AddFriendFormData) => {
    setLoading(true);
    toast.promise(
      httpClient.post("/play/pair", {
        pin: form.pin,
      }),
      {
        success: ({ data }) => {
          setLoading(false);
          return data.data?.message || "Added friend success!";
        },
        loading: "Checking pin code...",
        error: (err) => {
          setLoading(false);
          return err.response?.data?.message || "Something went wrong";
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitPin)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">PIN</Label>
        <Input
          type="text"
          {...form.register("pin")}
          className="text-center"
          placeholder="XXXXXX"
        />
        {form.formState.errors.pin ? (
          <p className="text-sm text-red-600 text-center mt-2">
            {form.formState.errors.pin.message}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            This will be your friend's pin code as pair.
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Add Friend
      </Button>
    </form>
  );
}
