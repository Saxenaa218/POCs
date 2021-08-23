import React, { useState } from 'react'
import { Modal, Form, Tabs, Button } from 'antd'
import cronstrue from 'cronstrue'
import Seconds from './components/Seconds'
import Minutes from './components/Minutes'
import Hours from './components/Hours'
import Day from './components/Day'
import Month from './components/Month'
import Year from './components/Year'

const { TabPane } = Tabs;

const Scheduler = (props) => {
	
	const { visible, setVisible, form } = props;
	const { validateFieldsAndScroll } = form;

	const [cronExpression, setCronExpression] = useState(['0', '0', '0', '?', '*', '*', '*']);

	const handleSubmit = e => {
	    validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	        	console.log(values);
	      	}
	    })
	}

    const handleTabChange = key => {
        console.log(key);
    }

	const setExpression = (firstValue, firstIndex, secondValue, secondIndex) => {
		const tempExpression = Object.assign([], cronExpression);
		tempExpression[firstIndex] = firstValue;
		if (secondValue !== undefined && secondIndex !== undefined) tempExpression[secondIndex] = secondValue;
		setCronExpression(tempExpression)
	}

	return (
        <Modal
			visible={visible}
			title={"Schedule Insight"}
			centered
			destroyOnClose
			maskClosable={false}
			bodyStyle={{height:'500px'}}
			width='80%'
			onOk={handleSubmit}
			okText={'Save'}
			cancelText={'Cancel'}
			onCancel={() => {
				setVisible(false)
			}}
			footer={
				<div style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}>
					<div style={{textAlign: 'left'}}>
						<div>Expression: <h3><b>{cronExpression.join(' ')}</b></h3></div>
						<div>Narration: <p><b>{cronstrue.toString(cronExpression.join(' '))}</b></p></div>
					</div>
					<div>
						<Button>Cancel</Button>
						<Button type="primary">Save</Button>
					</div>
				</div>
			}
        >
        	<>
                <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane tab="Seconds" key="1">
                        <Seconds setSeconds={val => setExpression(val, 0)}/>
                    </TabPane>
                    <TabPane tab="Minutes" key="2">
                        <Minutes setMinutes={val => setExpression(val, 1)}/>
                    </TabPane>
                    <TabPane tab="Hours" key="3">
                        <Hours setHours={val => setExpression(val, 2)}/>
                    </TabPane>
                    <TabPane tab="Day" key="4">
                        <Day setDay={(dayOfMonth, dayOfWeek) => setExpression(dayOfMonth, 3, dayOfWeek, 5)}/>
                    </TabPane>
                    <TabPane tab="Month" key="5">
                        <Month setMonth={val => setExpression(val, 4)}/>
                    </TabPane>
                    <TabPane tab="Year" key="6">
                        <Year setYear={val => setExpression(val, 6)}/>
                    </TabPane>
                </Tabs>
		        {/*<Alert message={getInformation(scheduleType)} type="info" showIcon />*/}
	  		</>
        </Modal>
	)
}

export default Form.create({ name: 'Scheduler form' })(Scheduler)
