"use client";
import React, { useEffect, useRef, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
  notification,
} from "antd";

import UpdateTemplate from "./ModalUpdate";
import AddTemplate from "./ModalAdd";
import Image from "next/image";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const title = "Xác nhận xóa ?";
const QuanliTemplate = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  /// config search
  const [listTemplate, setListTemplate] = useState([]);
  const [isModalAddTemplate, setIsModalAddTemplate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdateTemplate, setIsModalUpdateTemplate] = useState(false);

  const [loading, setLoading] = useState(true);
  const [selectNganh, setSelectNganh] = useState([]);

  useEffect(() => {
    fetchAllTemplate();
    fetchAllNganh();
  }, []);

  const fetchAllNganh = async () => {
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh`);
    const result = await res.json();
    customSelectNganh(result.data);
  };

  const customSelectNganh = (list) => {
    let arr = [];
    list.map((item, idx) => {
      arr.push({
        value: item.id,
        label: item.name,
      });
    });
    setSelectNganh(arr);
  };

  const fetchAllTemplate = async () => {
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/template`);
    const result = await res.json();
    customTemplate(result.data);
  };

  const confirm = async (id) => {
    const data = await fetch(
      `${process.env.URL_BACKEND}/api/v1/template/${id}`,
      {
        // Replace with your endpoint
        method: "DELETE",
      }
    );
    const res = await data.json();
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchAllTemplate();
    } else {
      message.error("Có lỗi !");
    }
  };

  const customTemplate = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index + 1,
        STT: index + 1,
        id: item.id,
        name: item.name,
        slug: item.slug,
        action: index,
        image: item.image,
        title: item.title,
        meta_des: item.meta_des,
        id_nganh: item.id_nganh,
        description: item.description,
        link: item.link,
      });
    });

    setListTemplate(arr);
    //setLoading(false);
  };
  const handleUpdateTemplate = (record) => {
    setIsModalUpdateTemplate(true);
    setDataUpdate(record);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên template",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record, index) => {
        return (
          <div>
            <Image
              alt="dsf"
              src={`${process.env.URL_BACKEND}/images/${record?.image}`}
              width={100}
              height={100}
            />
          </div>
        );
      },
    },
    {
      title: "Ngành",
      dataIndex: "id_nganh",
      key: "id_nganh",
      sorter: {
        compare: (a, b) => a.id_nganh - b.id_nganh,
      },
      render: (text, record, index) => {
        //console.log('fff', record)
        return (
          <div>
            {selectNganh &&
              selectNganh.map((item, idx) => {
                if (item.value == record.id_nganh) {
                  return <p key={`fdgs${idx}`}>{item.label}</p>;
                }
              })}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
              gap: 20,
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Popconfirm
                placement="left"
                title={title}
                onConfirm={() => {
                  confirm(record?.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MdDelete />
                </Button>
              </Popconfirm>
            </div>

            <div>
              <Button
                size="small"
                type="primary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <CiEdit
                  style={{ fontSize: "15px" }}
                  onClick={() => {
                    handleUpdateTemplate(record);
                  }}
                />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Flex justify="flex-end">
        <Button
          type="primary"
          className="mb-3"
          onClick={() => setIsModalAddTemplate(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={listTemplate}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateTemplate
        isModalUpdateTemplate={isModalUpdateTemplate}
        setIsModalUpdateTemplate={setIsModalUpdateTemplate}
        dataUpdate={dataUpdate}
        fetchAllTemplate={fetchAllTemplate}
        selectNganh={selectNganh}
      />
      <AddTemplate
        isModalAddTemplate={isModalAddTemplate}
        setIsModalAddTemplate={setIsModalAddTemplate}
        fetchAllTemplate={fetchAllTemplate}
        selectNganh={selectNganh}
      />
    </>
  );
};

export default QuanliTemplate;
