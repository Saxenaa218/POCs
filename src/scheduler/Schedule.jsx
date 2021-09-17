import React from "react";
import cronstrue from 'cronstrue'
import moment from 'moment'
import { Form, Input, Select, DatePicker, Radio, TimePicker, Alert, Row, Col, Button } from "antd";

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
  const dateFormat = 'DD-MM-YYYY';
  const timeFormat = 'hh:mm:ss';

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.hasOwnProperty('cronExpression')) {
          const result = { ...values };
          result.cronExpression = cronExpression.join(" ");
          result.cronNarration = cronstrue.toString(cronExpression.join(" "), { dayOfWeekStartIndexZero: false })
          console.log(result);
        }
        else {
          console.log(values);
        }
      }
    });
  };

  const handleOnChange = (e) => {
    if (e.target.value === "Custom cron") {
      setVisible(true);
    }
  };

  const handleClick = () => {
    setVisible(true);
  }

  return (
    <div style={{ width: "90%", margin: "20px" }}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="Scheduler name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Enter scheduler name" }],
          })(<Input placeholder="Enter scheduler name" />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [{ required: false, message: "Enter description" }],
          })(<Input placeholder="Enter description" />)}
        </Form.Item>
        <Form.Item label="Module">
          {getFieldDecorator("module", {
            initialValue: modules[0],
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
            initialValue: 'Daily',
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Radio.Group 
              onChange={handleOnChange}
            >
              <Radio value="Daily">Daily</Radio>
              <Radio value="Weekly">Weekly</Radio>
              <Radio value="Monthly">Monthly</Radio>
              <Radio value="Yearly">Yearly</Radio>
              <Radio value="Custom date">Custom date</Radio>
              <Radio value="Custom cron" onClick={handleClick} >
                Custom cron
              </Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {['Daily', 'Weekly', 'Monthly', 'Yearly'].includes(getFieldValue("frequency")) && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Col span={8}>
                <Form.Item label="Start date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('startDate', {
                    initialValue: moment(),
                    rules: [{ required: true, message: 'Please select your Start date!' }],
                  })(
                    <DatePicker format={dateFormat} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="End date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('endDate', {
                    initialValue: moment().add(1, 'days'),
                    rules: [{ required: true, message: 'Please select your End date!' }],
                  })(
                    <DatePicker format={dateFormat} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Select time" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('time', {
                    initialValue: moment(),
                    rules: [{ required: true, message: 'Please select your time!' }],
                  })(
                    <TimePicker format={timeFormat} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}
        {getFieldValue("frequency") === 'Custom date' && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Col span={8}>
                <Form.Item label="Date" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('date', {
                    initialValue: moment(),
                    rules: [{ required: true, message: 'Please select your Start date!' }],
                  })(
                    <DatePicker format={dateFormat} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Schedule custom range" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('scheduleCustomRange', {
                    initialValue: [moment(), moment()],
                    rules: [{ required: true, message: 'Please select your End date!' }],
                  })(
                    <DatePicker.RangePicker format={dateFormat} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Schedule Time" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('time', {
                    initialValue: moment(),
                    rules: [{ required: true, message: 'Please select your time!' }],
                  })(
                    <TimePicker format={timeFormat} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}
        {getFieldValue('frequency') === 'Custom cron' && <><Form.Item wrapperCol={{ offset: 8 }}>
          {getFieldDecorator("cronExpression", {
            rules: [{ required: false }],
          })(
            <Alert 
              message={
                <b>
                  {cronExpression.join(" ")}
                </b>
              }
              type="info"
            />
          )}
        </Form.Item>
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
        </Form.Item></>}
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
            rules: [{ required: true, message: "Please select any field!" }],
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
            rules: [{ required: true, message: "Please input your Request parameter!" }],
          })(<Input.TextArea placeholder="Request parameter" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button htmlType="submit" type="primary" >Save</Button>
        </Form.Item>
      </Form>
      <br/>
    </div>
  );
};

export default Form.create()(Schedule);
