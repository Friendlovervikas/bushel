import {
  CalendarDays,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function CalendarHeader({
  search,
  setSearch,
  currentDate,
  onPrevious,
  onNext,
  onToday,
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

      {/* Top Row */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <CalendarDays
              className="text-green-600"
              size={34}
            />

            <h1 className="text-3xl font-bold">

              Delivery Calendar

            </h1>

          </div>

          <p className="text-gray-500 mt-2">

            Manage all customer deliveries

          </p>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-10 pr-4 py-3 w-72 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Bottom Row */}

      <div className="flex flex-wrap justify-between items-center mt-8 gap-4">

        {/* Month */}

        <h2 className="text-2xl font-bold">

          {currentDate.toLocaleDateString(
            "en-IN",
            {
              month: "long",
              year: "numeric",
            }
          )}

        </h2>

        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={onPrevious}
            className="border rounded-lg p-3 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={onToday}
            className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg"
          >
            Today
          </button>

          <button
            onClick={onNext}
            className="border rounded-lg p-3 hover:bg-gray-100 transition"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg flex items-center gap-2"
          >
            <RefreshCw size={18} />

            Refresh
          </button>

        </div>

      </div>

    </div>
  );
}

export default CalendarHeader;