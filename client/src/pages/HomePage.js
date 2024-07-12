import React, { useEffect, useState } from "react";
import { Input, Modal, Select, Table, message, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import { Form } from "antd";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="ml-3 text-danger"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    // get all transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch issue with transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transactions deleted successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transactions added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      if (editable) {
        setLoading(false);
        message.error("Failed to update transaction");
      } else {
        setLoading(false);
        message.error("Failed to add transaction");
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <div className="filters">
            <div className="flex gap-3 items-baseline">
              <h6 className="font-semibold text-[20px]">Select Frequency</h6>
              <Select
                value={frequency}
                onChange={(values) => setFrequency(values)}
              >
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
                <Select.Option value="custom">custom</Select.Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  value={selectedDate}
                  onChange={(values) => setSelectedDate(values)}
                ></RangePicker>
              )}
            </div>
            <div className="flex gap-3 items-baseline">
              <h6 className="font-semibold text-[20px]">Select Type</h6>
              <Select value={type} onChange={(values) => setType(values)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="icon-container">
                <UnorderedListOutlined
                  className={`mx-2 ${
                    viewData === "table" ? "active-icon" : "inactive-icon"
                  }`}
                  onClick={() => setViewData("table")}
                />
                <AreaChartOutlined
                  className={`mx-2 ${
                    viewData === "analytics" ? "active-icon" : "inactive-icon"
                  }`}
                  onClick={() => setViewData("analytics")}
                />
              </div>
              <button
                className="border border-richblack-900 bg-richblack-200 px-[12px] py-[8px] mr-3
                        text-white rounded-md hover:bg-richblack-300 transition-all duration-200"
                onClick={() => setShowModal(true)}
              >
                Add Transaction
              </button>
            </div>
          </div>
          <div className="content">
            {viewData === "table" ? (
              <Table columns={columns} dataSource={allTransaction} />
            ) : (
              <Analytics allTransaction={allTransaction} />
            )}
          </div>
          <Modal
            title={editable ? "Edit Transaction" : "Add Transaction"}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
          >
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={editable}
            >
              <Form.Item label="Amount" name="amount">
                <Input type="text"></Input>
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Select>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="tax">TAX</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date"></Input>
              </Form.Item>
              <Form.Item label="Reference" name="reference">
                <Input type="text"></Input>
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input type="text"></Input>
              </Form.Item>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  {" "}
                  SAVE
                </button>
              </div>
            </Form>
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
