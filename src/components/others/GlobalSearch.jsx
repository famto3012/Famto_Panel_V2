import RenderIcon from "../../icons/RenderIcon";

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
          <span className="text-xl text-gray-500">
            <RenderIcon iconName="SearchIcon" size={22} loading={6} />
          </span>
        </button>
      </div>

      <span onClick={() => {}} className="cursor-pointer">
        <RenderIcon iconName="LogoutIcon" size={24} loading={6} />
      </span>
    </div>
  );
};

export default GlobalSearch;
