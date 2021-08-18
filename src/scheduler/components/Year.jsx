import React, { useState, useEffect } from 'react';
import { Radio, Select, Checkbox } from 'antd';
import { chunk } from 'lodash';

const { Option } = Select;

const radioStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '30px',
};
const numberOfYears = 5;
const monthArr2 = Array.from({ length: numberOfYears }, (_, i) => i + 1);
const monthArr = Array.from({ length: numberOfYears }, (_, i) => i + new Date().getFullYear());

export default function Year(props) {
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  const createOptions = () => monthArr.map(itm => ({ label: itm, value: itm }))

  const onChange = e => {
    console.log('radio checked', e.target.value);
  }

  const onCheckBoxGroupChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  return (
    <div>
      <Radio.Group 
        defaultValue={1}
        style={{
          overflow: 'auto',
          width: '100%'
        }}
        onChange={onChange} 
      >

        <Radio style={radioStyle} value={1}>
          Any year
        </Radio>

        <Radio style={radioStyle} value={2}>
          Every 
          <Select 
            size="small"
            defaultValue={monthArr2[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArr2.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          years(s) starting in 
          <Select 
            size="small"
            defaultValue={monthArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }} 
          value={3}
        >
          Specific year (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            <div>
              <Checkbox.Group
                options={options} 
                // defaultValue={} 
                style={{ margin: '0 5px' }}
                onChange={onCheckBoxGroupChange} 
              />
            </div>
          </div>
        </Radio>

        <Radio style={radioStyle} value={4}>
          Every year between 
          <Select 
            size="small"
            defaultValue={monthArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and 
          <Select 
            size="small"
            defaultValue={monthArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
    </div>
  )
}