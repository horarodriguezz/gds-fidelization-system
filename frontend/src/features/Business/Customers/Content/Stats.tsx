import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Calendar, TrendingUp, Users } from "lucide-react";
import { $metrics } from "../../../../store/business/customer";
import { useStore } from "@nanostores/react";

function Stats() {
  const metrics = useStore($metrics);

  const {
    totalCustomers = 0,
    totalPoints = 0,
    totalVisits = 0,
    visitsAverage = 0,
  } = metrics ?? {};

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Total Clientes</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {totalCustomers.toLocaleString()}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
              <Users className='h-6 w-6 text-primary' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Puntos Totales</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {totalPoints.toLocaleString()}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center'>
              <TrendingUp className='h-6 w-6 text-accent' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Total Visitas</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {totalVisits}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
              <Calendar className='h-6 w-6 text-primary' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Promedio Visitas</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {visitsAverage}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center'>
              <TrendingUp className='h-6 w-6 text-accent' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default React.memo(Stats);
