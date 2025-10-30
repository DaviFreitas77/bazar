
interface BaneerSearchProps{
    showSidebar:boolean
}
export function BannerSearch({showSidebar}:BaneerSearchProps){
    return(
          <section
            className={`bg-gray-100 h-80 flex items-center justify-center rounded-md  mt-10 ${
              showSidebar ? "w-full max-w-7xl" : "w-full "
            }`}
          >
            <h1 className="text-4xl">Banner</h1>
          </section>
    )
}