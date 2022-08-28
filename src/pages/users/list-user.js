import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Button, Pagination, Table, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import AddUser from "./add-user";

class ListUser extends React.Component {
  state = {
    listUser: [],
    page: 1,
    pageMax: 1,
    paginationHtml: [],
    showModal: false,
    showDeleteModal: false,
    editUser: {},
    deleteUser: {},
    loadingDelete: false,
  };

  async handleGetListUser(number) {
    if (number === this.state.page && this.state.paginationHtml.length > 0) {
      return;
    }

    const data = await axios({
      method: "get",
      url: "https://reqres.in/api/users",
      params: {
        page: number,
      },
    });

    const paginationHtml = [];
    for (let number = 1; number <= data.data.total_pages; number++) {
      paginationHtml.push(
        <Pagination.Item
          key={number}
          active={number === data.data.page}
          onClick={() => this.handleGetListUser(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (data && data.data && data.data.data && data.data.data.length > 0) {
      this.setState({
        listUser: data.data.data,
        page: data.data.page,
        pageMax: data.data.total_pages,
        paginationHtml: paginationHtml,
      });
    }
  }

  componentDidMount() {
    this.handleGetListUser(this.state.page);
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  openDeleteModal = (user) => {
    this.setState({
      deleteUser: user,
      showDeleteModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  closeDeleteModal = () => {
    this.setState({
      deleteUser: {},
      showDeleteModal: false,
    });
  };

  onAddUser = () => {
    const isEmptyObj = Object.keys(this.state.editUser).length === 0;
    if (!isEmptyObj) {
      this.setState({ editUser: {} });
    }
    this.openModal();
  };

  onUpdateUser = (user) => {
    this.setState({ editUser: user });
    this.openModal();
  };

  handleAddUpdateUser = (user) => {
    console.log(user);
    if (user.id) {
      axios
        .post(`https://reqres.in/api/users/${user.id}`, user)
        .then((data) => {
          toast.success("Update user success!");
          this.handleGetListUser(this.state.page);
        })
        .catch((error) => {
          toast.error("Update user error!");
        });
    } else {
      axios
        .post("https://reqres.in/api/users", user)
        .then((data) => {
          toast.success("Add user success!");
          this.handleGetListUser(this.state.page);
        })
        .catch((error) => {
          toast.error("Add user error!");
        });
    }
  };

  handleDeleteUser = () => {
    const { deleteUser, loadingDelete } = this.state;
    if (!loadingDelete) {
      this.setState({ loadingDelete: true });
      axios
        .delete(`https://reqres.in/api/users/${deleteUser.id}`)
        .then((data) => {
          toast.success("Delete user success!");
          this.setState({ loadingDelete: false });
          this.closeDeleteModal();
          this.handleGetListUser(this.state.page);
        })
        .catch((error) => {
          toast.error("Delete user error!");
          this.setState({ loadingDelete: false });
        });
    }
  };

  render() {
    const {
      listUser,
      paginationHtml,
      editUser,
      showModal,
      showDeleteModal,
      loadingDelete,
    } = this.state;
    // console.log(editUser);
    return (
      <div className="list-user container">
        <div className="list-user__title">List user</div>
        <div>
          <Button variant="success" onClick={() => this.onAddUser()}>
            Add New User
          </Button>

          <AddUser
            closeModal={this.closeModal}
            isOpen={showModal}
            addUser={this.handleAddUpdateUser}
            user={editUser}
          />
        </div>
        <Table striped className="list-user__table">
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Full Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>
                      <Button
                        style={{ color: "#fff" }}
                        variant="warning"
                        onClick={() => this.onUpdateUser(user)}
                      >
                        <FontAwesomeIcon icon="pen" />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => this.openDeleteModal(user)}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Pagination className="list-user__pagination">
          {paginationHtml}
        </Pagination>

        <Modal show={showDeleteModal} onHide={() => this.closeDeleteModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you realy want to delete this user!</Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={this.closeDeleteModal}>
              No
            </Button>
            <Button
              variant="danger"
              disabled={loadingDelete}
              onClick={() => this.handleDeleteUser()}
            >
              {loadingDelete && (
                <Spinner
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  animation="border"
                  variant="light"
                />
              )}
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ListUser;
