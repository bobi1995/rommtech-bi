import { getMappedValue } from "../../components/access";
import { UserInterface } from "../../db/interface/user";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import NewPassword from "./NewPassword";

const UserList = ({ users }: { users: UserInterface[] }) => {
  return (
    <div className="flex justify-center mt-10">
      <table className="w-5/12 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Потребител
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Права
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Редактирай
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Парола
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Изтрий
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {users.map((user: UserInterface, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.access.split(",").map((key: string, index: number) => (
                  <span key={key}>
                    {getMappedValue(parseInt(key))}
                    {index < user.access.split(",").length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                <EditUser user={user} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                <NewPassword id={user.id.toString()} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                <DeleteUser id={user.id.toString()} username={user.username} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
