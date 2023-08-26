import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

const ProductCard = ({product}) => {

  console.log(product);

  return (
    <Card
      style={{ width: 250 }}
      cover={
        <img
          alt="example"
          src={product.thumbnail_image}
        />
      }
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Meta
        title={product.name}
        description="This is the description"
      />
    </Card>
  )
}

export default ProductCard