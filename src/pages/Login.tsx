/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w17DxvRlpta
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import httpClient from "@/lib/axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const loginData = z.object({
  pin: z
    .string()
    .min(6)
    .max(6)
    .regex(/^[0-9]+$/, {
      message: "Pin code must be 6 digits",
    }),
});

export type LoginData = z.infer<typeof loginData>;

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginData),
    defaultValues: {
      pin: "",
    },
  });

  const handleSubmitPin = (form: LoginData) => {
    toast.promise(
      httpClient.post("/play/pin", {
        pin: form.pin,
      }),
      {
        success: ({ data }) => {
          const playerId = data?.data?.playerId;
          localStorage.setItem("playerId", playerId);
          if (!playerId) {
            return "Welcome, but something went wrong...";
          }
          navigate("/lobby");
          return data.data?.message || "Welcome to the game!";
        },
        loading: "Checking pin code...",
        error: (err) => {
          return err.response?.data?.message || "Something went wrong";
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitPin)}
      className="flex flex-col h-screen justify-center items-center bg-white dark:bg-gray-900 p-4"
    >
      <div
        className="mb-8 "
        style={{ aspectRatio: "240/142", width: "100%", maxWidth: "220px" }}
      >
        <img
          alt="Logo"
          className="object-contain"
          src="/Logo.png"
          style={{
            objectFit: "cover",
          }}
          width="100%"
        />
      </div>
      <div className="w-full max-w-xs">
        <Label className="sr-only" htmlFor="pin">
          Pin Code
        </Label>
        <Input
          {...form.register("pin")}
          className="w-full text-center text-lg px-4"
          id="pin"
          placeholder="Enter your pin code"
          type="text"
          size={32}
        />
        {form.formState.errors.pin && (
          <p className="text-sm text-red-600 text-center mt-2">
            {form.formState.errors.pin.message}
          </p>
        )}
        <Button size="lg" className="w-full mt-4" type="submit">
          <RocketIcon className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </div>
    </form>
  );
}
