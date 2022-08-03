import type { NextPage } from "next";
import { useEffect } from "react";

const ListUsersPage: NextPage = () => {
  useEffect(() => {
    fetch("/api/users/create")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return <h1>ListUsersPage</h1>;
};

export default ListUsersPage;
