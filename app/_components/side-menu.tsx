import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SideMenu = () => {

    const { data } = useSession();
    const handleLogoutClick = () => signOut();
    const handleLoginClick = () => signIn('google');

    return (<>
            <SheetHeader>
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>
            {data?.user ? (
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 py-3 px-5">
                        <Avatar >
                            <AvatarImage className="rounded-full size-12" src={data.user?.image ?? ""} alt={data.user?.name ?? ""} />
                        </Avatar>
                        <h2 className="font-bold">{data.user?.name}</h2>
                    </div>
                    <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
                        <LogOutIcon />
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-3 px-5 py-6 ">
                    <div className="flex items-center gap-3  ">
                        <UserIcon size={32} />
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                    </div>
                    <Button variant="secondary" className="w-full justify-start" onClick={handleLoginClick}>
                        <LogInIcon className="mr-2" size={18} />
                        Fazer login
                    </Button>
                </div>)}
            <div className="flex flex-col gap-3 px-5">
                <Button variant='outline' className="justify-start" asChild>
                    <Link href='/'>
                        <HomeIcon size={16} className="mr-2" />
                        Início
                    </Link>
                </Button>
            </div>
            {data?.user && (
                <div className="flex flex-col gap-3 px-5 mt-3">
                    <Button variant='outline' className="justify-start" asChild>
                        <Link href='/bookings'>
                            <CalendarIcon size={16} className="mr-2" />
                            Agendamento
                        </Link>
                    </Button>
                </div>
            )}
    </>);
}

export default SideMenu;