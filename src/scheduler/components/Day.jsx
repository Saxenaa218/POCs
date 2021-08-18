import React, { useState, useEffect } from 'react';
import { Radio, Select, Checkbox } from 'antd';
import { chunk } from 'lodash';

const { Option } = Select;

export default function Day(props) {
  const [options, setOptions] = useState();
  const monthArrNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const monthArrNumbersWithTh = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31th'];
  const days = [1, 2, 3, 4, 5, 6, 7];
  const numberOfWeeks = ['1st', '2nd', '3rd', '4th', '5th'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  const createOptions = () => monthArrNumbers.map(itm => ({ label: itm, value: itm }))

  const onChange = e => {
    console.log('radio checked', e.target.value);
  }

  const onCheckBoxGroupChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  return (
    <div style={{
      height: '67%',
      overflow: 'auto'
    }}>
      <Radio.Group 
        defaultValue={1}
        style={{
          overflow: 'auto',
          width: '100%'
        }}
        onChange={onChange} 
      >

        <Radio style={radioStyle} value={1}>
          Every day
        </Radio>

        <Radio style={radioStyle} value={2}>
          Every 
          <Select 
            size="small"
            defaultValue={days[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(days.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          day(s) starting on 
          <Select 
            size="small"
            defaultValue={dayNames[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio style={radioStyle} value={3}>
          Every 
          <Select 
            size="small"
            defaultValue={monthArrNumbers[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArrNumbers.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          days(s) starting on the 
          <Select 
            size="small"
            defaultValue={monthArrNumbersWithTh[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArrNumbersWithTh.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }} 
          value={4}
        >
          Specific day of week (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            <Checkbox.Group
              options={dayNames} 
              defaultValue={dayNames[0]} 
              style={{ margin: '0 5px' }}
              onChange={onCheckBoxGroupChange} 
            />
          </div>
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }} 
          value={5}
        >
          Specific day of month (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            {chunk(options, 10)
              .map(eachChunkArray => <div><Checkbox.Group
                options={eachChunkArray} 
                defaultValue={eachChunkArray} 
                style={{ margin: '0 5px' }}
                onChange={onCheckBoxGroupChange} 
              /></div>)
            }
          </div>
        </Radio>

        <Radio style={radioStyle} value={6}>
          On the last day of the month
        </Radio>

        <Radio style={radioStyle} value={7}>
          On the last weekday of the month
        </Radio>

        <Radio style={radioStyle} value={8}>
          On the last
          <Select 
            size="small"
            defaultValue={dayNames[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

        <Radio style={radioStyle} value={9}>
          <Select 
            size="small"
            defaultValue={monthArrNumbers[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArrNumbers.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          day(s) before the end of the month
        </Radio>

        <Radio style={radioStyle} value={10}>
          Nearest weekday (Monday to Friday) to the
          <Select 
            size="small"
            defaultValue={monthArrNumbersWithTh[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArrNumbersWithTh.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

        <Radio style={radioStyle} value={11}>
          On the
          <Select 
            size="small"
            defaultValue={numberOfWeeks[0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(numberOfWeeks.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          <Select 
            size="small"
            defaultValue={dayNames[0]}
            style={{ margin: '0 5px 0 0' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

      </Radio.Group>
    </div>
  )
}