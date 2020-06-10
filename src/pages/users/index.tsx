import React,{useState} from "react";
import { Table, Tag,Space,Popconfirm,message } from 'antd';
import {connect} from 'umi'
import UserModal from './components/userModal'

const index = ({users,dispatch,userListloading}) => {

    const [modalVisible,setModalVisible] = useState(false);
    const [record,setRecord] = useState(undefined);

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>
        },
        {
          title: 'Create_time',
          dataIndex: 'create_time',
          key: 'create_time',
        },
       
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              {/* <a onClick={()=>{
                setModalVisible(true)
              }}>Edit</a>&nbsp;&nbsp;&nbsp; */}
              
               <a onClick={()=>{
                 editHandle(record)
               }}>Edit</a>&nbsp;&nbsp;&nbsp;

            <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={()=>{
                  confirm(record)
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
              <a>Delete</a> 
            </Popconfirm>,

            
            </span>
          ),
        },
    ];
    const confirm = record => {
      const id = record.id;
      // console.log(record.id);
      dispatch({
        type:'users/delete',
        payload:{id}
      })
    }
    
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    const editHandle = record => {
      setModalVisible(true)
      // console.log(record);
      setRecord(record)
    }
 
    const closeHandle = () => {
      setModalVisible(false)
    }

    const onFinish = values => {
      const id = record.id;
      dispatch({
        type: 'users/edit',
        payload:{
          id,
          values
        }
      })
      // console.log(id);
    };

    return  (
        <div className="list-table">
            <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListloading}/>
            <UserModal 
              visible={modalVisible} 
              closeHandle={closeHandle}
              record={record}
              onFinish={onFinish}
            >

            </UserModal>
        </div>
    )
}
// const mapStateToProps = (state) => {  todo state对象中，可以进行拆分，第一个值就是对应model.ts文件中的namespace对应的值
//   return {}
// }

const mapStateToProps = ({users,loading}) => {
  // console.log(loading);
  
  return {
   users,
   userListloading: loading.models.users
  }
}

export default connect(mapStateToProps)(index)