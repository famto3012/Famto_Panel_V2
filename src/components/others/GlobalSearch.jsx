import { LogoutIcon, SearchIcon } from "../../utils/icons";

const GlobalSearch = () => {
  return (
    <div className="flex items-center justify-end pt-[20px] pe-[30px] bg-gray-100">
      <div className="relative me-4">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
          <SearchIcon className="text-xl text-gray-500" />
        </button>
      </div>
      <LogoutIcon size={24} onClick={() => {}} className="cursor-pointer" />
    </div>
  );
};

export default GlobalSearch;
