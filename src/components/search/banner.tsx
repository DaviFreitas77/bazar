
interface BaneerSearchProps{
    showSidebar:boolean
}
export function BannerSearch({showSidebar}:BaneerSearchProps){
    return(
          <section
            className={`bg-gray-100  flex items-center justify-center rounded-md  mt-3 lg:mt-10 ${
              showSidebar ? "w-full max-w-7xl" : "w-full "
            }`}
          >
            <img src="images/banner.png" alt="" className="rounded-sm "/>
          </section>
    )
}