import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const indexOfLast = page * usersPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfLast - usersPerPage,
    indexOfLast
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <input
        placeholder="Search..."
        className="border p-2 mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={indexOfLast >= filteredUsers.length}
          className="ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersDashboard;