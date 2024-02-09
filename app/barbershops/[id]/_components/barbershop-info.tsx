'use client';

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SheetContent, SheetTrigger ,Sheet} from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/side-menu";

interface BarbershopInfoProps {
    barbershop: Barbershop
}


const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.replace('/');
    }
    return (
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SideMenu />
                    </SheetContent>
                </Sheet>

                <Image src={barbershop.imageUrl} fill alt={barbershop.name} style={{ objectFit: "cover" }} className="opacity-85" />
            </div>
            <div className="py-3 pb-6 border-b solid border-secondary px-5">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <MapPinIcon className="text-primary gap-1" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <StarIcon className="text-primary gap-1" size={18} />
                    <p className="text-sm">5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;