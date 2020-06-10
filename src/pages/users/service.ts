
import request from 'umi-request';
import { message } from 'antd';


export const getRemoteList = async (params: any) => {

   return request('/api/users', {
        method: 'get',
    })
    .then(function(response) {
        // console.log(response);
        return response
    })
    .catch(function(error) {
        console.log(error);
    });
}

export const EditRecord = async ({id,values}) => {

    return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'put',
        data: values
      })
        .then(function(response) {
          console.log("ok");
        })
        .catch(function(error) {
          console.log(error);
        });
 }

 export const DeleteRecord = async (id: any) => {

    return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'delete'
      })
        .then(function(response) {
            message.success('删除成功');

        })
        .catch(function(error) {
          console.log(error);
        });
 }