import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../../../api/business/users/users.service";
import { queryClient } from "../../../lib/queryClient";
import Header from "./Header";
import CreateButton from "./CreateButton";
import Loading from "./Loading";
import Content from "./Content/Content";

const service = new UsersService();

function Users() {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ["users"],
      queryFn: service.getUsers.bind(service),
    },
    queryClient
  );

  return (
    <div className='bg-background min-h-screen flex flex-col'>
      <Header>
        <CreateButton disabled={isLoading || !!error} />
      </Header>

      {isLoading ? <Loading /> : <Content data={response?.data.users || []} />}
    </div>
  );
}

export default React.memo(Users);
