import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

function Fitlers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNivel, setFilterNivel] = useState<string>("todos");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleNivelChange = (value: string) => {
    setFilterNivel(value);
    setCurrentPage(1);
  };

  return (
    <Card className='mb-6'>
      <CardContent className='px-3 sm:px-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Buscar por nombre, teléfono o email...'
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className='pl-10'
            />
          </div>

          <Select value={filterNivel} onValueChange={handleNivelChange}>
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='Filtrar por nivel' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='todos'>Todos los niveles</SelectItem>
              <SelectItem value='VIP'>VIP</SelectItem>
              <SelectItem value='Gold'>Gold</SelectItem>
              <SelectItem value='Silver'>Silver</SelectItem>
              <SelectItem value='Bronce'>Bronce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(Fitlers);
