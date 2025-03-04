"use client";

import { Home, Heart, Settings, ChevronUp, User2} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; 
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { data: session } = useSession(); 

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Movie Land</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className=" h-10">
                  {session?.user?.image ?(<Image className=" rounded-full w-10 h-10" alt="test" src={session?.user?.image} height={300} width={300}/>):( <User2/>)}
               
                   {session ? session.user?.name : "Guest"}
                  <ChevronUp className="ml-auto"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                {session ? (
                  <>
                    <DropdownMenuItem>{session.user?.name}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => signIn()}>Sign In</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
