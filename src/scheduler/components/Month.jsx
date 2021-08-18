import React, { useState, useEffect } from 'react';
import { Radio, Select, Checkbox } from 'antd';
import { chunk } from 'lodash';

const { Option } = Select;

export default function Month(props) {
  const [options, setOptions] = useState();
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }

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
          Every month
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
          month(s) starting in 
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
          Specific month (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            {chunk(options, 7)
              .map(eachChunkArray => <div><Checkbox.Group
                options={eachChunkArray} 
                defaultValue={['Pear']} 
                style={{ margin: '0 5px' }}
                onChange={onCheckBoxGroupChange} 
              /></div>)
            }
          </div>
        </Radio>

        <Radio style={radioStyle} value={4}>
          Every month between 
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