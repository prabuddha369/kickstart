"use client";
import { addUsersToDB, cn, unsanitizeEmail } from "@/lib/utils";
import React from "react";
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
import { EmailTemplate } from '@/components/shared/EmailTemplate';
import { Resend } from 'resend';
import toast from "react-hot-toast";

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
});

const types = [
  { value: "student", label: "Student" },
  { value: "small_mid_business", label: "Small to Mid Business" },
  { value: "college_university", label: "College or University" },
];

const page = ({ params }: PageProps) => {
  const email = params.id;
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: unsanitizeEmail(email),
      fullName: "",
      birth_year: maxYear,
    },
  });

  const yearArray: number[] = [];

  for (let year = maxYear; year >= 1950; year--) {
    yearArray.push(year);
  }

  async function sendEmail(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Email sent successfully:', data);
      } else {
        console.error('Failed to send email:', data);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }



function onSubmit(values: z.infer<typeof formSchema>) {

  addUsersToDB(values)
    .then(() => {
      console.log("User added to DB");
      // sendEmail(values);
      router.push("/");
      toast.success('Thanks for joining Kickstart! You are now on our waitlist! Stay tuned for updates and get ready for something great.',
        {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 8000,
          position="bottom-center",
        }
      );

    })
    .catch((error) => {
      console.error("Error adding user to DB: ", error);
    });
}

return (
  <div className="bg-[url('/formbg_mob.png')] md:bg-[url('/formbg.png')] w-full h-screen flex items-center flex-col md:flex-row p-3 gap-5">
    <div className="md:w-1/2 flex items-center justify-center">
      <Image src={'/logo.svg'} width={275} height={200} alt="Kickstart logo" className="md:w-[500px]" />
    </div>
    <div className="w-full md:w-1/2 bg-white/20 rounded-xl backdrop-blur-md h-full flex items-center justify-center md:p-5 flex-col gap-5 p-3">
      <span className="font-bold md:text-4xl text-2xl">Sign up for Waitlist</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-10 md:w-[60%] text-xl">
          <FormField
            control={form.control}
            name="email"

            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Email </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="text-xl">Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" className="bg-white text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                          "w-[200px] justify-between bg-white text-black",
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl">Select Your Status</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between bg-white text-black",
                          !field.value && "text-[#7a7a7a]"
                        )}
                      >
                        {field.value
                          ? types.find((type) => type.value === field.value)
                            ?.label
                          : "Select type"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0  bg-white text-black">
                    <Command>
                      <CommandInput
                        placeholder="Search Type..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup>
                          {types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("type", type.value);
                              }}
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
          <div className="w-full flex items-center justify-center">

            <Button type="submit" className="rounded-full px-5 text-xl bg-gradient-to-tr from-[#195099] to-[#2A86FF] ">Join Waitlist</Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
);
};

export default page;
