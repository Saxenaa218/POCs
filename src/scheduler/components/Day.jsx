import React, { useState, useEffect, useReducer } from 'react';
import { Radio, Select, Checkbox } from 'antd';

const { Option } = Select;

const radioStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '30px',
}

export default function Day(props) {
  const monthArrNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const monthArrNumbersWithTh = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31th'];
  const days = [1, 2, 3, 4, 5, 6, 7];
  const numberOfWeeks = ['1st', '2nd', '3rd', '4th', '5th'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const cacheDataInitialValues = {
    'firstOption': '*',
    'secondOption': [1, 'Sunday'],
    'thirdOption': [1, '1st'],
    'fourthOption': ['Sunday'],
    'fifthOption': [1],
    'sixthOption': 'L',
    'seventhOption': 'LW',
    'eighthOption': 'Sunday',
    'ninethOption': 1,
    'tenthOption': '1st',
    'eleventhOption': ['1st', 'Sunday']
  }

  const [options, setOptions] = useState();
  const [radioValue, setRadioValue] = useState('firstOption');
  const [expression, setExpression] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState();
  const [dayOfMonth, setDayOfMonth] = useState();
  const [cacheData, setCacheData] = useReducer(cacheDataReducer, cacheDataInitialValues);

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  // useEffect(() => {
  //   console.log(expression)
  // }, [expression])

  // useEffect(() => {
  //   console.log(cacheData)
  // }, [cacheData])

  function cacheDataReducer(state, action){
    switch(action?.type) {
      case 'firstOption': case 'secondOption': case 'thirdOption':
      case 'fourthOption': case 'fifthOption': case 'sixthOption':
      case 'seventhOption': case 'eighthOption': case 'ninethOption':
      case 'tenthOption': case 'eleventhOption':
        return { ...state, [action.type]: action.payload };
      default:
        return { ...state };
    }
  }

  const createOptions = () => monthArrNumbers.map(itm => ({ label: itm, value: itm }))

  const handleRadioValueChange = e => {
    const val = e.target.value;
    const tempexpression = computeExpressionValue(val, cacheData[val])
    if (tempexpression) setExpression(tempexpression);
    setRadioValue(val);
  }

  const computeExpressionValue = (type, data) => {
    switch(type) {
      case 'firstOption':
        return "*";
      case 'secondOption':
        return `${data[1]}/${data[0]}`;
      case 'thirdOption':
        setDayOfMonth(`${data[1]}/${data[0]}`)
        return `${data[1]}/${data[0]}`;
      case 'fourthOption':
        setDayOfWeek(data.join(','))
        setDayOfMonth('?');
        return false;
      case 'fifthOption':
        setDayOfMonth(data.join(','))
        setDayOfWeek('?');
        return false;
      case 'sixthOption':
        setDayOfMonth('L');
        setDayOfWeek('?');
        return false;
      case 'seventhOption':
        setDayOfMonth('LW');
        setDayOfWeek('?');
        return false;
      case 'eighthOption': 
        setDayOfWeek(`${dayNames.indexOf(data)+1}L`);
        setDayOfMonth('?');
        return false;
        // return `${dayNames.indexOf(data)+1}L`;
      case 'ninethOption':
        setDayOfMonth(`L-${monthArrNumbers.indexOf(data)+1}`);
        setDayOfWeek('?');
        return false;
        // return `L-${monthArrNumbers.indexOf(data)}`;
      case 'tenthOption': 
        setDayOfMonth(`${monthArrNumbersWithTh.indexOf(data)+1}W`);
        setDayOfWeek('?');
        return false;
        // return `${monthArrNumbersWithTh.indexOf(data)}W`;
      case 'eleventhOption':
        setDayOfWeek(`${numberOfWeeks.indexOf(data[0])+1}#${dayNames.indexOf(data[1])+1}`)
        setDayOfMonth('?');
        return false;
      default:
        return data;
    }
  }

  const onCheckBoxGroupChange = (checkedValues, type) => {
    setCacheData({ type: type, payload: checkedValues })
    // setExpression(checkedValues.join(','))
    setRadioValue(type)
    if (type === 'fourthOption') {
      setDayOfMonth('?');
      setDayOfWeek(checkedValues.join(','));
    } else {
      setDayOfWeek('?');
      setDayOfMonth(checkedValues.join(','));
    }
  }

  // handler for second option (Every seconds(s) starting at second) for first select option
  const handleSecondOptionsFirstOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [val, cacheData['secondOption'][1]] })
    setExpression(`${cacheData['secondOption'][1]}/${val}`)
    setRadioValue('secondOption')
  }

  // // handler for second option (Every seconds(s) starting at second) for second select option
  const handleSecondOptionsSecondOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [cacheData['secondOption'][0], val] })
    setExpression(`${val}/${cacheData['secondOption'][0]}`)
    setRadioValue('secondOption')
  }

  // handler for last option (Every second between second _ and second _) for first select option
  const handlefourthOptionsFirstOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [val, cacheData['fourthOption'][1]] })
    setExpression(`${val}-${cacheData['fourthOption'][1]}`)
    setRadioValue('fourthOption')
  }

  // handler for last option (Every second between second _ and second _) for second select option
  const handlefourthOptionsSecondOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [cacheData['fourthOption'][0], val] })
    setExpression(`${cacheData['fourthOption'][0]}-${val}`)
    setRadioValue('fourthOption')
  }

  return (
    <div style={{
      height: '67%',
      overflow: 'auto'
    }}>
      <Radio.Group 
        value={radioValue}
        style={{
          overflow: 'auto',
          width: '100%'
        }}
        onChange={handleRadioValueChange}
      >

        <Radio style={radioStyle} value='firstOption'>
          Every day
        </Radio>

        <Radio style={radioStyle} value='secondOption'>
          Every 
          <Select 
            size="small"
            value={cacheData['secondOption'][0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handleSecondOptionsFirstOptionChange}
          >
            {React.Children.toArray(days.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          day(s) starting on 
          <Select 
            size="small"
            value={cacheData['secondOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handleSecondOptionsSecondOptionChange}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio style={radioStyle} value='thirdOption'>
          Every 
          <Select 
            size="small"
            value={cacheData['thirdOption'][0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => console.log(val)}
          >
            {React.Children.toArray(monthArrNumbers.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          days(s) starting on the 
          <Select 
            size="small"
            value={cacheData['thirdOption'][1]}
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
              value={cacheData['fourthOption']}
              style={{ margin: '0 5px' }}
              onChange={val => onCheckBoxGroupChange(val, 'fourthOption')} 
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
            <div>
              <Checkbox.Group
                options={options}
                value={cacheData['fifthOption']}
                style={{ margin: '0 5px' }}
                onChange={val => onCheckBoxGroupChange(val, 'fifthOption')}
              />
            </div>
          </div>
        </Radio>

        <Radio style={radioStyle} value='sixthOption'>
          On the last day of the month
        </Radio>

        <Radio style={radioStyle} value='seventhOption'>
          On the last weekday of the month
        </Radio>

        <Radio style={radioStyle} value='eighthOption'>
          On the last
          <Select 
            size="small"
            value={cacheData['eighthOption']}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={(val, index) => {
              setCacheData({ type: 'eighthOption', payload: val });
              setDayOfWeek(`${dayNames.indexOf(val)+1}L`);
              setDayOfMonth('?');
              setRadioValue('eighthOption');
            }}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

        <Radio style={radioStyle} value='ninethOption'>
          <Select 
            size="small"
            value={cacheData['ninethOption']}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => {
              setCacheData({ type: 'ninethOption', payload: val });
              setDayOfMonth(`L-${monthArrNumbers.indexOf(val)+1}`);
              setDayOfWeek('?');
              setRadioValue('ninethOption');
            }}
          >
            {React.Children.toArray(monthArrNumbers.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          day(s) before the end of the month
        </Radio>

        <Radio style={radioStyle} value='tenthOption'>
          Nearest weekday (Monday to Friday) to the
          <Select 
            size="small"
            value={cacheData['tenthOption']}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => {
              setCacheData({ type: 'tenthOption', payload: val });
              setDayOfMonth(`${monthArrNumbersWithTh.indexOf(val)+1}W`);
              setDayOfWeek('?');
              setRadioValue('tenthOption');
            }}
          >
            {React.Children.toArray(monthArrNumbersWithTh.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

        <Radio style={radioStyle} value='eleventhOption'>
          On the
          <Select 
            size="small"
            value={cacheData['eleventhOption'][0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={val => {
              setCacheData({ type: 'eleventhOption', payload: [val, cacheData['eleventhOption'][1]] });
              setDayOfWeek(`${dayNames.indexOf(cacheData['eleventhOption'][1])+1}#${numberOfWeeks.indexOf(val)+1}`);
              setDayOfMonth('?');
              setRadioValue('eleventhOption');
            }}
          >
            {React.Children.toArray(numberOfWeeks.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          <Select 
            size="small"
            value={cacheData['eleventhOption'][1]}
            style={{ margin: '0 5px 0 0' }}
            dropdownMatchSelectWidth={false}
            onChange={val => {
              setCacheData({ type: 'eleventhOption', payload: [cacheData['eleventhOption'][0], val] });
              setDayOfWeek(`${dayNames.indexOf(val)+1}#${numberOfWeeks.indexOf(cacheData['eleventhOption'][0])+1}`);
              setDayOfMonth('?');
              setRadioValue('eleventhOption');
            }}
          >
            {React.Children.toArray(dayNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          of the month
        </Radio>

      </Radio.Group>
      <span>Day of month: {dayOfMonth}</span>
      <br/>
      <span>Day: {expression}</span>
      <br/>
      <span>Day of week: {dayOfWeek}</span>
    </div>
  )
}