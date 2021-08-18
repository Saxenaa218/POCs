import React, { useState, useEffect } from 'react';
import { Radio, Select, Checkbox } from 'antd';
import { chunk } from 'lodash';

const { Option } = Select;

export default function Minutes(props) {
  const [options, setOptions] = useState();
  const secondsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
  const secondsArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  const createOptions = () => secondsArr.map(itm => ({ label: itm, value: itm }))

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
          Every minute
        </Radio>

        <Radio style={radioStyle} value={2}>
          Every 
          <Select 
            size="small"
            defaultValue={secondsArr2[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(secondsArr2.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          minute(s) starting at minute 
          <Select 
            size="small"
            defaultValue={secondsArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }} 
          value={3}
        >
          Specific minute (choose one or many)
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
          Every minute between minute 
          <Select 
            size="small"
            defaultValue={secondsArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and minute 
          <Select 
            size="small"
            defaultValue={secondsArr[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
    </div>
  )
}