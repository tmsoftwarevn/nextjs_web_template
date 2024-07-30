import { Nganh } from "@/util/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "0", label: "Tất cả" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const customStyles = {
  singleValue: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
  input: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
  menu: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
  option: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
};

interface ListNganh {
  list: Nganh[];
}

const SelectMenu: React.FC<ListNganh> = ({ list }) => {
  const [selectedOption, setSelectedOption] = useState({ value: "0", label: "Tất cả" });
  const params = useSearchParams();

  const [listMenu, setListMenu] = useState([{ value: '0', label: "Tất cả" }]);

  useEffect(() => {
    custom_idSelect();
    setSelectedOption({ value: "0", label: "Tất cả" })

  }, [params.get("nganh")]);

  const custom_idSelect = () => {
    let itemFind = list.find((item, idx) => item.slug === params.get("nganh"));
    let arr = [{ value: '0', label: "Tất cả" }];
    if (itemFind && itemFind.id && itemFind?.children) {
      itemFind?.children.map((it, idxx) => {
        arr.push({
          value: `${it.id}`,
          label: it.name,
        });
      });
    }
    setListMenu(arr)
    setSelectedOption({ value: "0", label: "Tất cả" })
  };

  const handleSelectMenuChildren = (value: any) => {
    console.log('vvvvv', value)
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="hidden sm:block font-semibold">Chọn ngành: </div>
      <Select

        styles={customStyles}
        options={listMenu}
        defaultValue={{ value: "0", label: "Tất cả" }}
        onChange={handleSelectMenuChildren}

      />
    </div>
  );
};

export default SelectMenu;
