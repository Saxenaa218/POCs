import React from 'react'
import { Modal, Form, Tabs } from 'antd'
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
        >
        	<>
                <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane tab="Seconds" key="1">
                        <Seconds />
                    </TabPane>
                    <TabPane tab="Minutes" key="2">
                        <Minutes />
                    </TabPane>
                    <TabPane tab="Hours" key="3">
                        <Hours />
                    </TabPane>
                    <TabPane tab="Day" key="4">
                        <Day />
                    </TabPane>
                    <TabPane tab="Month" key="5">
                        <Month />
                    </TabPane>
                    <TabPane tab="Year" key="6">
                        <Year />
                    </TabPane>
                </Tabs>
		        {/*<Alert message={getInformation(scheduleType)} type="info" showIcon />*/}
	  		</>
        </Modal>
	)
}

export default Form.create({ name: 'Scheduler form' })(Scheduler)
