'use client';

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from '@prisma/client'
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

    const router = useRouter();

    const handleBookingClick = () =>{
        router.push(`/barbershops/${barbershop.id}`)
    }
    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            <CardContent className="p-0">
                <div className="p-1 w-full h-[159px] relative" >
                    <div className="absolute left-2 top-2 z-50">
                        <Badge variant='secondary' className="flex gap-1 items-center opacity-90">
                            <StarIcon size={12} className="fill-primary text-primary" /><span>5,0</span>
                        </Badge>
                    </div>
                    <Image src={barbershop.imageUrl} style={{ objectFit: 'cover' }} className="h-[149px] rounded-2xl" fill alt={barbershop.name} />
                </div>
                <div className="px-3 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button variant="secondary" className="w-full mt-3" onClick={handleBookingClick}>Reservar</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default BarbershopItem;