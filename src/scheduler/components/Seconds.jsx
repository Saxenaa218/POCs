import React, { useState, useEffect, useReducer } from 'react';
import { Radio, Select, Checkbox } from 'antd';

const { Option } = Select;

export default function Seconds(props) {

  const { setSeconds } = props;

  const cacheDataInitialValues = {
    'firstOption': '*',
    'secondOption': [1, 0],
    'thirdOption': [0],
    'fourthOption': [0, 0]
  }

  const secondsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
  const secondsArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }

  const [options, setOptions] = useState();
  const [radioValue, setRadioValue] = useState('thirdOption');
  const [expression, setExpression] = useState(0);
  const [cacheData, setCacheData] = useReducer(cacheDataReducer, cacheDataInitialValues);

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  useEffect(() => {
    setSeconds(expression);
  }, [expression])

  function cacheDataReducer(state, action){
    switch(action.type) {
      case 'secondOption':
      case 'thirdOption':
      case 'fourthOption':
        return { ...state, [action.type]: action.payload };
      default:
        return { ...state };
    }
  }

  const createOptions = () => secondsArr.map(itm => ({ label: itm, value: itm }))

  const handleRadioValueChange = e => {
    const val = e.target.value;
    const tempexpression = computeExpressionValue(val, cacheData[val])
    setExpression(tempexpression);
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
    setExpression(checkedValues.join(','))
    setRadioValue('thirdOption')
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
          Every second
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
            {React.Children.toArray(secondsArr2.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          second(s) starting at second
          <Select
            size="small"
            value={cacheData['secondOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handleSecondOptionsSecondOptionChange}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

        <Radio
          style={{
            display: 'block',
            lineHeight: '30px',
          }}
          value='thirdOption'
        >
          Specific second (choose one or many)
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
          Every second between second
          <Select
            size="small"
            value={cacheData['fourthOption'][0]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handlefourthOptionsFirstOptionChange}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and second
          <Select
            size="small"
            value={cacheData['fourthOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handlefourthOptionsSecondOptionChange}
          >
            {React.Children.toArray(secondsArr.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
    </div>
  )
}
