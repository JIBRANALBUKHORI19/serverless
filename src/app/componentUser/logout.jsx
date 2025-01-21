import { signout } from "../login/actions";

export default function Signout() {
    return (
        <form>
            <button
                formAction={signout}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
                Keluar
            </button>
        </form>
    );
}
