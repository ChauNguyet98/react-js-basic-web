import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import {
  Button,
  Pagination,
  Table,
  Modal,
  Spinner,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import AddUser from "./add-user";

class ListUser extends React.Component {
  state = {
    listUser: [],
    page: 1,
    pageMax: 1,
    paginationHtml: [],
    showFilter: false,
    showModal: false,
    showDeleteModal: false,
    editUser: {},
    deleteUser: {},
    loadingDelete: false,
    filter: {
      id: "",
    },
  };

  async handleGetListUser(filter) {
    // if (
    //   filter.page === this.state.page &&
    //   this.state.paginationHtml.length > 0
    // ) {
    //   return;
    // }

    const data = await axios({
      method: "get",
      url: "https://reqres.in/api/users",
      params: filter,
    });

    const paginationHtml = [];
    if (data.data.total_pages) {
      for (let index = 1; index <= data.data.total_pages; index++) {
        paginationHtml.push(
          <Pagination.Item
            key={index}
            active={index === data.data.page}
            onClick={() => this.onPageIndexChange(index)}
          >
            {index}
          </Pagination.Item>
        );
      }
    } else {
      paginationHtml.push(
        <Pagination.Item
          key={1}
          active={1 === data.data.page}
          onClick={() => this.onPageIndexChange(1)}
        >
          {1}
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
    } else {
      if (typeof data.data.data === "object") {
        console.log("objecttttttt");
        this.setState({
          listUser: [data.data.data],
          page: 1,
          pageMax: 1,
          paginationHtml: paginationHtml,
        });
      }
    }
  }

  componentDidMount() {
    this.handleGetListUser({ page: this.state.page });
  }

  openCloseFilter = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

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

  onChangeUserIdValue = (event) => {
    this.setState({
      filter: {
        id: event.target.value,
      },
    });
  };

  onClean = () => {
    this.setState({
      filter: {
        id: "",
      },
    });
  };

  onPageIndexChange = (index) => {
    if (index !== this.state.page) {
      this.handleGetListUser({ page: index });
    }
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

  handleSearch = () => {
    console.log(11111);
    const filter = {
      id: this.state.filter.id,
    };
    this.handleGetListUser(filter);
  };

  render() {
    const {
      listUser,
      paginationHtml,
      editUser,
      showFilter,
      showModal,
      showDeleteModal,
      loadingDelete,
      filter,
    } = this.state;

    return (
      <div className="list-user container">
        <div className="list-user__title">List user</div>
        <div className="list-user__action">
          <div className="list-user__action--btn">
            <Button variant="success" onClick={() => this.onAddUser()}>
              Add New User
            </Button>
            <Button variant="light" onClick={() => this.openCloseFilter()}>
              Filter
            </Button>
          </div>
          <div className="list-user__action--filter" hidden={!showFilter}>
            <div>
              <Form>
                <Form.Group>
                  <Form.Label style={{ fontSize: "16px" }}>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={filter.id}
                    placeholder="User ID"
                    onChange={($event) => this.onChangeUserIdValue($event)}
                  />
                </Form.Group>

                <div className="group-btn">
                  <Button variant="light" onClick={() => this.onClean()}>
                    Clean
                  </Button>

                  <Button
                    style={{ marginLeft: "6px" }}
                    variant="success"
                    onClick={() => this.handleSearch()}
                  >
                    Search
                  </Button>
                </div>
              </Form>
            </div>
          </div>

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
