import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchUsers } from "../feature/users/userSlice";
import UserForm from "../feature/form/UserForm";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Columns
  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
    ],
    [],
  );

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users Dashboard</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          {showForm ? "Close Form" : "Add User"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <UserForm />
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search user..."
        className="border p-2 mb-3 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default UsersDashboard;
