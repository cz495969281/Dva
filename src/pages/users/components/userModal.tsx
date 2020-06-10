import React,{useEffect} from 'react'
import { Modal, Button, Form,Input } from 'antd';

const UserModal = (props) => {
    const [form] = Form.useForm();
    const {visible,record,closeHandle,onFinish} = props
    
    useEffect(()=>{
        form.setFieldsValue(record);
    },[visible])

    const onOk = () => {
        form.submit();
      };   

     
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={onOk}                
                onCancel={closeHandle}
                forceRender
            >
                <Form name="basic" 
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                    <Form.Item 
                        label="Name"
                        name="name"
                        rules={[{ required:true, message: "Please input your name"}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Create Time"
                        name="create_time"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Status"
                        name="status"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserModal