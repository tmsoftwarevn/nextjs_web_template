import { data, Nganh } from "@/util/type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";


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
  handleSelectMenu(detail: data): void;
  slugNganh: any
}

const SelectMenu: React.FC<ListNganh> = ({ list, handleSelectMenu, slugNganh }) => {
  const [selectedOption, setSelectedOption] = useState({ value: "0", label: "Tất cả" });
  const params = useParams();
  const route = useRouter();
  const [listMenu, setListMenu] = useState([{ value: '0', label: "Tất cả" }]);

  useEffect(() => {
    custom_idSelect();
    setSelectedOption({ value: "0", label: "Tất cả" })

  }, [params.slug]);


  const custom_idSelect = () => {
    let itemFind = list.find((item, idx) => item.slug === params.slug);
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

    if (+value.value === 0) {   // click tất cả
      // lỗi fix cho nay
      handleSelectMenu({ id: slugNganh.id, name: slugNganh.name, idDetail: 0 })
    }
    else
      handleSelectMenu({ id: 0, name: slugNganh.name, idDetail: value.value })
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="hidden sm:block font-semibold text-blue-600">Chọn ngành: </div>
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
