import React from 'react';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({
  onDelete,
  products,
}: {
  onDelete: Function;
  products: Array<object>;
}) => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Action',
      render: (text:string, record:object|any) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table dataSource={products} columns={columns} />;
};

export default ProductList;
