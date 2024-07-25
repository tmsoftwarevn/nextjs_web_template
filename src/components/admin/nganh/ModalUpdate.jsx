"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import { convertSlug } from "@/util/convertSlug";

const UpdateNganh = (props) => {
  const {
    isModalUpdateNganh,
    setIsModalUpdateNganh,
    dataUpdate,
    fetchAllNganh,
  } = props;

  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.resetFields();
    setFileName(dataUpdate?.image);
    setFileList([
      {
        uid: "-1",
        name: "ảnh",
        status: "done",
        url: `${process.env.URL_BACKEND}/images/${dataUpdate?.image}`,
      },
    ]);
  }, [dataUpdate]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleUploadFile_thumbnail = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("fileImg", file);
    const data = await fetch(`${process.env.URL_BACKEND}/api/v1/uploadImg`, {
      method: "POST",
      body: formData,
    });
    const res = await data.json();
    if (res && res.EC === 1) {
      setFileName(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };

  const handleCancel = () => {
    setIsModalUpdateNganh(false);
  };

  const onFinish = (values) => {
    const { nameform } = values;
    const slug = convertSlug(nameform);

    CallUpdateNganh(nameform, slug, fileName, "t", "t");

    form.resetFields();
    setIsModalUpdateNganh(false);
    setFileList([]);
  };

  const CallUpdateNganh = async (name, slug, image, title, meta_des) => {
    const res = await fetch(
      `${process.env.URL_BACKEND}/api/v1/nganh/${dataUpdate?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, slug, image, title, meta_des }),
      }
    );

    const result = await res.json();
    if (result && result.EC === 1) {
      message.success("Update thành công");
      fetchAllNganh();
    } else {
      message.error("Có lỗi !");
    }
  };

  return (
    <>
      <Modal
        title="Update Ngành"
        open={isModalUpdateNganh}
        onOk={() => {
          form.submit();
        }}
        okText="Sửa"
        onCancel={handleCancel}
        maskClosable={false}
        width={1000}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên"
                name="nameform"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống !",
                  },
                ]}
                initialValue={dataUpdate?.name}
              >
                <Input />
              </Form.Item>
            </Col>


            {/* <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Title không được để trống !",
                  },
                ]}
                initialValue={dataUpdate?.title}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thẻ Mô tả"
                name="meta_des"
                rules={[
                  {
                    required: true,
                    message: "Thẻ Mô tả không được để trống !",
                  },
                ]}
                initialValue={dataUpdate?.meta_des}
              >
                <Input />
              </Form.Item>
            </Col> */}


            <Col span={24}>
              <Card title="Ảnh " bordered={true}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={handleUploadFile_thumbnail}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                  multiple={false}
                  accept="image/*"
                >
                  Tải lên
                </Upload>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateNganh;
