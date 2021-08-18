import React, { useState, useEffect } from 'react';
import { Radio, Select, Checkbox } from 'antd';
import { chunk } from 'lodash';

const { Option } = Select;

export default function Hours(props) {
  const [options, setOptions] = useState();
  const hourArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const hourArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  const createOptions = () => hourArr.map(itm => ({ label: itm, value: itm }))

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
          // height: '350px',
          width: '100%'
        }}
        onChange={onChange} 
      >

        <Radio style={radioStyle} value={1}>
          Every hour
        </Radio>

        <Radio style={radioStyle} value={2}>
          Every 
          <Select 
            size="small"
            defaultValue={hourArr2[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(hourArr2.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          hour(s) starting at hour 
          <Select 
            size="small"
            defaultValue={hourArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(hourArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }} 
          value={3}
        >
          Specific hour (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            {chunk(options, 10)
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
          Every hour between hour 
          <Select 
            size="small"
            defaultValue={hourArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(hourArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and hour 
          <Select 
            size="small"
            defaultValue={hourArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(hourArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
    </div>
  )
}