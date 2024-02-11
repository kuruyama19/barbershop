
import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";


interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOption);

    if (!params.id) {
        // TODO: redirecionar para home
        return null;
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })
    if (!barbershop) {
        return null
    }
    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            <div className="flex px-5 flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user} />
                ))}
            </div>
        </div>
    );
}

export default BarbershopDetailsPage;