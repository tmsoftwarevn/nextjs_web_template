import React, { useEffect, useState } from "react";
import { Select } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const options = [
  {
    label: <span>manager</span>,
    title: "manager",
    options: [
      {
        label: <span>Jack</span>,
        value: "Jack",
      },
      {
        label: <span>Lucy</span>,
        value: "Lucy",
      },
    ],
  },
  {
    label: <span>engineer</span>,
    title: "engineer",
    options: [
      {
        label: <span>Chloe</span>,
        value: "Chloe",
      },
      {
        label: <span>Lucas</span>,
        value: "Lucas",
      },
    ],
  },
];

const SelectNganh = (props) => {
  const { listCustomParent } = props;

  // useEffect(() => {
  //   custom_list(listCustomParent);
  // }, [listCustomParent]);
  // const custom_list = (list) => {
  //   let arr = [];
  //   list.map((item, idx) => {
  //     let a = {};
  //     a.label = <span>{item.name}</span>;
  //     a.title = item.name;
  //     let b = [];
  //     if (item?.children && item?.children?.length > 0) {
  //       item.children.map((child) => {
  //         b.push({
  //           label: <span>{child.name}</span>,
  //           value: child.id,
  //         });
  //       });
  //     }
  //     a.options = b;
  //     arr.push(a);
  //   });
  //   setOptionSelect(arr);
  // };
  
  console.log("optionsss", listCustomParent);
  return (
    <Select
      defaultValue="lucy"
      placeholder="Chọn ngành"
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectNganh;
