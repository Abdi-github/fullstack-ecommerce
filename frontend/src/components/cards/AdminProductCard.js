import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import defaultImage from "../../images/defaultImage.jpg";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          style={{ height: "150px", objectFit: "cover" }}
          className="m-2"
          alt={title}
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};
export default AdminProductCard;
