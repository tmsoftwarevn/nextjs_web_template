"use client";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";

import { Upload } from "antd";

import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import { convertSlug } from "@/util/convertSlug";

const UpdateTemplate = (props) => {
  const {
    isModalUpdateTemplate,
    setIsModalUpdateTemplate,
    dataUpdate,
    fetchAllTemplate,
    selectNganh,
  } = props;
  //////////////////
  const refEditor = useRef(null);
  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("fileImg", file);
      const data = await fetch(`${process.env.URL_BACKEND}/api/v1/uploadImg`, {
        method: "POST",
        body: formData,
      });
      const res = await data.json();
      if (res && res.EC === 1) {
        cb(`${process.env.URL_BACKEND}/images/${res.data.fileUploaded}`, {
          alt: file.name,
        });
      }
    };

    input.click();
  };
  ////////////////////
  const [form] = Form.useForm();

  let [noidung, setNoidung] = useState("");
  const [fileList, setFileList] = useState([]);
  const [image, setFileName] = useState("");

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

  useEffect(() => {
    form.resetFields();
    setFileName(dataUpdate?.image);
    setNoidung(dataUpdate.description);
    setFileList([
      {
        uid: "-1",
        name: "ảnh",
        status: "done",
        url: `${process.env.URL_BACKEND}/images/${dataUpdate?.image}`,
      },
    ]);
  }, [dataUpdate]);

  const onFinish = async (values) => {
    const { nameform, link, id_nganh, title, meta_des } = values;
    const slug = convertSlug(nameform);
    noidung = refEditor?.current?.getContent();
    let description = noidung;
    let name = nameform;
    const data = await fetch(
      `${process.env.URL_BACKEND}/api/v1/template/${dataUpdate?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // phai đúng ...
        body: JSON.stringify({
          name,
          link,
          id_nganh,
          title,
          meta_des,
          image,
          description,
          slug,
        }),
      }
    );

    const res = await data.json();

    if (res && res.EC === 1) {
      message.success("Sửa thành công");
      handleCancel();
      fetchAllTemplate();
    } else {
      message.success("Sửa thất bại");
      handleCancel();
    }
  };
  const handleCancel = () => {
    setIsModalUpdateTemplate(false);
    form.resetFields();
    setFileList([]);
    setNoidung("");
  };

  return (
    <>
      <Modal
        title="Sửa template"
        open={isModalUpdateTemplate}
        onOk={() => {
          form.submit();
        }}
        okText="Sửa"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        width={1200}
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Link"
                name="link"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ !",
                  },
                ]}
                initialValue={dataUpdate?.link}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Chọn ngành"
                name="id_nganh"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ !",
                  },
                ]}
                initialValue={dataUpdate?.id_nganh}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  placeholder="Thuộc ngành"
                  options={selectNganh}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Title web"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ !",
                  },
                ]}
                initialValue={dataUpdate?.title}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card title="Ảnh bài viết" bordered={true}>
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
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Description"
                name="meta_des"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ !",
                  },
                ]}
                initialValue={dataUpdate?.meta_des}
              >
                <TextArea rows={3} maxLength={500} />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <>
          <h4 className="mb-4">Nội dung:</h4>
          <Editor
            apiKey={process.env.API_KEY_EDITOR}
            //onChange={(evt, editor) => setNoidung(editor.getContent())}
            onChange={(evt, editor) => (refEditor.current = editor)}
            initialValue={noidung}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic fontsize forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | image media",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
              fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
              file_picker_types: "image",
              file_picker_callback: filePickerCallback,
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default UpdateTemplate;
