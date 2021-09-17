import React from "react";
import { Form, Icon, Input, Modal, Select } from "antd";

const { Option } = Select;

const DYKAdmin = (props) => {
  const insightTypes = [
    "Trend",
    "Correlation",
    "Prediction",
    "Outlier",
    "Clusters",
    "Classification",
  ];
  const users = [
    "abhisheks@netlink.com",
    "jmishra@netlink.com",
    "snarware@netlink.com",
    "smishra@netlink.com",
  ];
  const { form, visible, setVisible } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const handleSelectChange = (val) => {
    console.log(val);
  };

  return (
    <Modal
      visible={visible}
      title={"DYKAdmin"}
      centered
      destroyOnClose
      maskClosable={false}
      bodyStyle={{ height: "500px" }}
      width="80%"
      onOk={handleSubmit}
      okText={"Save"}
      cancelText={"Cancel"}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item label="User">
          {getFieldDecorator("user", {
            rules: [{ required: true, message: "Please select your gender!" }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={handleSelectChange}
            >
              {users.map((itm) => (
                <Option value={itm}>{itm}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Insight creation limits">
          {getFieldDecorator("insight_limit", {
            rules: [
              {
                required: true,
                message: "Please select insight creation limit!",
              },
            ],
          })(
            <>
              <Select
                placeholder="Please select insight creation limit"
                onChange={handleSelectChange}
              >
                {insightTypes.map((itm) => (
                  <Option value={itm}>{itm}</Option>
                ))}
              </Select>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </>
          )}
        </Form.Item>
        <Form.Item label="User">
          {getFieldDecorator("ads", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "admin_form" })(DYKAdmin);
