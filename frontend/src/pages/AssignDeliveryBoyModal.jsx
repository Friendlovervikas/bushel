import { useEffect, useMemo, useState } from "react";
import {
  Search,
  User,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getAllStaff } from "../../services/staffService";

function AssignDeliveryBoyModal({
  open,
  onClose,
  onAssign,
}) {
  const { user } = useAuth();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBoy, setSelectedBoy] =
    useState("");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    if (open) {
      loadStaff();
    }
  }, [open]);

  const loadStaff = async () => {
    try {
      setLoading(true);

      const data = await getAllStaff(
        user.token
      );

      const boys = data.filter(
        (item) =>
          item.role === "delivery"
      );

      setStaff(boys);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return staff.filter((boy) => {
      const text =
        (
          boy.name +
          boy.email +
          boy.phone
        ).toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });
  }, [staff, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">

            Assign Delivery Boy

          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-red-500"
          >
            ×
          </button>

        </div>

        {/* Search */}

        <div className="p-6">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search delivery boy..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-10 pr-4 py-3"
            />

          </div>

        </div>

        {/* List */}

        <div className="px-6 pb-6 max-h-96 overflow-y-auto">

          {loading ? (

            <div className="text-center py-10">

              Loading...

            </div>

          ) : filtered.length === 0 ? (

            <div className="text-center py-10">

              No Delivery Boy Found

            </div>

          ) : (

            <div className="space-y-4">

              {filtered.map((boy) => (

                <div
                  key={boy._id}
                  onClick={() =>
                    setSelectedBoy(
                      boy._id
                    )
                  }
                  className={`border rounded-xl p-5 cursor-pointer transition

                  ${
                    selectedBoy ===
                    boy._id
                      ? "border-green-600 bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="text-lg font-bold flex items-center gap-2">

                        <User size={18} />

                        {boy.name}

                      </h3>

                      <p className="flex items-center gap-2 mt-2">

                        <Phone size={15} />

                        {boy.phone}

                      </p>

                      <p className="flex items-center gap-2">

                        <Mail size={15} />

                        {boy.email}

                      </p>

                    </div>

                    {selectedBoy ===
                      boy._id && (
                      <CheckCircle2
                        className="text-green-600"
                        size={28}
                      />
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={!selectedBoy}
            onClick={() => {
              onAssign(
                selectedBoy
              );

              setSelectedBoy("");

              onClose();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
          >
            Assign
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssignDeliveryBoyModal;