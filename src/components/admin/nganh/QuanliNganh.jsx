"use client";
import React, { useEffect, useRef, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Button,
  Checkbox,
  Flex,
  Popconfirm,
  Table,
  message,
  notification,
} from "antd";

import UpdateNganh from "./ModalUpdate";
import AddNganh from "./ModalAdd";
import Image from "next/image";

const title = "Xác nhận xóa ?";
const QuanliNganh = () => {
  const [listNganh, setListNganh] = useState([]);

  const [isModalAddNganh, setIsModalAddNganh] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdateNganh, setIsModalUpdateNganh] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllNganh();
  }, []);

  const fetchAllNganh = async () => {
  
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh`);
    const result = await res.json();
    customNganh(result.data);

  };

  const confirm = async (id) => {
    const data = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh/${id}`, { // Replace with your endpoint
      method: 'DELETE',
    });
    const res = await data.json();
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchAllNganh();
    } else {
      message.error("Có lỗi !");
    }
  };

  const customNganh = (list) => {
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
        meta_des: item.meta_des
      });
    });

    setListNganh(arr);
    //setLoading(false);

  };
  const handleUpdateNganh = (record) => {
    setIsModalUpdateNganh(true);
    setDataUpdate(record);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên ngành",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record, index) => {
        return (
          <div>
            <Image alt="dsf" src={`${process.env.URL_BACKEND}/images/${record?.image}`} width={100} height={100} />
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
                    handleUpdateNganh(record);
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
          onClick={() => setIsModalAddNganh(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={listNganh}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateNganh
        isModalUpdateNganh={isModalUpdateNganh}
        setIsModalUpdateNganh={setIsModalUpdateNganh}
        dataUpdate={dataUpdate}
        fetchAllNganh = {fetchAllNganh}
      />
      <AddNganh
        isModalAddNganh={isModalAddNganh}
        setIsModalAddNganh={setIsModalAddNganh}
        fetchAllNganh = {fetchAllNganh}
      />
    </>
  );
};

export default QuanliNganh;
