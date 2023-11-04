import { Menu, Transition } from "@headlessui/react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function limpiartexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

export default function ItemHeader({ item, list_values }) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left w-full z-40">
        <div>
          <Menu.Button className="flex items-center gap-2 px-1 py-1 text-lg font-semibold text-white ">
            {item}
            <div>
              <BiSolidChevronDown />
            </div>
          </Menu.Button>
        </div>

        <Transition
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-y-0 origin-top"
          enterTo="opacity-100 scale-y-100 origin-top"
          leave="transition ease-in duration-150 transform"
          leaveFrom="opacity-100 scale-y-100 origin-top"
          leaveTo="opacity-0 scale-y-0 origin-top"
        >
          <Menu.Items className=" w-full left-0 z-10 md:mt-2  bg-white shadow-lg md:absolute md:whitespace-nowrap md:w-auto ">
            <div className="py-1">
              {list_values.map((value) =>
                typeof value === "string" ? (
                  <Link
                    key={value}
                    to={`/${limpiartexto(item)}/${limpiartexto(value)}`}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-300 text-gray-900"
                              : "text-gray-800",
                            "block px-4 py-2 text-sm font-semibold"
                          )}
                        >
                          {value}
                        </div>
                      )}
                    </Menu.Item>
                  </Link>
                ) : (
                  <Link key={value} to={value[1]}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-300 text-gray-900"
                              : "text-gray-800",
                            "block px-4 py-2 text-sm font-semibold"
                          )}
                        >
                          {value[0]}
                        </div>
                      )}
                    </Menu.Item>
                  </Link>
                )
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
