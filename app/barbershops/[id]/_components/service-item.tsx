"use client"
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";


interface ServiceItemProps {
    service: Service;
    isAuthenticated: boolean;
    barbershop: Barbershop;
}
const ServiceItem = ({ service,barbershop, isAuthenticated }: ServiceItemProps) => {
    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn('google');
        }
    }
    const [date, setDate] = useState<Date | undefined>(undefined);
    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date])

    const [hour, setHour] = useState<string | undefined>();
    const handleHourClick = (time: string) => {
        setHour(time);
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-w-[110px]">
                        <Image className="rounded-lg" alt={service.name} src={service.imageUrl} fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="font-bold text-primary text-sm">{Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(
                                Number(service.price)
                            )}</p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" type="button" onClick={handleBookingClick}>Reservar</Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>
                                            Fazer Reserva
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6">
                                        <Calendar
                                            className="mt-6"
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            locale={ptBR}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize"
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%"
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                caption: {
                                                    textTransform: "capitalize"
                                                }
                                            }} />
                                    </div>
                                    {date && (
                                        <div className="py-6 flex gap-3  overflow-x-auto px-5 border-y border-solid border-secondary">
                                            {timeList.map((time) => (
                                                <Button variant={hour === time ? 'default' : 'outline'} onClick={() => handleHourClick(time)} className="rounded-full" key={time}>{time}</Button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="p-3 flex flex-col gap-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3>{Intl.NumberFormat("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }).format(
                                                        Number(service.price)
                                                    )}</h3>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Data</h3>
                                                        <h4 className="text-sm capitalize">{format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}</h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Horário</h3>
                                                        <h4 className="text-sm capitalize">{hour}</h4>
                                                    </div>
                                                )}
                                                  <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                                        <h4 className="text-sm capitalize">{barbershop.name}</h4>
                                                    </div>
                                                    <SheetFooter>
                                                <Button disabled={!hour || !date}>Confirmar Reserva</Button>
                                            </SheetFooter>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;