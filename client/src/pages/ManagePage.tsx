import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { getAllUsers } from "../db/hooks/auth";
import UserList from "./ManagePage/UserList";
import { UserInterface } from "../db/interface/user";
import AddUser from "./ManagePage/AddUser";

const ManagePage = () => {
  const { showBoundary } = useErrorBoundary();

  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const allUsers = await getAllUsers();
        if (allUsers.response && allUsers.response.status === 401) {
          showBoundary(new Error("Неуторизиран достъп"));
          return;
        }
        setUsers(allUsers.flat());
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <AddUser />
      </div>
      <UserList users={users} />
    </div>
  );
};

export default ManagePage;
