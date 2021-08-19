import React, { useState, useEffect, useReducer } from 'react';
import { Radio, Select, Checkbox } from 'antd';

const { Option } = Select;

export default function Month(props) {

  const { setMonth } = props;

  const shortFormedMonthName = {
    'January': 'JAN', 
    'February': 'FEB', 
    'March': 'MAR', 
    'April': 'APR', 
    'May': 'MAY', 
    'June': 'JUN', 
    'July': 'JUL', 
    'August': 'AUG', 
    'September': 'SEP', 
    'October': 'OCT', 
    'November': 'NOV', 
    'December': 'DEC'
  }

  const cacheDataInitialValues = {
    'firstOption': '*',
    'secondOption': [1, 'January'],
    'thirdOption': [],
    'fourthOption': ['January', 'January']
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '30px',
  }
  
  const [options, setOptions] = useState();
  const [radioValue, setRadioValue] = useState('firstOption');
  const [expression, setExpression] = useState('*');
  const [cacheData, setCacheData] = useReducer(cacheDataReducer, cacheDataInitialValues);

  useEffect(() => {
    setOptions(createOptions());
  }, [])

  useEffect(() => {
    setMonth(expression);
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

  const createOptions = () => monthNames.map(itm => ({ label: itm, value: itm }))

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
        return `${monthNames.indexOf(data[1])+1}/${monthNumbers.indexOf(data[0])+1}`;
      case 'thirdOption':
        if (data.length) return data.map(each => shortFormedMonthName[each]).join(',');
        else return '1';
      case 'fourthOption':
        return `${monthNames.indexOf(data[0])+1}-${monthNames.indexOf(data[1])+1}`;
      default:
        return data;
    }
  }

  const onCheckBoxGroupChange = (checkedValues) => {
    setCacheData({ type: 'thirdOption', payload: checkedValues })
    setExpression(checkedValues.map(each => shortFormedMonthName[each]).join(','));
    setRadioValue('thirdOption')
  }

  // handler for second option (Every seconds(s) starting at second) for first select option
  const handleSecondOptionsFirstOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [val, cacheData['secondOption'][1]] })
    setExpression(`${monthNames.indexOf(cacheData['secondOption'][1])+1}/${monthNumbers.indexOf(val)+1}`)
    setRadioValue('secondOption')
  }

  // // handler for second option (Every seconds(s) starting at second) for second select option
  const handleSecondOptionsSecondOptionChange = (val) => {
    setCacheData({ type: 'secondOption', payload: [cacheData['secondOption'][0], val] })
    setExpression(`${monthNames.indexOf(val)+1}/${monthNumbers.indexOf(cacheData['secondOption'][0])+1}`)
    setRadioValue('secondOption')
  }

  // handler for last option (Every second between second _ and second _) for first select option
  const handlefourthOptionsFirstOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [val, cacheData['fourthOption'][1]] })
    setExpression(`${monthNames.indexOf(val)+1}-${monthNames.indexOf(cacheData['fourthOption'][1])+1}`)
    setRadioValue('fourthOption')
  }

  // handler for last option (Every second between second _ and second _) for second select option
  const handlefourthOptionsSecondOptionChange = val => {
    setCacheData({ type: 'fourthOption', payload: [cacheData['fourthOption'][0], val] })
    setExpression(`${monthNames.indexOf(cacheData['fourthOption'][0])+1}-${monthNames.indexOf(val)+1}`)
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
            {React.Children.toArray(monthNumbers.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          month(s) starting in 
          <Select 
            size="small"
            value={cacheData['secondOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handleSecondOptionsSecondOptionChange}
          >
            {React.Children.toArray(monthNames.map(itm => <Option value={itm}>{itm}</Option>))}
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
            {React.Children.toArray(monthNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
          and 
          <Select 
            size="small"
            value={cacheData['fourthOption'][1]}
            style={{ margin: '0 5px' }}
            dropdownMatchSelectWidth={false}
            onChange={handlefourthOptionsSecondOptionChange}
          >
            {React.Children.toArray(monthNames.map(itm => <Option value={itm}>{itm}</Option>))}
          </Select>
        </Radio>

      </Radio.Group>
    </div>
  )
}