"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SideMenu from "./side-menu";

const Header = () => {

    return (
        <Card>
            <CardContent className="p-5 flex justify-between items-center flex-row">
                <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" >
                            <MenuIcon size={18} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SideMenu />
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>


    );
}

export default Header;