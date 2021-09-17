import React from "react";
import cronstrue from 'cronstrue'
import { Form, Input, Select, DatePicker, Radio, TimePicker, Alert } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const { Option } = Select;

const Schedule = (props) => {
  console.log(props)
  const { form, cronExpression, setVisible } = props;
  const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;

  const modules = ["Datalayer", "Do You Know"];
  const requestMethods = ["Get", "Post"];
  const authRequired = ["Yes", "No"];

  const handleSubmit = (e) => {
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  const handleOnChange = (e) => {
    console.log('here', e.target.value)
    if (e.target.value === "g") {
      setVisible(true);
    }
  };

  const handleClick = () => {
    setVisible(true);
  }

  return (
    <div style={{ width: "90%", marginTop: "20px" }}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="Scheduler name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Enter scheduler name" }],
          })(<Input placeholder="Enter scheduler name" />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "Enter description" }],
          })(<Input placeholder="Enter description" />)}
        </Form.Item>
        <Form.Item label="Module">
          {getFieldDecorator("module", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Select>
              {modules.map((itm) => (
                <Option value={itm} key={itm}>
                  {itm}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Url">
          {getFieldDecorator("url", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(<Input placeholder="Url" />)}
        </Form.Item>
        <Form.Item label="Frequency">
          {getFieldDecorator("frequency", {
            initialValue: 'a',
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Radio.Group 
              onChange={handleOnChange}
            >
              <Radio value="a">Daily</Radio>
              <Radio value="b">Weekly</Radio>
              <Radio value="c">Monthly</Radio>
              <Radio value="d">Yearly</Radio>
              <Radio value="e">Custom date</Radio>
              <Radio value="g" onClick={handleClick} >
                Custom Cron
              </Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {['a', 'b', 'c', 'd'].includes(getFieldValue("frequency")) && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item label="Start date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('startDate', {
                rules: [{ required: true, message: 'Please select your Start date!' }],
              })(
                <DatePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
            <Form.Item label="End date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('endDate', {
                rules: [{ required: true, message: 'Please select your End date!' }],
              })(
                <DatePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
            <Form.Item label="Select time" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('time', {
                rules: [{ required: true, message: 'Please select your time!' }],
              })(
                <TimePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
          </div>
        )}
        {getFieldValue("frequency") === 'e' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item label="Date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please select your Start date!' }],
              })(
                <DatePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
            <Form.Item label="Schedule custom range" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('scheduleCustomRange', {
                rules: [{ required: true, message: 'Please select your End date!' }],
              })(
                <DatePicker.RangePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
            <Form.Item label="Schedule Time" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('time', {
                rules: [{ required: true, message: 'Please select your time!' }],
              })(
                <TimePicker style={{ width: '150px' }} />,
              )}
            </Form.Item>
          </div>
        )}
        <Form.Item wrapperCol={{ offset: 8 }}>
          {getFieldDecorator("cronNarration", {
            rules: [{ required: false }],
          })(
            <Alert 
              message={
                <b>
                  {cronstrue.toString(cronExpression.join(" "), {
                    dayOfWeekStartIndexZero: false,
                  })}
                </b>
              }
              type="info"
            />
          )}
        </Form.Item>
        <Form.Item label="Request method">
          {getFieldDecorator("requestMethod", {
            initialValue: 'Post',
            rules: [{ required: true, message: "Please select your Request method!" }],
          })(
            <Select>
              {requestMethods.map((itm) => (
                <Option value={itm} key={itm}>
                  {itm}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Auth required">
          {getFieldDecorator("authRequired", {
            initialValue: 'Yes',
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Select>
              {authRequired.map((itm) => (
                <Option value={itm} key={itm}>
                  {itm}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Request parameter">
          {getFieldDecorator("requestParameter", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(<Input.TextArea placeholder="Url" disabled />)}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(Schedule);
