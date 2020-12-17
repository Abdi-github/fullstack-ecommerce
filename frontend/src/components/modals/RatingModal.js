import React, { useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
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
