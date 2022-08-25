import React from "react";
import axios from "axios";
import { Table, Pagination, Button } from "react-bootstrap";
import AddUser from "./add-user";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListUser extends React.Component {
  state = {
    listUser: [],
    page: 1,
    pageMax: 1,
    paginationHtml: [],
    showModal: false,
    editUser: {},
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

  closeModal = () => {
    this.setState({ showModal: false });
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
        })
        .catch((error) => {
          toast.error("Update user error!");
        });
    } else {
      axios
        .post("https://reqres.in/api/users", user)
        .then((data) => {
          toast.success("Add user success!");
        })
        .catch((error) => {
          toast.error("Add user error!");
        });
    }
  };

  render() {
    const { listUser, page, pageMax, paginationHtml, editUser } = this.state;
    console.log(editUser);
    return (
      <div className="list-user container">
        <div className="list-user__title">List user</div>
        <div>
          <Button variant="success" onClick={() => this.onAddUser()}>
            Add New User
          </Button>

          <AddUser
            closeModal={this.closeModal}
            isOpen={this.state.showModal}
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
                        variant="warning"
                        onClick={() => this.onUpdateUser(user)}
                      >
                        <FontAwesomeIcon icon="pen" />
                      </Button>{" "}
                      <Button variant="danger">
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
      </div>
    );
  }
}

export default ListUser;
