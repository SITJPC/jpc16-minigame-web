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

export function CreateTeamDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full text-lg" size="lg">
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Team name must be unique and cannot be changed later.
            </DialogDescription>
          </DialogHeader>
          <CreateTeamForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full text-lg" size="lg">
          Create Team
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Team</DrawerTitle>
          <DialogDescription>
            Team name must be unique and cannot be changed later.
          </DialogDescription>
        </DrawerHeader>
        <CreateTeamForm setOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const createTeamFormData = z.object({
  name: z.string().min(1, {
    message: "Team name is required",
  }),
});

export type CreateTeamFormData = z.infer<typeof createTeamFormData>;

function CreateTeamForm({
  className,
  setOpen,
}: React.ComponentProps<"form"> & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamFormData),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmitTeam = (form: CreateTeamFormData) => {
    setLoading(true);
    toast.promise(
      httpClient.post("/play/team/create", {
        teamName: form.name,
      }),
      {
        success: ({ data }) => {
          setLoading(false);
          setOpen(false);
          return data.data?.message || "Created team success!";
        },
        loading: "Checking team name...",
        error: (err) => {
          setLoading(false);
          return err.response?.data?.message || "Something went wrong";
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitTeam)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Team Name</Label>
        <Input
          type="text"
          {...form.register("name")}
          className="text-center"
          placeholder="Enter team name here..."
        />
        {form.formState.errors.name ? (
          <p className="text-sm text-red-600 text-center mt-2">
            {form.formState.errors.name.message}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground text-center"></p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Create Team
      </Button>
    </form>
  );
}
