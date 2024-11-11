import Sidebar from "../component/sidebar"
import SearchItem from "../component/searching"

export default function ViewOrder () {

    return (
        <>
    <SearchItem/>
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <p>Halaman View Order</p>
        </div>
        </>
    )
}