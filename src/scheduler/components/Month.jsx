import React, { useState, useEffect, useReducer } from 'react';
import { Radio, Select, Checkbox } from 'antd';

const { Option } = Select;

export default function Month(props) {

  const cacheDataInitialValues = {
    'firstOption': '*',
    'secondOption': [1, 'January'],
    'thirdOption': [0],
    'fourthOption': ['January', 'January']
  }

  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }
  
  const [options, setOptions] = useState();
  const [radioValue, setRadioValue] = useState('firstOption');
  const [secondsExpression, setSecondsExpression] = useState('');
  const [cacheData, setCacheData] = useReducer(cacheDataReducer, cacheDataInitialValues);

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  // useEffect(() => {
  //   console.log(secondsExpression)
  // }, [secondsExpression])

  // useEffect(() => {
  //   console.log(cacheData)
  // }, [cacheData])

  function cacheDataReducer(state, action){
    switch(action.type) {
      case 'secondOption':
        return { ...state, secondOption: action.payload };
      case 'thirdOption':
        return { ...state, thirdOption: action.payload };
      case 'fourthOption':
        return { ...state, fourthOption: action.payload };
      default:
        return { ...state };
    }
  }

  const createOptions = () => monthArr.map(itm => ({ label: itm, value: itm }))

  const handleRadioValueChange = e => {
    const val = e.target.value;
    const tempSecondsExpression = computeExpressionValue(val, cacheData[val])
    setSecondsExpression(tempSecondsExpression);
    setRadioValue(val);
  }

  const computeExpressionValue = (type, data) => {
    switch(type) {
      case 'firstOption':
        return "*";
      case 'secondOption':
        return `${data[1]}/${data[0]}`;
      case 'thirdOption':
        return data.join(',');
      case 'fourthOption':
        return `${data[0]}-${data[1]}`;
      default:
        return data;
    }
  }

  const onCheckBoxGroupChange = (checkedValues) => {
    setCacheData({ type: 'thirdOption', payload: checkedValues })
    setSecondsExpression(checkedValues.join(','))
    setRadioValue('thirdOption')
  }

  // handler for second option (Every seconds(s) starting at second) for first select option
  const handleSecondOptionsFirstOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [val, cacheData['secondOption'][1]] })
    setSecondsExpression(`${cacheData['secondOption'][1]}/${val}`)
    setRadioValue('secondOption')
  }

  // // handler for second option (Every seconds(s) starting at second) for second select option
  const handleSecondOptionsSecondOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [cacheData['secondOption'][0], val] })
    setSecondsExpression(`${val}/${cacheData['secondOption'][0]}`)
    setRadioValue('secondOption')
  }

  // handler for last option (Every second between second _ and second _) for first select option
  const handlefourthOptionsFirstOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [val, cacheData['fourthOption'][1]] })
    setSecondsExpression(`${val}-${cacheData['fourthOption'][1]}`)
    setRadioValue('fourthOption')
  }

  // handler for last option (Every second between second _ and second _) for second select option
  const handlefourthOptionsSecondOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [cacheData['fourthOption'][0], val] })
    setSecondsExpression(`${cacheData['fourthOption'][0]}-${val}`)
    setRadioValue('fourthOption')
  }

  return (
    <div>
      <Radio.Group 
        value={radioValue}
        style={{
          overflow: 'auto',
          width: '100%'
        }}
        onChange={handleRadioValueChange}
      >

        <Radio style={radioStyle} value='firstOption'>
          Every month
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
            {React.Children.toArray(monthArr2.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          month(s) starting in 
          <Select 
            size="small"
            value={cacheData['secondOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handleSecondOptionsSecondOptionChange}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio 
          style={{
            display: 'block',
            lineHeight: '30px',
          }}
          value='thirdOption'
        >
          Specific month (choose one or many)
          <div 
            style={{
              margin: '0 0 -20px 5%'
            }}
          >
            <div>
              <Checkbox.Group
                options={options}
                value={cacheData['thirdOption']}
                style={{ margin: '0 5px' }}
                onChange={onCheckBoxGroupChange}
              />
            </div>
          </div>
        </Radio>

        <Radio style={radioStyle} value='fourthOption'>
          Every month between 
          <Select 
            size="small"
            value={cacheData['fourthOption'][0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handlefourthOptionsFirstOptionChange}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and 
          <Select 
            size="small"
            value={cacheData['fourthOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handlefourthOptionsSecondOptionChange}
          >
            {React.Children.toArray(monthArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
      <h2>{secondsExpression}</h2>
    </div>
  )
}