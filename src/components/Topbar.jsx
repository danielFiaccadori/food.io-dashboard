import { CircleUser } from "lucide-react";
import { Bell } from "lucide-react";
import { Button } from "@headlessui/react";
import { LogOut } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function Topbar() {
    const navigate = useNavigate();

    return (
        <header className="fixed ml-64 top-0 left-0 right-0 h-16 z-50 flex items-center px-6 bg-[#1c1c1f]/60 backdrop-blur-sm backdrop-saturate-150 border-b border-white/10">
            <div className="flex flex-1 justify-between text-white">
                <h1 className="text-lg mt-2 font-semibold">Dashboard de gerenciamento</h1>
                <div className="flex gap-10">
                    <Menu as="div" className="relative mr-5">
                        <MenuButton className="cursor-pointer mt-2">
                            <CircleUser />
                        </MenuButton>
                        <MenuItems
                            as="div"
                            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-[#2a2a31] shadow-lg justify-items-center"
                        >
                            <MenuItem as="div" className="px-2 py-4 text-white">
                                Teste
                            </MenuItem>
                            <MenuItem as="button" onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }} className="px-2 py-4 text-white">

                                <Button  className="flex cursor-pointer bg-red-500 w-30 px-2 py-1 items-center rounded-md justify-center gap-2">
                                    <LogOut />
                                    <p>Sair</p>
                                </Button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Topbar;
