"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const {data} = useSession();
    const handleLoginClick = async () => {
        
        await signIn();
    }
    return (
        <Card>
            <CardContent className="p-5 flex justify-between items-center flex-row">
                <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
                {/* <Button variant="outline" size="icon" className="h-8 w-8">
                    <MenuIcon size={18}/>
                </Button> */}
                {data?.user ? <div><Button onClick={()=> signOut()}>Sair</Button> <span>{data.user.name}</span></div> : <Button onClick={handleLoginClick}>Login</Button>}
            </CardContent>
        </Card>


    );
}

export default Header;