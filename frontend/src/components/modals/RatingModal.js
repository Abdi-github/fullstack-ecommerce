import React, { useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    token
      ? setModalVisible(true)
      : history.push({
          pathname: "/login",
          state: { from: `/product/${slug}` },
        }); // to redirect the user to the intended page after login
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};
export default RatingModal;
