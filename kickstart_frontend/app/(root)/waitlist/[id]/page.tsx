"use client";
import { addUsersToDB, cn, unsanitizeEmail } from "@/lib/utils";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EmailTemplate } from "@/components/shared/EmailTemplate";
import { Resend } from "resend";
import toast, { Toaster } from "react-hot-toast";

interface PageProps {
  params: {
    id: string;
  };
}

const maxYear = new Date().getFullYear() - 18;

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  birth_year: z.number().int().min(1950).max(maxYear),
  type: z.string().min(2),
  college_name: z.string().min(2),
  business_name: z.string().min(2),
});

const types = [
  { value: "freelancer", label: "Freelancer" },
  { value: "startup or business", label: "Startup/Business" },
  { value: "college or university", label: "College/University Administrator" },
];

const Waitlist = ({ params }: PageProps) => {
  const email = params.id;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();
  const [type, setType] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: unsanitizeEmail(email),
      fullName: "",
      birth_year: maxYear,
      type: "",
      college_name: "",
      business_name: "",
    },
  });

  const yearArray: number[] = [];

  for (let year = maxYear; year >= 1950; year--) {
    yearArray.push(year);
  }

  const handleSelect = (typeValue: string) => {
    form.setValue("type", typeValue);
    setType(typeValue);

    if (typeValue === "college or university" || typeValue === "startup or business") {
      form.setValue("email", "");
    }

    if (typeValue === "freelancer") {
      form.setValue("email", unsanitizeEmail(email));
    }

    setPopoverOpen(false); // Close the popover when an item is selected
  };

  // async function sendEmail(values: z.infer<typeof formSchema>) {
  //   try {
  //     const response = await fetch('/api/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log('Email sent successfully:', data);
  //     } else {
  //       console.error('Failed to send email:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }

  function onSubmit(values: z.infer<typeof formSchema>) {
    addUsersToDB(values)
      .then(() => {
        console.log("User added to DB");
        // sendEmail(values);
        router.push("/");
        toast(
          "Thanks for joining Kickstart! You are now on our waitlist! Stay tuned for updates and get ready for something great.",
          {
            position: "top-center",
            icon: "🎉",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 8000,
          }
        );
      })
      .catch((error) => {
        console.error("Error adding user to DB: ", error);
      });
  }

  return (
    <div className="bg-[url('/formbg_mob.png')] md:bg-[url('/formbg.png')] w-full h-screen flex items-center flex-col md:flex-row p-3 gap-5">
      <div className="md:w-1/2 flex items-center justify-center md:my-0 my-10">
        <Image
          src={"/logo.svg"}
          width={275}
          height={200}
          alt="Kickstart logo"
          className="md:w-[500px]"
        />
      </div>
      <span className="md:hidden block font-bold md:text-4xl text-2xl">
        Sign up for Waitlist
      </span>
      <div className="w-[94%] h-fit py-10 gap-2 md:h-full md:w-1/2 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center md:p-5 flex-col">
        <span className="md:block hidden font-bold md:text-4xl text-2xl mb-6">
          Sign up for Waitlist
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[90%] space-y-10 md:w-[60%] text-xl"
          >
            {/* Type */}
            <div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">
                      Select Category
                    </FormLabel>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-white text-black",
                              !field.value && "text-[#7a7a7a] hover:text-white",
                            )}
                          >
                            {field.value
                              ? types.find((type) => type.value === field.value)
                                  ?.label
                              : "Select type"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 bg-white text-black ">
                        <Command>
                          <CommandInput
                            placeholder="Search Type..."
                            className="h-9 "
                          />
                          <CommandList>
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                              {types.map((type) => (
                                <CommandItem
                                  value={type.label}
                                  key={type.value}
                                  className="hover:bg-[#574ab9] hover:text-white"
                                  onSelect={() => handleSelect(type.value)}
                                >
                                  {type.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Full Name */}
            <div className={`${type === ""? "hidden" : "block"}`}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* College Name */}

            <div
              className={`${
                type === "college or university" ? "block" : "hidden"
              }`}
            >
              <FormField
                control={form.control}
                name="college_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">College Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your college name"
                        className="bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
               {/* Business Name */}
            <div
              className={`${
                type === "startup or business" ? "block" : "hidden"
              }`}
            >
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Business Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your business name"
                        className="bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Birth Year */}
            <div className={`${type === "freelancer" ? "block" : "hidden"}`}>
              <FormField
                control={form.control}
                name="birth_year"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">Birth Year</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-white text-black",
                              !field.value && "text-black"
                            )}
                          >
                            {field.value
                              ? yearArray.find((year) => year === field.value)
                              : "Select type"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 bg-white text-black">
                        <Command>
                          <CommandInput
                            placeholder="Search Year..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No Year found.</CommandEmpty>
                            <CommandGroup>
                              {yearArray.map((year) => (
                                <CommandItem
                                  value={year.toString()}
                                  key={year}
                                  onSelect={() => {
                                    form.setValue("birth_year", year);
                                  }}
                                >
                                  {year}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      year === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className={`${type === ""? "hidden" : "block"}`}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">
                      {type === "college or university"
                        ? "College Email" :
                        type === "startup or business"
                        ? "Business Email"
                        : "Email"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          type === "college or university"
                            ? "Enter the college verified email":
                            type === "startup or business"
                            ? "Enter the business email":
                            ""
                        }
                        className="bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            
            <div className="w-full flex items-center justify-center">
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="rounded-full px-5 text-xl bg-gradient-to-tr from-[#195099] to-[#2A86FF] "
              >
                Join Waitlist
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Waitlist;
