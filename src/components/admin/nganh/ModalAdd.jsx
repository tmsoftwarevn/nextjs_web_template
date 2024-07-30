import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { convertSlug } from "@/util/convertSlug";

const AddNganh = (props) => {
  const {
    isModalAddNganh,
    setIsModalAddNganh,
    fetchAllNganh,
    listCustomParent,
  } = props;

  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");

  const [fileList, setFileList] = useState([]);

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
    setIsModalAddNganh(false);
  };

  
  const onFinish = (values) => {
    const { name, parentId } = values;

    const slug = convertSlug(name);

    // title, meta_des ko sử dụng

    CallAddNganh(name, slug, parentId, fileName, "t", "t");

    form.resetFields();
    setIsModalAddNganh(false);
    setFileList([]);
  };

  const CallAddNganh = async (name, slug, parentId, image, title, meta_des) => {
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, slug, parentId, image, title, meta_des }),
    });

    const result = await res.json();
    if (result && result.EC == 1) {
      message.success("Thêm thành công");
      fetchAllNganh();
    } else {
      message.error("Có lỗi !");
    }
  };

  return (
    <>
      <Modal
        title="Thêm Ngành"
        open={isModalAddNganh}
        onOk={() => {
          form.submit();
        }}
        okText="Thêm mới"
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ngành cha "
                name="parentId"
                
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  placeholder="Ngành cha"
                  options={listCustomParent}
                />

              </Form.Item>
            </Col>
            {/* <Col span={24} >
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
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} >
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

export default AddNganh;
